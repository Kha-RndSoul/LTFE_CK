import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/RequestState.css';

type Props = { kind: 'loading' | 'error' | 'not-found'; onRetry?: () => void };

function RequestState({ kind, onRetry }: Props) {
  if (kind === 'loading') {
    return (
      <div className="request-state request-state--loading" role="status">
        <span className="request-state__spinner" aria-hidden="true" />
        Đang tải dữ liệu...
      </div>
    );
  }
  return (
    <div className="request-state" role={kind === 'error' ? 'alert' : undefined}>
      <h2>{kind === 'error' ? 'Không thể tải dữ liệu' : 'Không tìm thấy bài viết'}</h2>
      <p>{kind === 'error'
        ? 'Vui lòng kiểm tra kết nối và thử lại.'
        : 'Bài viết có thể đã được gỡ hoặc đường dẫn chưa chính xác.'}</p>
      {kind === 'error' && onRetry && <button type="button" onClick={onRetry}>Thử lại</button>}
      <Link to="/">Về trang chủ</Link>
    </div>
  );
}

export default RequestState;
