// mui gio viet nam, de gio hien thi luon dung du may user o dau
const TIME_ZONE = 'Asia/Ho_Chi_Minh';

// vd: "T7, 21/11"
export const formatMatchDate = (iso: string): string => {
    return new Date(iso).toLocaleDateString('vi-VN', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        timeZone: TIME_ZONE,
    });
};

// vd: "19:30"
export const formatMatchTime = (iso: string): string => {
    return new Date(iso).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: TIME_ZONE,
    });
};