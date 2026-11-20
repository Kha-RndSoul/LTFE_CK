import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ICategory, INews } from '../types';
import useAPI from '../hooks/useAPI';
import { BASE_URL } from '../services/api';
import NewsCard from '../components/common/NewsCard';
import Sidebar from '../components/sidebar/Sidebar';

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();

    const {
        data: category,
        loading: catLoading,
        error: catError,
    } = useAPI<ICategory>(categoryId ? `${BASE_URL}/categories/${categoryId}` : null);

    const {
        data: rawNewsList,
        loading: newsLoading,
        error: newsError,
    } = useAPI<INews[]>(categoryId ? `${BASE_URL}/news?categoryId=${categoryId}` : null);

    const newsList = useMemo(() => {
        if (!rawNewsList) return [];
        return [...rawNewsList].sort(
            (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }, [rawNewsList]);

    const loading = catLoading || newsLoading;

    const renderNews = () => {
        if (loading) return <p>Đang tải tin tức...</p>;
        if (catError && catError.includes('404')) return <p>Không tìm thấy chuyên mục này.</p>;
        if (catError || newsError) {
            return <p style={{ color: 'red' }}>Không tải được tin tức.</p>;
        }
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