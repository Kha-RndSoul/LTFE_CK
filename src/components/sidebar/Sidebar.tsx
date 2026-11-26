import React from 'react';
import StandingsWidget from './StandingsWidget';
import MatchScheduleWidget from './MatchScheduleWidget';
import { DEFAULT_LEAGUE_ID } from '../../utils/leagues';

interface SidebarProps {
    leagueId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ leagueId = DEFAULT_LEAGUE_ID }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* moi widget tu fetch rieng, widget nay loi thi widget kia van chay */}
            <StandingsWidget leagueId={leagueId} />
            <MatchScheduleWidget leagueId={leagueId} />
        </div>
    );
};

export default Sidebar;