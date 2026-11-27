import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ICategory, INews } from '../types';
import useAPI from '../hooks/useAPI';
import { BASE_URL } from '../services/api';
import NewsCard from '../components/common/NewsCard';
import Sidebar from '../components/sidebar/Sidebar';
import '../assets/styles/HomePage.css';

const HomePage: React.FC = () => {
    const { data: newsList, loading, error } = useAPI<INews[]>(`${BASE_URL}/news`);
    const { data: categories } = useAPI<ICategory[]>(`${BASE_URL}/categories`);

    const categoryMap = useMemo(() => {
        const map: Record<string, string> = {};
        categories?.forEach((cat) => {
            map[cat.id] = cat.name;
        });
        return map;
    }, [categories]);

    // Sắp xếp bài viết mới nhất lên đầu
    const sortedNews = useMemo(() => {
        if (!newsList) return [];
        return [...newsList].sort(
            (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }, [newsList]);

    const featuredArticle = sortedNews[0];
    const latestArticles = sortedNews.slice(1, 5);

    // Hiển thị tin theo từng chuyên mục
    const categoryBlocks = useMemo(() => {
        if (!categories || sortedNews.length === 0) return [];
        return categories
            .map((cat) => ({
                category: cat,
                articles: sortedNews.filter((item) => item.categoryId === cat.id).slice(0, 3),
            }))
            .filter((block) => block.articles.length > 0);
    }, [categories, sortedNews]);

    return (
        <div className="home-layout">
            <section>
                {loading && <p>Đang tải tin tức...</p>}
                {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

                {!loading && !error && sortedNews.length === 0 && (
                    <p>Chưa có bài viết nào trong hệ thống.</p>
                )}

                {!loading && !error && featuredArticle && (
                    <>
                        <article className="hero-article">
                            {featuredArticle.imageUrl && (
                                <Link
                                    to={`/tin-tuc/${encodeURIComponent(featuredArticle.id)}`}
                                    className="hero-article__image-wrap"
                                >
                                    <img
                                        src={featuredArticle.imageUrl}
                                        alt={featuredArticle.title}
                                        className="hero-article__image"
                                    />
                                </Link>
                            )}
                            <div className="hero-article__content">
                                <div className="hero-article__meta">
                                    <span className="hero-article__badge">
                                        {categoryMap[featuredArticle.categoryId] || 'Tin nóng'}
                                    </span>
                                    <span className="hero-article__date">
                                        {new Date(featuredArticle.publishedAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                                <h1 className="hero-article__title">
                                    <Link to={`/tin-tuc/${encodeURIComponent(featuredArticle.id)}`}>
                                        {featuredArticle.title}
                                    </Link>
                                </h1>
                                <p className="hero-article__summary">{featuredArticle.summary}</p>
                            </div>
                        </article>

                        {latestArticles.length > 0 && (
                            <div className="home-section">
                                <div className="home-section__header">
                                    <h2 className="home-section__title">Tin Mới Cập Nhật</h2>
                                </div>
                                {latestArticles.map((article) => (
                                    <NewsCard
                                        key={article.id}
                                        article={article}
                                        categoryName={categoryMap[article.categoryId]}
                                    />
                                ))}
                            </div>
                        )}

                        {categoryBlocks.map(({ category, articles }) => (
                            <div key={category.id} className="home-section">
                                <div className="home-section__header">
                                    <h2 className="home-section__title">{category.name}</h2>
                                    <Link to={`/the-thao/${category.id}`} className="home-section__more">
                                        Xem tất cả ›
                                    </Link>
                                </div>
                                {articles.map((article) => (
                                    <NewsCard key={article.id} article={article} />
                                ))}
                            </div>
                        ))}
                    </>
                )}
            </section>

            <aside>
                <Sidebar />
            </aside>
        </div>
    );
};

export default HomePage;