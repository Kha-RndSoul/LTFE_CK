export const LEAGUE_NAMES: Record<string, string> = {
    'anh': 'Ngoại hạng Anh',
    'tay-ban-nha': 'La Liga',
    'y': 'Serie A',
    'phap': 'Ligue 1',
    'duc': 'Bundesliga',
    'c1': 'Champions League',
    'europa-league': 'Europa League',
    'conference-league': 'Conference League',
};

// giai hien o sidebar khi trang khong thuoc giai nao (vd: trang chu)
export const DEFAULT_LEAGUE_ID = 'anh';

// kiem tra 1 category co phai giai dau khong
export const isLeague = (id?: string): boolean => {
    if (!id) return false;
    return Object.keys(LEAGUE_NAMES).includes(id);
};