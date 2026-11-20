import React from 'react';
import { Link } from 'react-router-dom';
import { ICategory } from '../../types';
import useAPI from '../../hooks/useAPI';
import { BASE_URL } from '../../services/api';
import '../../assets/styles/Footer.css';

const Footer: React.FC = () => {
    const { data: categories } = useAPI<ICategory[]>(`${BASE_URL}/categories`);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <footer className="site-footer">
                <div className="site-footer__container">
                    <div>
                        <Link to="/" onClick={scrollToTop} className="site-footer__logo">
                            BONGDA24H
                        </Link>
                        <p className="site-footer__desc">
                            Chuyên trang cập nhật tin tức bóng đá trong nước và quốc tế 24/7.
                            Tổng hợp nhanh lịch thi đấu, bảng xếp hạng và nhận định các giải đấu hàng đầu.
                        </p>
                        <div className="site-footer__badges">
                            <span>⚽ Tin nóng 24/7</span>
                            <span>•</span>
                            <span>📊 Dữ liệu trực tuyến</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="site-footer__heading">Chuyên mục</h4>
                        <ul className="site-footer__nav">
                            <li>
                                <Link to="/" onClick={scrollToTop} className="site-footer__link">
                                    › Trang chủ
                                </Link>
                            </li>
                            {categories?.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        to={`/the-thao/${cat.id}`}
                                        onClick={scrollToTop}
                                        className="site-footer__link"
                                    >
                                        › {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="site-footer__heading">Thông tin dự án</h4>
                        <div className="site-footer__info">
                            <p><strong>Đồ án:</strong> Website Tin Tức Bóng Đá</p>
                            <p><strong>Công nghệ:</strong> React, TypeScript, Axios, JSON Server</p>
                            <p><strong>Email tòa soạn:</strong> banbientap@bongda24h.vn</p>
                            <p><strong>Hotline:</strong> (028) 3896 6780</p>
                        </div>
                    </div>
                </div>

                <div className="site-footer__bottom">
                    <div className="site-footer__bottom-inner">
                        <span>© 2026 BONGDA24H — Đồ án môn học Lập trình Frontend. Dữ liệu phục vụ mục đích minh họa.</span>
                    </div>
                </div>
            </footer>

            <button
                type="button"
                onClick={scrollToTop}
                className="scroll-top-btn"
                aria-label="Lên đầu trang"
                title="Lên đầu trang"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>
        </>
    );
};

export default Footer;