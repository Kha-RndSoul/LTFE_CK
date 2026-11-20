import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { getAllNews, getCategories } from './services/api';

jest.mock('./services/api');

test('renders the football site inside the shared layout', async () => {
    jest.mocked(getAllNews).mockResolvedValue([]);
    jest.mocked(getCategories).mockResolvedValue([]);
    render(<App />);
    expect(screen.getByRole('link', { name: 'BONGDA24H' })).toHaveAttribute('href', '/');
    expect(await screen.findByRole('heading', { name: 'Tin Tức Nổi Bật' })).toBeInTheDocument();
    expect(await screen.findByText('Bảng Xếp Hạng')).toBeInTheDocument();
});
