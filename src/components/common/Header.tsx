import React from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ICategory } from '../../types';
import useAPI from '../../hooks/useAPI';
import { BASE_URL } from '../../services/api';
import SearchForm from '../SearchForm';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const { data: categories, loading, error } = useAPI<ICategory[]>(`${BASE_URL}/categories`);

    const getCurrentDate = () => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        return new Date().toLocaleDateString('vi-VN', options);
    };

    return (
        <header style={{ borderBottom: '2px solid #00502b', backgroundColor: '#fff' }}>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 40px',
                borderBottom: '1px solid #eee'
            }}>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
                    <Link to="/" style={{ color: '#008b3e', textDecoration: 'none', fontSize: '2rem', fontWeight: '900', fontStyle: 'italic' }}>
                        BONGDA24H
                    </Link>
                    <span style={{ color: '#666', borderLeft: '1px solid #ddd', paddingLeft: '20px' }}>
                        {getCurrentDate()}
                    </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '30px', maxWidth: '100%' }}>

                    <SearchForm
                        initialKeyword={location.pathname === '/tim-kiem' ? params.get('q') || '' : ''}
                        onSearch={(q) => navigate(`/tim-kiem?${new URLSearchParams({ q })}`)}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: '#333' }}>
                        <span style={{ fontSize: '18px' }}>👤</span>
                        <span style={{ fontWeight: '500' }}>Đăng nhập</span>
                    </div>
                </div>
            </div>

            <nav style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 40px',
                gap: '25px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
                fontSize: '15px'
            }}>
                <Link to="/" style={{ textDecoration: 'none', fontSize: '18px' }}>
                    🏠
                </Link>

                {loading && <span style={{ color: '#999', fontWeight: 'normal' }}>Đang tải danh mục...</span>}
                {error && <span style={{ color: 'red', fontWeight: 'normal' }}>Không tải được danh mục</span>}

                {categories?.map((cat) => (
                    <Link
                        key={cat.id}
                        to={`/the-thao/${cat.id}`}
                        style={{
                            color: '#333',
                            textDecoration: 'none',
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#008b3e')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
                    >
                        {cat.name}
                    </Link>
                ))}
            </nav>

        </header>
    );
};

export default Header;
