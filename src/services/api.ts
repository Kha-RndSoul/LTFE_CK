import { INews, ICategory } from '../types';

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
        return []; // Trả về mảng rỗng nếu lỗi
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