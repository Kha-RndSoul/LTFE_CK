import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { INews } from '../types';
import { getCategoryById } from '../services/api';
import { getNewsById } from '../services/api';
import RequestState from '../components/common/RequestState';
import './DetailPage.css';

function DetailPage() {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<INews | null>(null);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(false);
        setArticle(null);
        setCategoryName('');
        async function loadArticle() {
            try {
                const news = id ? await getNewsById(id, controller.signal) : null;
                if (controller.signal.aborted) return;
                setArticle(news);
                setLoading(false);
                if (news) {
                    // Không che bài viết khi riêng tên chuyên mục bị lỗi.
                    const category = await getCategoryById(news.categoryId).catch(() => null);
                    if (!controller.signal.aborted) setCategoryName(category?.name || news.categoryId);
                }
            } catch {
                if (!controller.signal.aborted) {
                    setError(true);
                    setLoading(false);
                }
            }
        }
        loadArticle();
        return () => controller.abort();
    }, [id, attempt]);

    if (loading) return <RequestState kind="loading" />;
    if (error) return <RequestState kind="error" onRetry={() => setAttempt((value) => value + 1)} />;
    if (!article) return <RequestState kind="not-found" />;

    return (
        <section className="news-detail" aria-labelledby="news-detail-title">
            <nav className="news-detail__breadcrumb" aria-label="Đường dẫn chuyên mục">
                <Link to="/">Trang chủ</Link><span aria-hidden="true">›</span>
                <Link to={`/the-thao/${encodeURIComponent(article.categoryId)}`}>
                    {categoryName || article.categoryId}
                </Link>
                <span aria-hidden="true">›</span><span aria-current="page">Chi tiết tin</span>
            </nav>
            <article className="news-detail__article">
                <header>
                    <p className="news-detail__category">{categoryName || article.categoryId}</p>
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
        </section>
    );
}

export default DetailPage;
