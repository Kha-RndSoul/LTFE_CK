import React from 'react';
import { INews } from '../../types';
import { Link } from 'react-router-dom';

interface NewsCardProps {
    article: INews;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            display: 'flex',
            gap: '15px'
        }}>
            <Link to={`/tin-tuc/${encodeURIComponent(article.id)}`} aria-label={`Đọc bài: ${article.title}`}>
            <img
                src={article.imageUrl}
                alt={article.title}
                style={{ width: '200px', height: '130px', objectFit: 'cover', borderRadius: '4px' }}
            />
            </Link>

            <div>
                <h3 style={{ marginTop: 0, color: '#00285e' }}>
                    <Link to={`/tin-tuc/${encodeURIComponent(article.id)}`} style={{ color: 'inherit' }}>
                        {article.title}
                    </Link>
                </h3>
                <p style={{ color: '#555' }}>{article.summary}</p>
                <small style={{ color: '#999' }}>{new Date(article.publishedAt).toLocaleDateString('vi-VN')}</small>
            </div>
        </div>
    );
};

export default NewsCard;
