
export const LEAGUE_NAMES: Record<string, string> = {
    'anh': 'Ngoại hạng Anh',
    'tay-ban-nha': 'La Liga',
    'y': 'Serie A',
    'phap': 'Ligue 1',
    'duc': 'Bundesliga',
    'chau-au': 'Champions League',
};

export const DEFAULT_LEAGUE_ID = 'anh';

// kiem tra 1 category co phai giai dau khong
export const isLeague = (id?: string): boolean => {
    if (!id) return false;
    return Object.keys(LEAGUE_NAMES).includes(id);
};