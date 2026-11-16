
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    {/* trang tin theo giai dau, vd: /the-thao/anh */}
                    <Route path="the-thao/:categoryId" element={<CategoryPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;