import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../apiConfig';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`${BASE_URL}orders/find/${user._id}`, {
                    headers: { token: `Bearer ${user.accessToken}` }
                });
                setOrders(res.data);
            } catch (err) { }
        };
        if (user) getOrders();
    }, [user]);

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>My Orders</h1>
            {orders.length === 0 ? (
                <p style={{ textAlign: "center" }}>You have no orders yet.</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "25px", maxWidth: '800px', margin: '0 auto' }}>
                    {orders.map(order => (
                        <div key={order._id} style={{ 
                            backgroundColor: 'var(--card-bg)', 
                            padding: "30px", 
                            borderRadius: "12px", 
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>Order ID: #{order._id.slice(-8).toUpperCase()}</h3>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: 'var(--text-light)' }}>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span style={{
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    fontWeight: '700',
                                    letterSpacing: '1px',
                                    backgroundColor: 
                                        order.status === 'cod' ? 'rgba(255, 193, 7, 0.1)' : 
                                        order.status === 'paid' ? 'rgba(46, 125, 50, 0.1)' : 
                                        'rgba(245, 158, 11, 0.1)',
                                    color: 
                                        order.status === 'cod' ? '#ffc107' : 
                                        order.status === 'paid' ? '#2e7d32' : 
                                        '#d97706'
                                }}>
                                    {order.status === 'cod' ? 'Cash on Delivery' : order.status}
                                </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                                {order.products.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--bg-light)', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                                            {item.productId?.image && (
                                                <img 
                                                    src={item.productId.image.startsWith('http') ? item.productId.image : `https://watchselling-website-mern.onrender.com/uploads/${item.productId.image}`} 
                                                    alt="" 
                                                    style={{ width: '80%', height: '80%', objectFit: 'contain' }} 
                                                />
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--text-main)' }}>{item.productId?.name || "Deleted Product"}</h4>
                                            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-light)' }}>Qty: {item.quantity}</p>
                                        </div>
                                        <p style={{ margin: 0, fontWeight: '600', color: 'var(--primary)' }}>₹ {(item.productId?.price * item.quantity).toLocaleString('en-IN')}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '14px', color: 'var(--text-light)' }}>Total Amount</span>
                                <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>₹ {Number(order.amount || 0).toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
