import { INews, ICategory, IStanding, IMatch } from '../types';

const BASE_URL = 'http://localhost:8000';

export const getAllNews = async (): Promise<INews[]> => {
    try {
        const response = await fetch(`${BASE_URL}/news`);
        if (!response.ok) {
            throw new Error('Lỗi khi tải dữ liệu');
        }
        return await response.json();
    } catch (error) {
        console.error("Lỗi fetch API:", error);
        return [];
    }
};
export const getCategories = async (): Promise<ICategory[]> => {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error('Lỗi khi tải danh mục');
        }
        return await response.json();
    } catch (error) {
        console.error("Lỗi fetch Categories:", error);
        return [];
    }
};

// lay 1 chuyen muc theo id, khong co thi tra ve null
export const getCategoryById = async (id: string): Promise<ICategory | null> => {
    const response = await fetch(`${BASE_URL}/categories/${id}`);
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        throw new Error('Loi khi tai chuyen muc ' + id);
    }
    return await response.json();
};

// lay tin theo giai dau (categoryId), tin moi nhat len dau
export const getNewsByCategory = async (categoryId: string): Promise<INews[]> => {
    const response = await fetch(`${BASE_URL}/news?categoryId=${categoryId}`);
    if (!response.ok) {
        throw new Error('Loi khi tai tin theo giai ' + categoryId);
    }
    const data: INews[] = await response.json();
    return data.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
};

// lay bang xep hang cua 1 giai, sap theo thu hang
export const getStandings = async (leagueId: string): Promise<IStanding[]> => {
    const response = await fetch(`${BASE_URL}/standings?leagueId=${leagueId}`);
    if (!response.ok) {
        throw new Error('Loi khi tai bang xep hang ' + leagueId);
    }
    const data: IStanding[] = await response.json();
    return data.sort((a, b) => a.position - b.position);
};

// lay cac tran cua 1 giai, sap theo gio da tang dan
export const getMatches = async (leagueId: string): Promise<IMatch[]> => {
    const response = await fetch(`${BASE_URL}/matches?leagueId=${leagueId}`);
    if (!response.ok) {
        throw new Error('Loi khi tai lich thi dau ' + leagueId);
    }
    const data: IMatch[] = await response.json();
    return data.sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime());
};