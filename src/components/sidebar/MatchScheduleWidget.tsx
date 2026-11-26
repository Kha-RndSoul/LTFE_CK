import React, { useState, useEffect } from 'react';
import { IMatch } from '../../types';
import { getMatches } from '../../services/api';
import { LEAGUE_NAMES } from '../../utils/leagues';
import { formatMatchDate, formatMatchTime } from '../../utils/helpers';
import WidgetCard from './WidgetCard';

interface MatchScheduleWidgetProps {
    leagueId: string; // giai can hien lich dau
    limit?: number; // tong so tran hien thi, mac dinh 5
}

const pickMatches = (matches: IMatch[], limit: number): IMatch[] => {
    const finished = matches.filter((m) => m.status === 'finished').slice(-2);
    const upcoming = matches
        .filter((m) => m.status !== 'finished')
        .slice(0, Math.max(limit - finished.length, 0));
    return [...finished, ...upcoming];
};

const MatchScheduleWidget: React.FC<MatchScheduleWidgetProps> = ({ leagueId, limit = 5 }) => {
    const [matches, setMatches] = useState<IMatch[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        let isCancelled = false;

        const fetchMatches = async () => {
            setLoading(true);
            setError(false);
            try {
                const data = await getMatches(leagueId);
                if (!isCancelled) setMatches(data);
            } catch (err) {
                if (isCancelled) return;
                console.error('Loi tai lich thi dau:', err);
                setError(true);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };
        fetchMatches();

        return () => {
            isCancelled = true;
        };
    }, [leagueId]);

    const leagueName = LEAGUE_NAMES[leagueId];
    const title = leagueName ? `Lịch thi đấu - ${leagueName}` : 'Lịch thi đấu';
    const shownMatches = pickMatches(matches, limit);

    const renderBody = () => {
        if (loading) return <p style={{ color: '#666' }}>Đang tải...</p>;
        if (error) return <p style={{ color: 'red' }}>Không tải được lịch thi đấu.</p>;
        if (shownMatches.length === 0) return <p style={{ color: '#666' }}>Chưa có dữ liệu.</p>;

        return (
            <div>
                {shownMatches.map((m) => (
                    <div key={m.id} style={{ padding: '8px 0', borderBottom: '1px solid #f3f3f3' }}>
                        {/* dong tren: ngay gio hoac dang truc tiep */}
                        <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
                            {m.status === 'live' ? (
                                <span style={{ color: 'red', fontWeight: 'bold' }}>● TRỰC TIẾP</span>
                            ) : (
                                `${formatMatchDate(m.kickoff)} · ${formatMatchTime(m.kickoff)}`
                            )}
                        </div>

                        {/* dong duoi: doi nha - ti so (hoac vs) - doi khach */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                            <span style={{ flex: 1, textAlign: 'right' }}>{m.homeTeam}</span>
                            <span style={{ minWidth: '44px', textAlign: 'center', fontWeight: 'bold', color: '#00285e' }}>
                                {m.status === 'scheduled' ? 'vs' : `${m.homeScore ?? 0} - ${m.awayScore ?? 0}`}
                            </span>
                            <span style={{ flex: 1, textAlign: 'left' }}>{m.awayTeam}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return <WidgetCard title={title}>{renderBody()}</WidgetCard>;
};

export default MatchScheduleWidget;