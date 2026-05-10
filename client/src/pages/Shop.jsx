import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WaitlistContext } from '../context/WaitlistContext';
import { BASE_URL } from '../apiConfig';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { NotificationContext } from '../context/NotificationContext';

const Shop = ({ category: initialCategory }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
    const { addToCart } = useContext(CartContext);
    const { waitlist, addToWaitlist, removeFromWaitlist } = useContext(WaitlistContext);
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${BASE_URL}categories`);
                setCategories(res.data);
            } catch (err) {
                console.error("Error fetching categories", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    activeCategory !== "all"
                        ? `${BASE_URL}products?category=${activeCategory}`
                        : `${BASE_URL}products`
                );
                
                if (activeCategory !== "all") {
                    setProducts(res.data.filter(item => item.category && item.category.toLowerCase() === activeCategory.toLowerCase()));
                } else {
                    setProducts(res.data);
                }
            } catch (err) {
                console.error("Error fetching products", err);
            }
        };
        getProducts();
    }, [activeCategory]);

    return (
        <div style={{ padding: "60px 20px", minHeight: '100vh', backgroundColor: 'var(--bg-light)' }}>
            <div className="container">
                <h1 style={{
                    textAlign: "center",
                    margin: "0 0 15px 0",
                    color: "var(--primary)",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "42px",
                    fontWeight: "500"
                }}>
                    {activeCategory !== "all" ? `${activeCategory}'s Timepieces` : "The Collection"}
                </h1>
                <p style={{
                    textAlign: "center",
                    color: "var(--text-light)",
                    marginBottom: "40px",
                    fontSize: "16px",
                    maxWidth: "600px",
                    margin: "0 auto 40px auto"
                }}>
                    Explore our exquisitely crafted collection of watches, designed for prestige and performance.
                </p>

                {/* Category Navigation */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '20px', 
                    marginBottom: '50px', 
                    flexWrap: 'wrap',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '20px'
                }}>
                    <button
                        onClick={() => setActiveCategory("all")}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            color: activeCategory === "all" ? 'var(--primary)' : 'var(--text-light)',
                            fontWeight: activeCategory === "all" ? '600' : '400',
                            borderBottom: activeCategory === "all" ? '2px solid var(--secondary)' : 'none',
                            fontSize: '14px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}
                    >
                        All Collection
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => setActiveCategory(cat.name)}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                color: activeCategory === cat.name ? 'var(--primary)' : 'var(--text-light)',
                                fontWeight: activeCategory === cat.name ? '600' : '400',
                                borderBottom: activeCategory === cat.name ? '2px solid var(--secondary)' : 'none',
                                fontSize: '14px',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: '40px' }}>
                    {products.length === 0 ? <p style={{ color: 'var(--text-light)', letterSpacing: '2px', textTransform: 'uppercase' }}>Discovering Timepieces...</p> : products.map((item) => (
                        <div style={{
                            width: "300px",
                            padding: "30px 20px",
                            backgroundColor: "var(--card-bg)",
                            transition: 'all 0.4s ease',
                            textAlign: "center",
                            position: "relative"
                        }}
                            key={item._id}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    const isWaitlisted = waitlist.some(w => w._id === item._id);
                                    isWaitlisted ? removeFromWaitlist(item._id) : addToWaitlist(item);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    zIndex: 10,
                                    color: waitlist.some(w => w._id === item._id) ? 'var(--secondary)' : 'var(--text-light)',
                                    transition: 'transform 0.2s ease',
                                    padding: '5px'
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                title={waitlist.some(w => w._id === item._id) ? "Remove from Waitlist" : "Add to Waitlist"}
                            >
                                {waitlist.some(w => w._id === item._id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                            </button>
                            <div onClick={() => navigate(`/product/${item._id}`)} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ height: "260px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "30px", padding: '10px' }}>
                                    <img
                                        src={item.image.startsWith('http') ? item.image : `http://localhost:5000/uploads/${item.image}`}
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "brightness(0.95)" }}
                                        alt={item.name}
                                    />
                                </div>
                                <h3 style={{ margin: "0 0 10px 0", fontSize: "20px", color: "var(--primary)", fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                    <p style={{ fontWeight: "600", fontSize: "15px", color: "var(--text-light)", letterSpacing: '1px' }}>₹{item.price.toLocaleString('en-IN')}</p>
                                    {item.stockQuantity !== undefined && (
                                        <span style={{
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            padding: '2px 6px',
                                            borderRadius: '3px',
                                            backgroundColor: item.stockQuantity > 0 ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                                            color: item.stockQuantity > 0 ? '#2e7d32' : '#d32f2f',
                                            border: `1px solid ${item.stockQuantity > 0 ? '#2e7d32' : '#d32f2f'}`
                                        }}>
                                            {item.stockQuantity > 0 ? `${item.stockQuantity} left` : 'Out of Stock'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div style={{ marginTop: '25px' }}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(item, 1);
                                        showNotification(`${item.name} added to your selection!`);
                                    }}
                                    disabled={item.stockQuantity !== undefined && item.stockQuantity <= 0}
                                    className="btn-secondary"
                                    style={{
                                        width: '100%',
                                        opacity: (item.stockQuantity !== undefined && item.stockQuantity <= 0) ? 0.5 : 1,
                                        cursor: (item.stockQuantity !== undefined && item.stockQuantity <= 0) ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {(item.stockQuantity !== undefined && item.stockQuantity <= 0) ? 'Out of Stock' : 'Add to Selection'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
