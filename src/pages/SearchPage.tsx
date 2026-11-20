import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import './SearchPage.css';

const sampleArticles = [
  {
    id: 1,
    category: 'Bóng đá Anh',
    title: 'Trước giờ bóng lăn: Sự chuẩn bị tạo nên khác biệt',
    summary: 'Sự tập trung và khả năng phối hợp là những điều người hâm mộ chờ đợi trước trận đấu.',
    date: '07/11/2026',
  },
  {
    id: 2,
    category: 'Bóng đá Việt Nam',
    title: 'Sức trẻ mang đến làn gió mới cho sân cỏ Việt Nam',
    summary: 'Các cầu thủ trẻ có thêm cơ hội thể hiện và tích lũy kinh nghiệm thi đấu.',
    date: '06/11/2026',
  },
  {
    id: 3,
    category: 'Bóng đá châu Âu',
    title: 'Cuộc đua ở tuyến giữa: Khi chiến thuật lên tiếng',
    summary: 'Cách bố trí đội hình và kiểm soát khoảng trống tạo nên những màn so tài hấp dẫn.',
    date: '05/11/2026',
  },
];

function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const normalizedKeyword = keyword.toLocaleLowerCase('vi');
  const results = sampleArticles.filter((article) =>
    `${article.title} ${article.category} ${article.summary}`
      .toLocaleLowerCase('vi')
      .includes(normalizedKeyword)
  );

  return (
    <section className="football-search" aria-labelledby="football-search-title">
      <nav className="football-search__breadcrumb" aria-label="Đường dẫn chuyên mục">
        <a href="/">Trang chủ</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Tìm kiếm</span>
      </nav>

      <h1 id="football-search-title">Tìm kiếm tin bóng đá</h1>
      <SearchForm onSearch={setKeyword} />

      <p className="football-search__count" role="status">
        {keyword ? `Tìm thấy ${results.length} bài viết cho “${keyword}”` : `${results.length} bài viết mẫu`}
      </p>

      <div className="football-search__results">
        {results.map((article) => (
          <article className="football-search__item" key={article.id}>
            <div className="football-search__thumbnail" aria-hidden="true">BÓNG ĐÁ</div>
            <div className="football-search__content">
              <p className="football-search__category">{article.category}</p>
              {/* Chưa gắn link: Router và dữ liệu chi tiết sẽ được tích hợp sau. */}
              <h2>{article.title}</h2>
              <p className="football-search__summary">{article.summary}</p>
              <p className="football-search__date">{article.date}</p>
            </div>
          </article>
        ))}
      </div>

      {results.length === 0 && (
        <div className="football-search__empty">
          <h2>Không tìm thấy bài viết</h2>
          <p>Thử từ khóa khác, chẳng hạn “bóng đá” hoặc “chiến thuật”.</p>
        </div>
      )}
    </section>
  );
}

export default SearchPage;
