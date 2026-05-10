import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../apiConfig';
import { NotificationContext } from '../context/NotificationContext';
import { FaTrash, FaPlus } from 'react-icons/fa';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${BASE_URL}categories`);
            setCategories(res.data);
        } catch (err) {
            console.error("Error fetching categories", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.accessToken}` } };
            await axios.post(`${BASE_URL}categories`, { name: newCategory }, config);
            showNotification("Category added successfully!");
            setNewCategory("");
            fetchCategories();
        } catch (err) {
            console.error("Error adding category", err);
            showNotification("Error adding category", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.accessToken}` } };
            await axios.delete(`${BASE_URL}categories/${id}`, config);
            showNotification("Category deleted successfully!");
            fetchCategories();
        } catch (err) {
            console.error("Error deleting category", err);
            showNotification("Error deleting category", "error");
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

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ fontWeight: "500", fontSize: '32px', color: "var(--primary)", fontFamily: "'Playfair Display', serif", marginBottom: '30px' }}>
                Manage Categories
            </h1>

            <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '10px', boxShadow: "0 4px 6px rgba(0,0,0,0.05)", maxWidth: '600px', marginBottom: '40px' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: 'var(--primary)' }}>Add New Category</h3>
                <form onSubmit={handleAddCategory} style={{ display: "flex", gap: "10px" }}>
                    <input
                        placeholder="e.g. Ultra Luxury"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <button
                        type="submit"
                        className="btn"
                        disabled={loading}
                        style={{ padding: "10px 20px", display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px', justifyContent: 'center' }}
                    >
                        {loading ? "Adding..." : <><FaPlus /> Add</>}
                    </button>
                </form>
            </div>

            <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '10px', boxShadow: "0 4px 6px rgba(0,0,0,0.05)", maxWidth: '800px' }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: 'var(--primary)' }}>Existing Categories</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '15px 10px', color: 'var(--text-light)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Category Name</th>
                                <th style={{ textAlign: 'right', padding: '15px 10px', color: 'var(--text-light)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>No categories found.</td>
                                </tr>
                            ) : categories.map((cat) => (
                                <tr key={cat._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                                    <td style={{ padding: '15px 10px', fontWeight: '500' }}>{cat.name}</td>
                                    <td style={{ padding: '15px 10px', textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleDeleteCategory(cat._id)}
                                            style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', padding: '5px' }}
                                            title="Delete Category"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
