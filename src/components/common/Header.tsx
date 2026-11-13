import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ICategory } from '../../types';
import { getCategories } from '../../services/api';

const Header: React.FC = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

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
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 40px',
                borderBottom: '1px solid #eee'
            }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link to="/" style={{ color: '#008b3e', textDecoration: 'none', fontSize: '2rem', fontWeight: '900', fontStyle: 'italic' }}>
                        BONGDA24H
                    </Link>
                    <span style={{ color: '#666', borderLeft: '1px solid #ddd', paddingLeft: '20px' }}>
            {getCurrentDate()}
          </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #ddd',
                        borderRadius: '20px',
                        padding: '5px 15px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            style={{ border: 'none', outline: 'none', width: '200px', backgroundColor: 'transparent' }}
                        />
                        <span style={{ cursor: 'pointer', fontSize: '16px' }}>🔍</span>
                    </div>

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
                fontWeight: 'bold',
                fontSize: '15px'
            }}>
                <Link to="/" style={{ textDecoration: 'none', fontSize: '18px' }}>
                    🏠
                </Link>

                {categories.map((cat) => (
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