import React, { useState, useEffect } from 'react';
import { IStanding } from '../../types';
import { getStandings } from '../../services/api';
import { LEAGUE_NAMES } from '../../utils/leagues';
import WidgetCard from './WidgetCard';

interface StandingsWidgetProps {
    leagueId: string;
    limit?: number; // so doi hien thi la 8
}

const cellStyle: React.CSSProperties = { padding: '6px 4px', textAlign: 'center' };

const StandingsWidget: React.FC<StandingsWidgetProps> = ({ leagueId, limit = 8 }) => {
    const [standings, setStandings] = useState<IStanding[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        let isCancelled = false;

        const fetchStandings = async () => {
            setLoading(true);
            setError(false);
            try {
                const data = await getStandings(leagueId);
                if (!isCancelled) setStandings(data);
            } catch (err) {
                if (isCancelled) return;
                console.error('Loi tai bang xep hang:', err);
                setError(true);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };
        fetchStandings();

        return () => {
            isCancelled = true;
        };
    }, [leagueId]);

    const leagueName = LEAGUE_NAMES[leagueId];
    const title = leagueName ? `Bảng xếp hạng - ${leagueName}` : 'Bảng xếp hạng';

    // hien thong bao neu dang tai / loi / rong
    const renderBody = () => {
        if (loading) return <p style={{ color: '#666' }}>Đang tải...</p>;
        if (error) return <p style={{ color: 'red' }}>Không tải được bảng xếp hạng.</p>;
        if (standings.length === 0) return <p style={{ color: '#666' }}>Chưa có dữ liệu.</p>;

        return (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                <tr style={{ color: '#888', fontSize: '12px', borderBottom: '1px solid #eee' }}>
                    <th style={cellStyle}>#</th>
                    <th style={{ ...cellStyle, textAlign: 'left' }}>Đội</th>
                    <th style={cellStyle}>Tr</th>
                    <th style={cellStyle}>HS</th>
                    <th style={cellStyle}>Đ</th>
                </tr>
                </thead>
                <tbody>
                {standings.slice(0, limit).map((row) => (
                    <tr key={row.id} style={{ borderBottom: '1px solid #f3f3f3' }}>
                        <td style={{ ...cellStyle, fontWeight: 'bold', color: '#00285e' }}>{row.position}</td>
                        <td style={{ ...cellStyle, textAlign: 'left' }}>{row.team}</td>
                        <td style={cellStyle}>{row.played}</td>
                        {/* them dau + cho hieu so duong */}
                        <td style={cellStyle}>{row.goalDifference > 0 ? '+' + row.goalDifference : row.goalDifference}</td>
                        <td style={{ ...cellStyle, fontWeight: 'bold' }}>{row.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    return <WidgetCard title={title}>{renderBody()}</WidgetCard>;
};

export default StandingsWidget;