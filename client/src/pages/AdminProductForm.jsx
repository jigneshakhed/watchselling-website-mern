import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../apiConfig';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { NotificationContext } from '../context/NotificationContext';

const AdminProductForm = () => {
    const { id } = useParams();
    const isEditing = !!id;
    const { user } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    const [product, setProduct] = useState({ name: "", price: "", stockQuantity: 10, image: "", description: "", category: "" });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${BASE_URL}categories`);
                setCategories(res.data);
                if (!isEditing && res.data.length > 0) {
                    setProduct(prev => ({ ...prev, category: res.data[0].name }));
                }
            } catch (err) {
                console.error("Error fetching categories", err);
            }
        };
        fetchCategories();

        if (isEditing && user && user.isAdmin) {
            const fetchProduct = async () => {
                try {
                    const res = await axios.get(`${BASE_URL}products/find/${id}`);
                    setProduct(res.data);
                } catch (err) {
                    console.error("Error fetching product", err);
                    showNotification("Product not found", 'error');
                    navigate('/admin/products');
                }
            };
            fetchProduct();
        }
    }, [id, isEditing, user, navigate]);

    const handleUpload = async () => {
        if (!file) return null;
        const data = new FormData();
        data.append("file", file);
        try {
            const res = await axios.post("https://watchselling-website-mern.onrender.com/api/upload", data);
            return res.data; // returns filename
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = product.image;
        if (file) {
            const uploadedFile = await handleUpload();
            if (uploadedFile) imageUrl = uploadedFile;
        }

        try {
            const config = { headers: { Authorization: `Bearer ${user.accessToken}` } };
            const payload = { ...product, image: imageUrl };

            if (isEditing) {
                await axios.put(`${BASE_URL}products/${id}`, payload, config);
                showNotification("Product updated successfully!");
            } else {
                await axios.post(`${BASE_URL}products`, payload, config);
                showNotification("Product added successfully!");
            }
            navigate('/admin/products');
        } catch (err) {
            console.error("Error saving product", err);
            showNotification("Error saving product. Please try again.", 'error');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        padding: "12px 15px",
        border: "1px solid var(--border-color)",
        borderRadius: "5px",
        fontSize: "14px",
        width: "100%",
        fontFamily: "'Inter', sans-serif",
        boxSizing: 'border-box'
    };

    const labelStyle = {
        display: "block",
        marginBottom: "8px",
        fontSize: "13px",
        fontWeight: "600",
        color: "var(--text-main)",
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <Link to="/admin/products" style={{ color: 'var(--text-light)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '15px' }}>
                    <FaArrowLeft /> Back to Products
                </Link>
                <h1 style={{ fontWeight: "500", fontSize: '32px', color: "var(--primary)", fontFamily: "'Playfair Display', serif", margin: 0 }}>
                    {isEditing ? "Edit Watch" : "Add New Watch"}
                </h1>
            </div>

            <div style={{ backgroundColor: 'var(--card-bg)', padding: '40px', borderRadius: '10px', boxShadow: "0 4px 6px rgba(0,0,0,0.05)", maxWidth: '800px' }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>

                    <div>
                        <label style={labelStyle}>Product Name</label>
                        <input
                            placeholder="e.g. Submariner Date"
                            value={product.name}
                            onChange={e => setProduct({ ...product, name: e.target.value })}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={labelStyle}>Price (₹)</label>
                            <input
                                placeholder="0"
                                type="number"
                                value={product.price}
                                onChange={e => setProduct({ ...product, price: e.target.value })}
                                required
                                style={inputStyle}
                            />
                        </div>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={labelStyle}>Stock Quantity</label>
                            <input
                                placeholder="10"
                                type="number"
                                value={product.stockQuantity}
                                onChange={e => setProduct({ ...product, stockQuantity: e.target.value })}
                                required
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Category</label>
                        <select
                            value={product.category}
                            onChange={e => setProduct({ ...product, category: e.target.value })}
                            style={inputStyle}
                            required
                        >
                            <option value="" disabled>Select a Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ backgroundColor: "var(--bg-light)", padding: "20px", borderRadius: "5px", border: '1px solid var(--border-color)' }}>
                        <h3 style={{ margin: '0 0 15px 0', fontSize: '15px' }}>Product Image</h3>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: "12px", color: "var(--text-light)", display: "block", marginBottom: "5px" }}>Upload a new image file:</label>
                            <input type="file" onChange={e => setFile(e.target.files[0])} style={{ width: '100%' }} />
                        </div>

                        <div style={{ position: 'relative', textAlign: 'center', margin: '15px 0' }}>
                            <span style={{ backgroundColor: 'var(--bg-light)', padding: '0 10px', color: 'var(--text-light)', fontSize: '12px' }}>OR</span>
                            <hr style={{ position: 'absolute', top: '50%', left: 0, right: 0, border: 'none', borderTop: '1px solid var(--border-color)', zIndex: -1, margin: 0 }} />
                        </div>

                        <div>
                            <label style={{ fontSize: "12px", color: "var(--text-light)", display: "block", marginBottom: "5px" }}>Provide an image URL:</label>
                            <input
                                placeholder="https://example.com/image.jpg"
                                value={product.image}
                                onChange={e => setProduct({ ...product, image: e.target.value })}
                                style={inputStyle}
                            />
                        </div>

                        {product.image && !file && (
                            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: 'white', display: 'inline-block', borderRadius: '5px' }}>
                                <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: 'var(--text-light)' }}>Current Image Preview:</p>
                                <img src={product.image.startsWith('http') ? product.image : `https://watchselling-website-mern.onrender.com/uploads/${product.image}`} alt="Preview" style={{ height: '80px', objectFit: 'contain' }} />
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={labelStyle}>Description</label>
                        <textarea
                            placeholder="Detailed product description..."
                            value={product.description}
                            onChange={e => setProduct({ ...product, description: e.target.value })}
                            style={{ ...inputStyle, minHeight: "150px", resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn"
                            style={{ padding: "15px 30px", opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? "SAVING..." : (isEditing ? "UPDATE WATCH" : "ADD WATCH")}
                        </button>
                        <Link to="/admin/products" className="btn-secondary" style={{ padding: "15px 30px", textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            CANCEL
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;
