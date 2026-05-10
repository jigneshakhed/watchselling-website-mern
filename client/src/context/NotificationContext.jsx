import React, { createContext, useState, useCallback } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'success' // 'success', 'error', 'info'
    });

    const showNotification = useCallback((message, type = 'success', duration = 3000) => {
        setNotification({
            show: true,
            message,
            type
        });

        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, duration);
    }, []);

    const hideNotification = useCallback(() => {
        setNotification(prev => ({ ...prev, show: false }));
    }, []);

    return (
        <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
