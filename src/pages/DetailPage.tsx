import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ICategory, INews } from '../types';
import useAPI from '../hooks/useAPI';
import { BASE_URL } from '../services/api';
import RequestState from '../components/common/RequestState';
import NewsCard from '../components/common/NewsCard';
import '../assets/styles/DetailPage.css';

function DetailPage() {
    const { id } = useParams<{ id: string }>();

    const {
        data: article,
        loading,
        error,
        refetch,
    } = useAPI<INews>(id ? `${BASE_URL}/news/${encodeURIComponent(id)}` : null);

    const { data: category } = useAPI<ICategory>(
        article ? `${BASE_URL}/categories/${encodeURIComponent(article.categoryId)}` : null
    );

    const related = useAPI<INews[]>(
        article ? `${BASE_URL}/news?categoryId=${encodeURIComponent(article.categoryId)}` : null
    );
    const relatedNews = (related.data || [])
        .filter((item) => item.id !== article?.id)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 3);

    if (loading) return <RequestState kind="loading" />;
    if (error && error.includes('404')) return <RequestState kind="not-found" />;
    if (error) return <RequestState kind="error" onRetry={refetch} />;
    if (!article) return <RequestState kind="not-found" />;

    const categoryName = category?.name || article.categoryId;

    return (
        <section className="news-detail" aria-labelledby="news-detail-title">
            <nav className="news-detail__breadcrumb" aria-label="Đường dẫn chuyên mục">
                <Link to="/">Trang chủ</Link><span aria-hidden="true">›</span>
                <Link to={`/the-thao/${encodeURIComponent(article.categoryId)}`}>
                    {categoryName}
                </Link>
                <span aria-hidden="true">›</span><span aria-current="page">Chi tiết tin</span>
            </nav>
            <article className="news-detail__article">
                <header>
                    <p className="news-detail__category">{categoryName}</p>
                    <h1 id="news-detail-title" className="news-detail__title">{article.title}</h1>
                    <div className="news-detail__meta">
                        <time dateTime={article.publishedAt}>
                            {new Date(article.publishedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
                        </time>
                    </div>
                    <p className="news-detail__lead">{article.summary}</p>
                </header>
                {article.imageUrl && (
                    <figure className="news-detail__figure">
                        <img className="news-detail__image" src={article.imageUrl} alt={article.title} />
                    </figure>
                )}
                <div className="news-detail__body">
                    {article.content.split(/\r?\n/).filter((paragraph) => paragraph.trim()).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </article>
            <section className="news-detail__related" aria-label="Tin liên quan">
                <h2>Tin liên quan</h2>
                {related.loading ? <p role="status">Đang tải tin liên quan...</p> : related.error ? (
                    <p>Không tải được tin liên quan. <button onClick={related.refetch}>Thử lại tin liên quan</button></p>
                ) : relatedNews.length === 0 ? <p>Chưa có tin liên quan.</p> : (
                    relatedNews.map((item) => <NewsCard key={item.id} article={item} />)
                )}
            </section>
        </section>
    );
}

export default DetailPage;
