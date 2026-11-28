import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function useAPI<T>(url: string | null) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<number | null>(null);
    const [reloadKey, setReloadKey] = useState<number>(0);

    const refetch = useCallback(() => {
        setReloadKey((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        setData(null);
        setError(null);
        setStatus(null);
        if (!url) {
            setLoading(false);
            return;
        }

        setLoading(true);
        axios<T>(url, { signal: controller.signal })
            .then((response) => {
                if (!controller.signal.aborted) setData(response.data);
            })
            .catch((err) => {
                if (!controller.signal.aborted) {
                    setData(null);
                    setError(err.message || 'Lỗi gọi API');
                    setStatus(err.response?.status || null);
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [url, reloadKey]);

    return { data, error, loading, status, refetch };
}
