import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../apiConfig';
import { Link } from 'react-router-dom';

const AdminOverview = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [contacts, setContacts] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchData = async () => {
        const config = { headers: { Authorization: `Bearer ${user.accessToken}` } };
        try {
            const prodRes = await axios.get(`${BASE_URL}products`, config);
            const orderRes = await axios.get(`${BASE_URL}orders`, config);
            const userRes = await axios.get(`${BASE_URL}users`, config);
            const contactRes = await axios.get(`${BASE_URL}contacts`, config);
            setProducts(prodRes.data);
            setOrders(orderRes.data);
            setUsers(userRes.data);
            setContacts(contactRes.data);
        } catch (err) {
            console.error("Error fetching overview data", err);
        }
    };

    useEffect(() => {
        if (user && user.isAdmin) fetchData();
    }, [user]);

    const statCardStyle = {
        flex: 1,
        margin: "10px",
        padding: "30px",
        backgroundColor: "var(--card-bg)",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        textDecoration: "none",
        color: "inherit",
        display: "block",
        transition: "transform 0.3s ease",
    };

    return (
        <div>
            <h1 style={{ fontWeight: "500", fontSize: '32px', color: "var(--primary)", fontFamily: "'Playfair Display', serif", marginBottom: '30px' }}>Dashboard Overview</h1>

            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: 'wrap', gap: '20px' }}>
                <Link to="/admin/products" style={statCardStyle} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <h3 style={{ color: 'var(--text-light)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Total Products</h3>
                    <p style={{ fontSize: "36px", fontWeight: "bold", color: 'var(--primary)', margin: 0 }}>{products.length}</p>
                </Link>

                <Link to="/admin/orders" style={statCardStyle} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <h3 style={{ color: 'var(--text-light)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Pending Orders</h3>
                    <p style={{ fontSize: "36px", fontWeight: "bold", color: 'var(--secondary)', margin: 0 }}>{orders.filter(o => o.status === 'pending').length}</p>
                </Link>

                <Link to="/admin/users" style={statCardStyle} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <h3 style={{ color: 'var(--text-light)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Registered Users</h3>
                    <p style={{ fontSize: "36px", fontWeight: "bold", color: 'var(--primary)', margin: 0 }}>{users.length}</p>
                </Link>

                <Link to="/admin/contacts" style={statCardStyle} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <h3 style={{ color: 'var(--text-light)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>New Messages</h3>
                    <p style={{ fontSize: "36px", fontWeight: "bold", color: 'var(--primary)', margin: 0 }}>{contacts.length}</p>
                </Link>
            </div>

            <div style={{ marginTop: '50px', backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '10px', boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <h2 style={{ fontSize: '20px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>Recent Orders</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
                            <th style={{ padding: "12px 8px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Customer</th>
                            <th style={{ padding: "12px 8px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Amount</th>
                            <th style={{ padding: "12px 8px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.slice(0, 5).map(o => (
                            <tr key={o._id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                <td style={{ padding: "15px 8px", fontSize: '14px', fontWeight: '500' }}>
                                    {o.userId?.username || "Guest"}
                                    <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: 'normal' }}>#{o._id.slice(-6).toUpperCase()}</div>
                                </td>
                                <td style={{ padding: "15px 8px", fontSize: '14px', fontWeight: 'bold' }}>₹ {o.amount.toLocaleString('en-IN')}</td>
                                <td style={{ padding: "15px 8px", fontSize: '14px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        fontWeight: '600',
                                        backgroundColor: o.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(46, 125, 50, 0.1)',
                                        color: o.status === 'pending' ? '#d97706' : '#2e7d32'
                                    }}>
                                        {o.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="3" style={{ padding: "20px", textAlign: "center", color: 'var(--text-light)' }}>No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOverview;
