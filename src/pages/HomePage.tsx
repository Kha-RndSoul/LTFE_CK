// src/pages/HomePage.tsx
import React from 'react';
import { INews } from '../types';
import useAPI from '../hooks/useAPI';
import NewsCard from '../components/common/NewsCard';
import Sidebar from '../components/sidebar/Sidebar';

const HomePage: React.FC = () => {
    // Truyền kiểu dữ liệu INews[] vào Generic <T>
    const { data: newsList, loading, error } = useAPI<INews[]>('http://localhost:8000/news');

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '30px' }}>
            <section>
                <h2 style={{ borderBottom: '2px solid #00285e', paddingBottom: '10px' }}>Tin Tức Nổi Bật</h2>

                {loading && <p>Đang tải tin tức...</p>}
                {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

                {!loading && !error && newsList && (
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