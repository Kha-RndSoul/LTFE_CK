import React, { useState } from 'react';
import { INews } from '../../types';
import { Link } from 'react-router-dom';
import '../../assets/styles/NewsCard.css';

interface NewsCardProps {
    article: INews;
    categoryName?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, categoryName }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <article className="news-card">
            <Link
                to={`/tin-tuc/${encodeURIComponent(article.id)}`}
                aria-label={`Đọc bài: ${article.title}`}
                className="news-card__thumb-link"
            >
                {article.imageUrl && !imgError ? (
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="news-card__thumb"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <span className="news-card__thumb-fallback">BONGDA24H</span>
                )}
            </Link>

            <div className="news-card__body">
                <div>
                    {categoryName && <span className="news-card__badge">{categoryName}</span>}
                    <h3 className="news-card__title">
                        <Link to={`/tin-tuc/${encodeURIComponent(article.id)}`}>
                            {article.title}
                        </Link>
                    </h3>
                    <p className="news-card__summary">{article.summary}</p>
                </div>
                <small className="news-card__date">
                    {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                </small>
            </div>
        </article>
    );
};

export default NewsCard;