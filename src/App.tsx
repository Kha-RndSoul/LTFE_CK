import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    {/* trang tin theo giải đấu */}
                    <Route path="the-thao/:categoryId" element={<CategoryPage />} />
                    <Route path="tin-tuc/:id" element={<DetailPage />} />
                    <Route path="tim-kiem" element={<SearchPage />} />
                    {/* trang báo lỗi 404 khi sai đường dẫn */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
