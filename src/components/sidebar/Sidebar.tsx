import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                <h3 style={{ color: '#00285e', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: 0 }}>
                    Bảng Xếp Hạng
                </h3>
                <p style={{ fontStyle: 'italic', color: '#666' }}>(Chỗ này Thành viên 2 sẽ fetch API standings)</p>
            </div>

            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
                <h3 style={{ color: '#00285e', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: 0 }}>
                    Lịch Thi Đấu
                </h3>
                <p style={{ fontStyle: 'italic', color: '#666' }}>(Chỗ này Thành viên 2 sẽ fetch API matches)</p>
            </div>

        </div>
    );
};

export default Sidebar;