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
}

export interface IMatch {
    id: string;
    leagueId: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number | null;
    awayScore: number | null;
    kickoff: string;
    status: 'scheduled' | 'finished' | 'live';
}
