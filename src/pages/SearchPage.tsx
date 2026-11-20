import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ICategory, INews } from '../types';
import useAPI from '../hooks/useAPI';
import { BASE_URL } from '../services/api';
import SearchForm from '../components/SearchForm';
import './SearchPage.css';

function SearchPage() {
    const [keyword, setKeyword] = useState('');

    const { data: newsList, loading, error } = useAPI<INews[]>(`${BASE_URL}/news`);
    const { data: categories } = useAPI<ICategory[]>(`${BASE_URL}/categories`);

    const categoryMap = useMemo(() => {
        const map: Record<string, string> = {};
        categories?.forEach((cat) => {
            map[cat.id] = cat.name;
        });
        return map;
    }, [categories]);

    const results = useMemo(() => {
        if (!newsList) return [];
        const normalizedKeyword = keyword.trim().toLocaleLowerCase('vi');

        return newsList.filter((article) => {
            const categoryName = categoryMap[article.categoryId] || article.categoryId;
            return `${article.title} ${categoryName} ${article.summary}`
                .toLocaleLowerCase('vi')
                .includes(normalizedKeyword);
        });
    }, [newsList, categoryMap, keyword]);

    return (
        <section className="football-search" aria-labelledby="football-search-title">
            <nav className="football-search__breadcrumb" aria-label="Đường dẫn chuyên mục">
                <Link to="/">Trang chủ</Link>
                <span aria-hidden="true">›</span>
                <span aria-current="page">Tìm kiếm</span>
            </nav>

            <h1 id="football-search-title">Tìm kiếm tin bóng đá</h1>
            <SearchForm onSearch={setKeyword} />

            {loading && (
                <p className="football-search__count" role="status">
                    Đang tải danh sách bài viết...
                </p>
            )}

            {error && (
                <p className="football-search__count" role="status" style={{ color: 'red' }}>
                    Không tải được dữ liệu tìm kiếm.
                </p>
            )}

            {!loading && !error && (
                <>
                    <p className="football-search__count" role="status">
                        {keyword.trim()
                            ? `Tìm thấy ${results.length} bài viết cho “${keyword}”`
                            : `Tất cả ${results.length} bài viết`}
                    </p>

                    <div className="football-search__results">
                        {results.map((article) => (
                            <article className="football-search__item" key={article.id}>
                                <div className="football-search__thumbnail" aria-hidden={!article.imageUrl}>
                                    {article.imageUrl ? (
                                        <img
                                            src={article.imageUrl}
                                            alt={article.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        'BÓNG ĐÁ'
                                    )}
                                </div>
                                <div className="football-search__content">
                                    <p className="football-search__category">
                                        {categoryMap[article.categoryId] || article.categoryId}
                                    </p>
                                    <h2>{article.title}</h2>
                                    <p className="football-search__summary">{article.summary}</p>
                                    <p className="football-search__date">
                                        {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    {results.length === 0 && (
                        <div className="football-search__empty">
                            <h2>Không tìm thấy bài viết</h2>
                            <p>Thử từ khóa khác.</p>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default SearchPage;