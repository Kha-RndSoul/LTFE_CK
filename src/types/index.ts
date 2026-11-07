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
    id: number;
    leagueId: string;
    team: string;
    points: number;
    position: number;
}