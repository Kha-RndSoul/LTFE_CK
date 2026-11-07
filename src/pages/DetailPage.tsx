import React from 'react';
import './DetailPage.css';

const article = {
  title: 'Trước giờ bóng lăn: Sự chuẩn bị tạo nên khác biệt',
  category: 'Bóng đá Anh',
  author: 'Ban biên tập',
  publishedAt: '2026-11-07T09:00:00+07:00',
  displayDate: '07/11/2026 · 09:00 (GMT+7)',
  description:
    'Một trận đấu hấp dẫn bắt đầu từ những bước chuẩn bị kỹ lưỡng. Sự tập trung, cách tổ chức đội hình và khả năng phối hợp là những yếu tố được người hâm mộ chờ đợi trước giờ bóng lăn.',
  paragraphs: [
    'Trên sân tập, các cầu thủ dành thời gian hoàn thiện những pha phối hợp ngắn và duy trì cự ly đội hình. Từng vị trí cần hiểu rõ nhiệm vụ để có thể hỗ trợ đồng đội khi trận đấu diễn ra với tốc độ cao.',
    'Khả năng kiểm soát khu vực giữa sân thường ảnh hưởng đến nhịp độ thi đấu. Một tập thể giữ được sự kết nối giữa các tuyến sẽ có thêm phương án triển khai bóng và hạn chế khoảng trống trước hàng phòng ngự.',
  ],
  tags: ['Bóng đá Anh', 'Trước trận đấu', 'Chiến thuật'],
};

function DetailPage() {
  return (
    <section className="news-detail" aria-labelledby="news-detail-title">
      <nav className="news-detail__breadcrumb" aria-label="Đường dẫn chuyên mục">
        <a href="/">Trang chủ</a>
        <span aria-hidden="true">›</span>
        <span>{article.category}</span>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Chi tiết tin</span>
      </nav>

      <article className="news-detail__article">
        <header>
          <p className="news-detail__category">{article.category}</p>
          <h1 id="news-detail-title" className="news-detail__title">
            {article.title}
          </h1>
          <div className="news-detail__meta">
            <span>Tác giả: <strong>{article.author}</strong></span>
            <time dateTime={article.publishedAt}>{article.displayDate}</time>
          </div>
          <p className="news-detail__lead">{article.description}</p>
        </header>

        <figure className="news-detail__figure">
          {/* Khung ảnh tĩnh; thay bằng thẻ img khi nhóm có ảnh bài viết. */}
          <div className="news-detail__image-placeholder">
            <div className="news-detail__pitch" aria-hidden="true">
              <span className="news-detail__pitch-circle" />
            </div>
            <span className="news-detail__image-label">Ảnh minh họa bài viết</span>
          </div>
          <figcaption>Không khí chuẩn bị trước giờ bóng lăn — hình minh họa.</figcaption>
        </figure>

        <div className="news-detail__body">
          {article.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <h2>Sự tập trung trong từng thời điểm</h2>
          <p>
            Ngoài chiến thuật, tinh thần thi đấu cũng đóng vai trò quan trọng.
            Duy trì sự bình tĩnh và đưa ra quyết định hợp lý giúp các cầu thủ
            tận dụng tốt hơn những cơ hội xuất hiện trên sân.
          </p>
          <p>
            Người hâm mộ chờ đợi một màn so tài cởi mở, nơi cả hai đội thể hiện
            được bản sắc và mang đến những tình huống bóng đáng nhớ.
          </p>
        </div>

        <footer className="news-detail__footer">
          <p className="news-detail__signature">{article.author}</p>
          <div className="news-detail__tags" aria-label="Chủ đề bài viết">
            <strong>Chủ đề:</strong>
            {article.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </footer>
      </article>
    </section>
  );
}

export default DetailPage;
