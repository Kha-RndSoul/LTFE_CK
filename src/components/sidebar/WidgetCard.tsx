import React from 'react';

interface WidgetCardProps {
    title: string;
    children: React.ReactNode;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, children }) => {
    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            <h3 style={{ color: '#00285e', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: 0 }}>
                {title}
            </h3>
            {children}
        </div>
    );
};

export default WidgetCard;