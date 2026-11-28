import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ICategory, INews } from '../types';
import useAPI from '../hooks/useAPI';
import { BASE_URL } from '../services/api';
import SearchForm from '../components/SearchForm';
import NewsCard from '../components/common/NewsCard';
import RequestState from '../components/common/RequestState';
import '../assets/styles/SearchPage.css';

// Đổi về chữ thường, bỏ dấu để "bong da" vẫn tìm được "bóng đá".
function normalize(text: string) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
}

function SearchPage() {
    const [params, setParams] = useSearchParams();
    const keyword = params.get('q') || '';
    const { data: news, loading, error, refetch } = useAPI<INews[]>(`${BASE_URL}/news`);
    const { data: categories } = useAPI<ICategory[]>(`${BASE_URL}/categories`);
    const categoryName = (id: string) => categories?.find((cat) => cat.id === id)?.name || id;
    const results = (news || []).filter((item) =>
        normalize(`${item.title} ${item.summary} ${categoryName(item.categoryId)}`).includes(normalize(keyword))
    );

    return (
        <section className="football-search">
            <nav className="football-search__breadcrumb" aria-label="Đường dẫn chuyên mục">
                <Link to="/">Trang chủ</Link><span>›</span><span>Tìm kiếm</span>
            </nav>
            <h1>Tìm kiếm tin bóng đá</h1>
            <SearchForm initialKeyword={keyword} onSearch={(q) => setParams(q ? { q } : {})} />
            {loading ? <RequestState kind="loading" /> : error ? (
                <RequestState kind="error" onRetry={refetch} />
            ) : (
                <>
                    <p className="football-search__count" role="status">
                        {keyword.trim() ? `Tìm thấy ${results.length} bài viết cho “${keyword}”` : `Tất cả ${results.length} bài viết`}
                    </p>
                    {results.map((article) => (
                        <NewsCard key={article.id} article={article} categoryName={categoryName(article.categoryId)} />
                    ))}
                    {results.length === 0 && <p className="football-search__empty">Không tìm thấy bài viết. Thử từ khóa khác.</p>}
                </>
            )}
        </section>
    );
}

export default SearchPage;
