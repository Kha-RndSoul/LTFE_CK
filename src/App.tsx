
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetailPage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    {/* trang tin theo giai dau*/}
                    <Route path="the-thao/:categoryId" element={<CategoryPage />} />
                    <Route path="tin-tuc/:id" element={<DetailPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
