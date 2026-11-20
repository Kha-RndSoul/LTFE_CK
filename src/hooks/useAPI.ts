// src/hooks/useAPI.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAPI<T>(url: string | null) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Nếu chưa có url (ví dụ đang chờ lấy id từ params) thì chưa gọi API
        if (!url) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        axios<T>(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setData(null);
                    setError(err.message || 'Lỗi gọi API');
                }
            })
            .finally(() => setLoading(false));
    }, [url]);

    return { data, error, loading };
}