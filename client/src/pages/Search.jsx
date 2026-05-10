import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WaitlistContext } from '../context/WaitlistContext';
import { BASE_URL } from '../apiConfig';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { NotificationContext } from '../context/NotificationContext';

const Search = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const { waitlist, addToWaitlist, removeFromWaitlist } = useContext(WaitlistContext);
    const { showNotification } = useContext(NotificationContext);
    const location = useLocation();

    // Parse the query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                // Fetch all products, as existing backend might not natively support a text search endpoint
                const res = await axios.get(`${BASE_URL}products`);
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products", err);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts([]);
        } else {
            // Filter products client-side based on the search query (name or description)
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = products.filter(item =>
                item.name.toLowerCase().includes(lowerQuery) ||
                (item.description && item.description.toLowerCase().includes(lowerQuery))
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    return (
        <div style={{ padding: "100px 20px", minHeight: 'calc(100vh - 90px)', backgroundColor: 'var(--bg-light)' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <h2 style={{ fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '15px' }}>Search Results</h2>
                    <h1 style={{ fontWeight: "500", fontSize: '48px', color: "var(--primary)", fontFamily: "'Playfair Display', serif" }}>
                        {searchQuery ? `Results for "${searchQuery}"` : "Discover"}
                    </h1>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-light)', letterSpacing: '2px', textTransform: 'uppercase' }}>Searching Collection...</p>
                ) : (
                    <>
                        {searchQuery && filteredProducts.length === 0 ? (
                            <div style={{ textAlign: 'center', margin: '60px 0', color: 'var(--text-light)' }}>
                                <p style={{ fontSize: '18px', marginBottom: '20px' }}>No timepieces found matching your search.</p>
                                <Link to="/shop" style={{ color: 'var(--primary)', textDecoration: 'none', borderBottom: '1px solid var(--primary)', paddingBottom: '2px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px' }}>Explore the Collection</Link>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: '40px' }}>
                                {filteredProducts.map((item) => (
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
                                        <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                            <div style={{ height: "260px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "30px", padding: '10px' }}>
                                                <img
                                                    src={item.image.startsWith('http') ? item.image : `https://watchselling-website-mern.onrender.com/uploads/${item.image}`}
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
                                        </Link>

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
                        )}
                    </>
                )}
            </div>
        </div >
    );
};

export default Search;
