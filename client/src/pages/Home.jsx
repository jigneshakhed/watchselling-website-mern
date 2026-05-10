import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { WaitlistContext } from '../context/WaitlistContext';
import { BASE_URL } from '../apiConfig';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { NotificationContext } from '../context/NotificationContext';
import Contact from './Contact';
import Blog from './Blog';
import About from './About';
import Reviews from './Reviews';
import Services from './Services';

const Home = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const { waitlist, addToWaitlist, removeFromWaitlist } = useContext(WaitlistContext);
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${BASE_URL}products?limit=8`);
                setProducts(res.data.slice(0, 8));
            } catch (err) { }
        };
        getProducts();
    }, []);

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <div style={{
                height: 'calc(100vh - 90px)', // adjust for navbar
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                textAlign: 'center'
            }}>
                <video autoPlay loop muted playsInline style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    filter: 'brightness(0.6)'
                }}>
                    <source src="https://watchselling-website-mern.onrender.com/uploads/2.mp4" type="video/mp4" />
                </video>

                {/* Overlay Text */}
                <div style={{ zIndex: 1, padding: '0 20px', maxWidth: '800px' }}>
                    <h2 style={{
                        color: 'var(--secondary)',
                        fontSize: '14px',
                        letterSpacing: '4px',
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        fontWeight: '600'
                    }}>
                        The Collection
                    </h2>
                    <h1 style={{
                        fontSize: 'clamp(40px, 6vw, 72px)',
                        color: '#FFFFFF',
                        lineHeight: '1.2',
                        fontFamily: "'Playfair Display', serif",
                        marginBottom: '30px',
                        fontWeight: '500'
                    }}>
                        UNCOMPROMISING<br />EXCELLENCE
                    </h1>
                    <p style={{
                        color: '#FFFFFF',
                        fontSize: '18px',
                        lineHeight: '1.6',
                        margin: '0 auto 40px auto',
                        maxWidth: '600px',
                        opacity: '0.9',
                        fontFamily: "'Inter', sans-serif"
                    }}>
                        Discover the precision, luxury, and heritage of our mastercrafted timepieces. Built for those who lead the way.
                    </p>
                    <Link to="/shop">
                        <button className="btn" style={{
                            padding: '16px 40px',
                            fontSize: '14px',
                            letterSpacing: '2px',
                            backgroundColor: 'transparent',
                            border: '1px solid #FFFFFF',
                            color: '#FFFFFF',
                            transition: 'all 0.3s'
                        }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#FFFFFF';
                                e.target.style.color = 'var(--primary)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = '#FFFFFF';
                            }}
                        >
                            DISCOVER MORE
                        </button>
                    </Link>
                </div>
            </div>

            {/* Popular Products */}
            <div style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: 'var(--bg-light)' }}>
                <h2 style={{
                    fontSize: '14px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'var(--secondary)',
                    marginBottom: '15px'
                }}>
                    Featured Models
                </h2>
                <h3 style={{
                    fontSize: '36px',
                    marginBottom: '60px',
                    color: 'var(--primary)',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: '500'
                }}>
                    A Watch for Every Wrist
                </h3>

                <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: '40px' }}>
                    {products.map((item) => (
                        <div key={item._id} style={{
                            width: "300px",
                            padding: "30px 20px",
                            backgroundColor: "var(--card-bg)",
                            transition: "all 0.4s ease",
                            textAlign: "center",
                            position: "relative"
                        }}
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
                            <div onClick={() => navigate(`/product/${item._id}`)} style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: "260px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "30px" }}>
                                    <img src={item.image.startsWith('http') ? item.image : `https://watchselling-website-mern.onrender.com/uploads/${item.image}`}
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "brightness(0.95)" }}
                                        alt={item.name} />
                                </div>
                                <h4 style={{ margin: "0 0 10px 0", fontSize: "20px", color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>{item.name}</h4>
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

                <Link to="/shop" style={{
                    color: "var(--primary)",
                    fontSize: "14px",
                    marginTop: "60px",
                    display: "inline-block",
                    textDecoration: "none",
                    letterSpacing: '2px',
                    borderBottom: '1px solid var(--primary)',
                    paddingBottom: '5px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    transition: 'all 0.3s'
                }}
                    onMouseOver={e => e.currentTarget.style.color = "var(--secondary)"}
                    onMouseOut={e => e.currentTarget.style.color = "var(--primary)"}
                >VIEW ALL WATCHES</Link>
            </div>

            <About />
            <Blog />
            <Services />
            <Contact />
            <Reviews />
        </div >
    );
};

export default Home;
