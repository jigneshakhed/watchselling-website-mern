import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../apiConfig';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${BASE_URL}orders`, {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders", err);
        }
    };

    useEffect(() => {
        if (user && user.isAdmin) fetchOrders();
    }, [user]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put(`${BASE_URL}orders/${id}`, { status }, {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            fetchOrders();
        } catch (err) {
            console.error("Error updating order status", err);
        }
    };

    return (
        <div>
            <h1 style={{ fontWeight: "500", fontSize: '32px', color: "var(--primary)", fontFamily: "'Playfair Display', serif", marginBottom: '30px' }}>Order Management</h1>

            <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '10px', boxShadow: "0 4px 6px rgba(0,0,0,0.05)", overflowX: 'auto' }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: '800px' }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Order ID</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Customer</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Products</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Amount</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Payment</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Action / Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o._id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                <td style={{ padding: "15px", fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-light)' }}>
                                    #{o._id.slice(-8).toUpperCase()}
                                    <div style={{ fontSize: '10px', marginTop: '4px' }}>{new Date(o.createdAt).toLocaleDateString()}</div>
                                </td>
                                <td style={{ padding: "15px", fontSize: '14px', fontWeight: '500' }}>
                                    {o.userId?.username || "Guest User"}
                                    <div style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--text-light)' }}>ID: {o.userId?._id?.slice(-6)}</div>
                                </td>
                                <td style={{ padding: "15px" }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {o.products.map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '35px', height: '35px', backgroundColor: 'var(--bg-light)', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {item.productId?.image ? (
                                                        <img 
                                                            src={item.productId.image.startsWith('http') ? item.productId.image : `https://watchselling-website-mern.onrender.com/uploads/${item.productId.image}`} 
                                                            alt="" 
                                                            style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                                                        />
                                                    ) : (
                                                        <div style={{ fontSize: '10px', color: 'var(--text-light)' }}>N/A</div>
                                                    )}
                                                </div>
                                                <div style={{ fontSize: '13px' }}>
                                                    <span style={{ fontWeight: '600' }}>{item.productId?.name || "Deleted Product"}</span>
                                                    <span style={{ marginLeft: '10px', color: 'var(--secondary)', fontWeight: 'bold' }}>x{item.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td style={{ padding: "15px", fontSize: '14px', fontWeight: 'bold', color: 'var(--primary)' }}>₹ {o.amount.toLocaleString('en-IN')}</td>
                                <td style={{ padding: "15px" }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        backgroundColor: o.paymentId === 'COD' ? '#fffbe6' : '#e6f7ff',
                                        color: o.paymentId === 'COD' ? '#d48806' : '#1890ff',
                                        border: `1px solid ${o.paymentId === 'COD' ? '#ffe58f' : '#91d5ff'}`
                                    }}>
                                        {o.paymentId === 'COD' ? 'COD' : 'ONLINE'}
                                    </span>
                                    <div style={{ fontSize: '10px', marginTop: '4px', color: 'var(--text-light)' }}>
                                        Status: <span style={{ color: o.status === 'paid' ? '#52c41a' : '#faad14' }}>{o.status.toUpperCase()}</span>
                                    </div>
                                </td>
                                <td style={{ padding: "15px" }}>
                                    <select
                                        value={o.status}
                                        onChange={(e) => handleStatusUpdate(o._id, e.target.value)}
                                        style={{
                                            padding: "8px 12px",
                                            borderRadius: "4px",
                                            border: "1px solid var(--border-color)",
                                            fontSize: "12px",
                                            backgroundColor: o.status === 'pending' || o.status === 'cod' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(46, 125, 50, 0.05)',
                                            color: o.status === 'pending' || o.status === 'cod' ? '#d97706' : '#2e7d32',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="cod">COD (Unpaid)</option>
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="item packed">Item Packed</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: "30px", textAlign: "center", color: 'var(--text-light)' }}>No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
