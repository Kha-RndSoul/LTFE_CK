import React, { useState, useEffect } from 'react';
import { INews } from '../types';
import { getAllNews } from '../services/api';
import NewsCard from '../components/common/NewsCard';
import Sidebar from '../components/sidebar/Sidebar';

const HomePage: React.FC = () => {
    const [newsList, setNewsList] = useState<INews[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getAllNews();
            setNewsList(data);
            setLoading(false);
        };
        fetchNews();
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '30px' }}>

            <section>
                <h2 style={{ borderBottom: '2px solid #00285e', paddingBottom: '10px' }}>Tin Tức Nổi Bật</h2>
                {loading ? (
                    <p>Đang tải tin tức...</p>
                ) : (
                    <div>
                        {newsList.map((article) => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                )}
            </section>

            <aside>
                <Sidebar />
            </aside>

        </div>
    );
};

export default HomePage;