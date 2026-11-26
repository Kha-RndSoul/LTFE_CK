export interface ICategory {
    id: string;
    name: string;
}

export interface INews {
    id: string;
    categoryId: string;
    title: string;
    summary: string;
    content: string;
    imageUrl: string;
    publishedAt: string;
}

export interface IStanding {
    id: string;
    leagueId: string;
    team: string;
    points: number;
    position: number;
    played: number; // so tran da dau
    goalDifference: number; // hieu so ban thang
}

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export interface IMatch {
    id: string;
    leagueId: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number | null; // chua da thi la null
    awayScore: number | null;
    kickoff: string; // gio da dang ISO, vd: 2026-11-21T12:30:00Z
    status: MatchStatus;
}