import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../apiConfig';
import { FaMoneyCheckAlt, FaCreditCard, FaTruck } from 'react-icons/fa';

const AdminPayments = () => {
    const [payments, setPayments] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchPayments = async () => {
        try {
            const res = await axios.get(`${BASE_URL}payments`, {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            setPayments(res.data);
        } catch (err) {
            console.error("Error fetching transactions", err);
        }
    };

    useEffect(() => {
        if (user && user.isAdmin) fetchPayments();
    }, [user]);

    const getPaymentBadge = (payment) => {
        const isCOD = payment.method === "COD";

        if (isCOD) {
            return (
                <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    width: 'fit-content'
                }}>
                    <FaTruck /> COD - UNPAID
                </span>
            );
        } else {
            return (
                <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    width: 'fit-content'
                }}>
                    <FaCreditCard /> ONLINE - PAID
                </span>
            );
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontWeight: "500", fontSize: '32px', color: "var(--primary)", fontFamily: "'Playfair Display', serif", margin: 0 }}>Payment Transactions</h1>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ padding: '10px 20px', backgroundColor: 'var(--card-bg)', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)', textTransform: 'uppercase' }}>Total Collected</p>
                        <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>
                            ₹ {payments.filter(p => p.method !== "COD").reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('en-IN')}
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '10px', boxShadow: "0 4px 6px rgba(0,0,0,0.05)", overflowX: 'auto' }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: '800px' }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Transaction ID</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Customer</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Date</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Amount</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Method</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                <td style={{ padding: "15px", fontSize: '13px', fontFamily: 'monospace', color: 'var(--text-light)' }}>
                                    {payment.paymentId || payment._id.slice(-8).toUpperCase()}
                                </td>
                                <td style={{ padding: "15px", fontSize: '14px', fontWeight: '500' }}>
                                    {payment.userId?.username || "Guest User"}
                                </td>
                                <td style={{ padding: "15px", fontSize: '13px', color: 'var(--text-light)' }}>
                                    {new Date(payment.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: "15px", fontSize: '14px', fontWeight: 'bold' }}>
                                    ₹ {payment.amount.toLocaleString('en-IN')}
                                </td>
                                <td style={{ padding: "15px" }}>
                                    {getPaymentBadge(payment)}
                                </td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        backgroundColor: payment.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                        color: payment.status === 'completed' ? '#10b981' : '#d97706',
                                        textTransform: 'uppercase'
                                    }}>
                                        {payment.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {payments.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ padding: "30px", textAlign: "center", color: 'var(--text-light)' }}>No transactions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPayments;
