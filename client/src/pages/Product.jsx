import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { WaitlistContext } from '../context/WaitlistContext';
import { BASE_URL } from '../apiConfig';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { NotificationContext } from '../context/NotificationContext';

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);
    const { waitlist, addToWaitlist, removeFromWaitlist } = useContext(WaitlistContext);
    const { showNotification } = useContext(NotificationContext);

    const isWaitlisted = waitlist.some(item => item._id === product._id);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`${BASE_URL}products/find/` + id);
                setProduct(res.data);
            } catch { }
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            const stockLimit = product.stockQuantity ?? 10;
            if (quantity < stockLimit) {
                setQuantity(quantity + 1);
            } else {
                showNotification(`Cannot add more than ${stockLimit} items. Maximum stock reached.`, 'error');
            }
        }
    };

    const handleClick = () => {
        addToCart(product, quantity);
        showNotification(`${product.name} added to your selection!`);
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap", minHeight: 'calc(100vh - 90px)', backgroundColor: 'var(--bg-color)' }}>
            {/* Left Side: Product Image Showcase */}
            <div style={{
                flex: "1 1 50%",
                minWidth: "300px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'var(--bg-light)',
                padding: '60px'
            }}>
                <img
                    src={product.image && (product.image.startsWith('http') ? product.image : `http://localhost:5000/uploads/${product.image}`)}
                    style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain", filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.1))" }}
                    alt={product.name}
                />
            </div>

            {/* Right Side: Product Details */}
            <div style={{
                flex: "1 1 50%",
                minWidth: "300px",
                padding: "80px 10%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <p style={{
                    color: "var(--secondary)",
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '15px'
                }}>
                    {product.category || 'Timepiece'}
                </p>
                <h1 style={{
                    fontWeight: "500",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '48px',
                    color: 'var(--primary)',
                    lineHeight: '1.1',
                    marginBottom: '25px'
                }}>
                    {product.name}
                </h1>

                <div style={{ height: '1px', width: '100px', backgroundColor: 'var(--secondary)', marginBottom: '30px' }}></div>

                <p style={{
                    lineHeight: '1.8',
                    color: 'var(--text-light)',
                    fontSize: '16px',
                    marginBottom: '40px',
                    fontFamily: "'Inter', sans-serif"
                }}>
                    {product.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                    <span style={{
                        fontWeight: "500",
                        fontSize: "32px",
                        color: "var(--text-main)"
                    }}>
                        ₹{product.price ? product.price.toLocaleString('en-IN') : ''}
                    </span>

                    {product.stockQuantity !== undefined && (
                        <span style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            backgroundColor: product.stockQuantity > 0 ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                            color: product.stockQuantity > 0 ? '#2e7d32' : '#d32f2f',
                            border: `1px solid ${product.stockQuantity > 0 ? '#2e7d32' : '#d32f2f'}`
                        }}>
                            {product.stockQuantity > 0 ? `Stock: ${product.stockQuantity} left` : 'Out of Stock'}
                        </span>
                    )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "30px", flexWrap: "wrap", marginTop: 'auto' }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", padding: "5px" }}>
                        <button onClick={() => handleQuantity("dec")} style={{ border: 'none', background: 'transparent', cursor: "pointer", fontSize: "20px", padding: "10px 15px", color: "var(--text-light)" }}>-</button>
                        <span style={{ width: "40px", textAlign: "center", fontSize: '16px', fontWeight: '500' }}>{quantity}</span>
                        <button onClick={() => handleQuantity("inc")} style={{ border: 'none', background: 'transparent', cursor: "pointer", fontSize: "20px", padding: "10px 15px", color: "var(--text-light)" }}>+</button>
                    </div>
                    <button className="btn"
                        onClick={handleClick}
                        disabled={product.stockQuantity !== undefined && product.stockQuantity <= 0}
                        style={{
                            padding: "18px 50px",
                            flex: 1,
                            whiteSpace: 'nowrap',
                            minWidth: '200px',
                            opacity: (product.stockQuantity !== undefined && product.stockQuantity <= 0) ? 0.5 : 1,
                            cursor: (product.stockQuantity !== undefined && product.stockQuantity <= 0) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {(product.stockQuantity !== undefined && product.stockQuantity <= 0) ? 'Out of Stock' : 'Configure & Purchase'}
                    </button>

                    <button
                        onClick={() => isWaitlisted ? removeFromWaitlist(product._id) : addToWaitlist(product)}
                        style={{
                            background: isWaitlisted ? 'var(--secondary)' : 'transparent',
                            border: '1px solid var(--secondary)',
                            color: isWaitlisted ? 'white' : 'var(--secondary)',
                            width: '60px',
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        title={isWaitlisted ? "Remove from Waitlist" : "Add to Waitlist"}
                    >
                        {isWaitlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                    </button>
                </div>

                <div style={{ marginTop: '50px', fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.6' }}>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ color: 'var(--secondary)' }}>✓</span> Complimentary Shipping & Returns
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--secondary)' }}>✓</span> 5-Year International Guarantee
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Product;
