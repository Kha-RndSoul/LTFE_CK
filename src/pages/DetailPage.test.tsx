import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailPage from './DetailPage';
import { getNewsById } from './newsApi';
import { getCategoryById } from '../services/api';

jest.mock('./newsApi');
jest.mock('../services/api');

const article = {
  id: '1', categoryId: 'anh', title: 'Bài viết kiểm thử', summary: 'Tóm tắt kiểm thử',
  content: 'Đoạn thứ nhất\nĐoạn thứ hai', imageUrl: '', publishedAt: '2026-11-07T09:00:00Z',
};

function openDetail() {
  return render(
    <MemoryRouter initialEntries={['/tin-tuc/1']}>
      <Routes><Route path="/tin-tuc/:id" element={<DetailPage />} /></Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.resetAllMocks();
  jest.mocked(getCategoryById).mockResolvedValue({ id: 'anh', name: 'Anh' });
});

test('loads the article selected by URL and renders its paragraphs', async () => {
  jest.mocked(getNewsById).mockResolvedValue(article);
  openDetail();
  expect(await screen.findByRole('heading', { name: article.title })).toBeInTheDocument();
  expect(getNewsById).toHaveBeenCalledWith('1', expect.any(AbortSignal));
  expect(screen.getByText('Đoạn thứ hai')).toBeInTheDocument();
});

test('shows missing article separately from network failure', async () => {
  jest.mocked(getNewsById).mockResolvedValue(null);
  openDetail();
  expect(await screen.findByRole('heading', { name: 'Không tìm thấy bài viết' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Thử lại' })).not.toBeInTheDocument();
});

test('allows retry after a connection error', async () => {
  jest.mocked(getNewsById).mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(article);
  openDetail();
  fireEvent.click(await screen.findByRole('button', { name: 'Thử lại' }));
  expect(await screen.findByRole('heading', { name: article.title })).toBeInTheDocument();
});
