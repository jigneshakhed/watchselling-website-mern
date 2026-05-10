import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTachometerAlt, FaBox, FaPlus, FaShoppingCart, FaUsers, FaEnvelope, FaSignOutAlt, FaStore, FaTags, FaMoneyCheckAlt } from 'react-icons/fa';

const AdminLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user || !user.isAdmin) {
        return <div style={{ padding: "50px", textAlign: "center", fontSize: "20px" }}>Access Denied. Admin privileges required.</div>;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const sidebarStyle = {
        width: '250px',
        backgroundColor: 'var(--primary)',
        color: 'white',
        minHeight: 'calc(100vh - 90px)',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 15px',
        borderRadius: '5px',
        transition: 'background-color 0.3s'
    };

    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 90px)', backgroundColor: 'var(--bg-light)' }}>
            <div style={sidebarStyle} className="admin-sidebar">
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--secondary)' }}>Admin Panel</h3>

                <Link to="/admin" style={linkStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <FaTachometerAlt /> Dashboard
                </Link>
                <Link to="/admin/products" style={linkStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <FaBox /> Products
                </Link>
                <Link to="/admin/products/new" style={linkStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <FaPlus /> Add Watch
                </Link>
                <Link to="/admin/orders" style={linkStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <FaShoppingCart /> Orders
                </Link>
                <Link to="/admin/categories" style={linkStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <FaTags /> Categories
                </Link>
                <Link to="/admin/payments" style={linkStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <FaMoneyCheckAlt /> Payments
                </Link>
                <Link to="/admin/contacts" style={linkStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <FaEnvelope /> Messages
                </Link>
                <Link to="/admin/users" style={linkStyle} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <FaUsers /> Users
                </Link>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link to="/" style={{ ...linkStyle, color: 'var(--text-light)' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-light)'}>
                        <FaStore /> Back to Store
                    </Link>
                    <button onClick={handleLogout} style={{ ...linkStyle, background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b', width: '100%', textAlign: 'left' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            <div style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
