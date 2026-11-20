import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useAPI<T>(url: string | null) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState<number>(0);

    const refetch = useCallback(() => {
        setReloadKey((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (!url) {
            setData(null);
            setError(null);
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
    }, [url, reloadKey]);

    return { data, error, loading, refetch };
}