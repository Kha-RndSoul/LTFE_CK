import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import redCardImg from '../assets/images/redCard.jpg';
import '../assets/styles/NotFoundPage.css';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="not-found" aria-labelledby="not-found-title">
            <img
                src={redCardImg}
                alt="Trọng tài thổi còi rút thẻ đỏ báo lỗi 404"
                className="not-found__illustration"
            />

            <span className="not-found__badge">Lỗi 404</span>

            <h1 id="not-found-title" className="not-found__title">
                Đường dẫn này đã rơi vào thế việt vị!
            </h1>

            <p className="not-found__desc">
                Trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc địa chỉ URL trên thanh trình duyệt chưa chính xác.
            </p>

            <div className="not-found__actions">
                <Link to="/" className="not-found__btn not-found__btn--primary">
                    Về Trang chủ
                </Link>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="not-found__btn not-found__btn--secondary"
                >
                    Quay lại trang trước
                </button>
            </div>
        </section>
    );
};

export default NotFoundPage;