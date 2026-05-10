import React, { useContext, useEffect } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Notification = () => {
    const { notification, hideNotification } = useContext(NotificationContext);

    if (!notification.show) return null;

    const getIcon = () => {
        switch (notification.type) {
            case 'success': return <FaCheckCircle style={{ color: '#2e7d32' }} />;
            case 'error': return <FaExclamationCircle style={{ color: '#d32f2f' }} />;
            case 'info': return <FaInfoCircle style={{ color: 'var(--secondary)' }} />;
            default: return null;
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '110px', // Below Navbar
            right: '25px',
            backgroundColor: '#FFFFFF',
            color: 'var(--text-main)',
            padding: '16px 24px',
            borderRadius: '4px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            zIndex: 1000,
            borderLeft: `5px solid ${notification.type === 'success' ? '#2e7d32' : notification.type === 'error' ? '#d32f2f' : 'var(--secondary)'}`,
            animation: 'slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            maxWidth: '400px',
            fontFamily: "'Inter', sans-serif"
        }}>
            <style>
                {`
                    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                `}
            </style>
            <div style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                {getIcon()}
            </div>
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', letterSpacing: '0.5px' }}>
                    {notification.message}
                </p>
            </div>
            <button
                onClick={hideNotification}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-light)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px',
                    transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-light)'}
            >
                <FaTimes size={14} />
            </button>
        </div>
    );
};

export default Notification;
