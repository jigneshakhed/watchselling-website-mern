import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../apiConfig';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${BASE_URL}products`, {
                headers: { token: `Bearer ${user.accessToken}` }
            });
            setProducts(res.data);
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };

    useEffect(() => {
        if (user && user.isAdmin) fetchProducts();
    }, [user]);

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`${BASE_URL}products/${id}`, {
                    headers: { token: `Bearer ${user.accessToken}` }
                });
                fetchProducts();
            } catch (err) {
                console.error("Error deleting product", err);
            }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontWeight: "500", fontSize: '32px', color: "var(--primary)", fontFamily: "'Playfair Display', serif", margin: 0 }}>Product Management</h1>
                <Link to="/admin/products/new" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <FaPlus /> ADD NEW WATCH
                </Link>
            </div>

            <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '10px', boxShadow: "0 4px 6px rgba(0,0,0,0.05)", overflowX: 'auto' }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: '800px' }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Image</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Name</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Category</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Price</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Stock</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p._id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                <td style={{ padding: "15px", textAlign: "left" }}>
                                    <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>
                                        <img src={p.image.startsWith('http') ? p.image : `https://watchselling-website-mern.onrender.com/uploads/${p.image}`} style={{ maxWidth: "40px", maxHeight: "40px", objectFit: "contain" }} alt={p.name} />
                                    </div>
                                </td>
                                <td style={{ padding: "15px", fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>{p.name}</td>
                                <td style={{ padding: "15px", fontSize: '14px', color: 'var(--text-light)', textTransform: 'capitalize' }}>{p.category || 'Watch'}</td>
                                <td style={{ padding: "15px", fontSize: '14px', fontWeight: '600' }}>₹ {p.price?.toLocaleString('en-IN')}</td>
                                <td style={{ padding: "15px", fontSize: '14px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        backgroundColor: p.stockQuantity > 0 ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                                        color: p.stockQuantity > 0 ? '#2e7d32' : '#d32f2f'
                                    }}>
                                        {p.stockQuantity ?? 10}
                                    </span>
                                </td>
                                <td style={{ padding: "15px", textAlign: "right" }}>
                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                        <Link to={`/admin/products/edit/${p._id}`} style={{ color: "var(--primary)", padding: '8px', borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} title="Edit">
                                            <FaEdit />
                                        </Link>
                                        <button onClick={() => handleDeleteProduct(p._id)} style={{ color: "#d32f2f", cursor: "pointer", background: "rgba(211, 47, 47, 0.1)", border: "none", padding: '8px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Delete">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ padding: "30px", textAlign: "center", color: 'var(--text-light)' }}>No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
