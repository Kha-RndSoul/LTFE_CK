import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ICategory, INews } from '../types';
import { getCategoryById, getNewsByCategory } from '../services/api';
import NewsCard from '../components/common/NewsCard';
import Sidebar from '../components/sidebar/Sidebar';

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();

    const [category, setCategory] = useState<ICategory | null>(null);
    const [newsList, setNewsList] = useState<INews[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!categoryId) return;

        let isCancelled = false;

        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const [cat, news] = await Promise.all([
                    getCategoryById(categoryId),
                    getNewsByCategory(categoryId),
                ]);
                if (isCancelled) return;
                setCategory(cat);
                setNewsList(news);
            } catch (err) {
                if (isCancelled) return;
                console.error('Loi tai trang category:', err);
                setError(true);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };
        fetchData();

        // cleanup khi doi categoryId hoac roi trang
        return () => {
            isCancelled = true;
        };
    }, [categoryId]);

    // chon noi dung hien thi theo trang thai
    const renderNews = () => {
        if (loading) return <p>Đang tải tin tức...</p>;
        if (error) return <p style={{ color: 'red' }}>Không tải được tin tức. Bạn đã chạy json-server chưa?</p>;
        if (!category) return <p>Không tìm thấy chuyên mục này.</p>;
        if (newsList.length === 0) return <p>Chưa có tin nào trong chuyên mục này.</p>;

        return (
            <div>
                {newsList.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        );
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '30px' }}>

            <section>
                <h2 style={{ borderBottom: '2px solid #00285e', paddingBottom: '10px' }}>
                    {category ? category.name : 'Chuyên mục'}
                </h2>
                {renderNews()}
            </section>

            <aside>
                <Sidebar />
            </aside>

        </div>
    );
};

export default CategoryPage;