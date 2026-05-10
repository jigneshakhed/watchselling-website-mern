import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WaitlistContext } from '../context/WaitlistContext';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { NotificationContext } from '../context/NotificationContext';

const Waitlist = () => {
    const { waitlist, removeFromWaitlist, clearWaitlist } = useContext(WaitlistContext);
    const { addToCart } = useContext(CartContext);
    const { showNotification } = useContext(NotificationContext);

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        removeFromWaitlist(product._id);
        showNotification(`${product.name} added to cart from Waitlist!`);
    };

    return (
        <div style={{ padding: "100px 20px", minHeight: 'calc(100vh - 90px)', backgroundColor: 'var(--bg-light)' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '15px', textAlign: 'center' }}>
                    Your Collection
                </h2>
                <h1 style={{ fontWeight: "500", fontSize: '48px', color: "var(--primary)", fontFamily: "'Playfair Display', serif", textAlign: 'center', marginBottom: '60px' }}>
                    Waitlist
                </h1>

                {waitlist.length === 0 ? (
                    <div style={{ textAlign: 'center', margin: '40px 0' }}>
                        <p style={{ color: 'var(--text-light)', fontSize: '18px', marginBottom: '20px' }}>Your waitlist is currently empty.</p>
                        <Link to="/shop" style={{
                            color: "var(--primary)",
                            fontSize: "14px",
                            textDecoration: "none",
                            letterSpacing: '2px',
                            borderBottom: '1px solid var(--primary)',
                            paddingBottom: '5px',
                            textTransform: 'uppercase',
                            fontWeight: '600'
                        }}>DISCOVER TIMEPIECES</Link>
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {waitlist.map(item => (
                                <div key={item._id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '20px',
                                    backgroundColor: 'var(--card-bg)',
                                    border: '1px solid var(--border-color)',
                                    flexWrap: 'wrap',
                                    gap: '20px'
                                }}>
                                    <div style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={item.image.startsWith('http') ? item.image : `http://localhost:5000/uploads/${item.image}`} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <Link to={`/product/${item._id}`} style={{ textDecoration: 'none' }}>
                                            <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
                                        </Link>
                                        <p style={{ margin: 0, fontWeight: '600', fontSize: '16px', color: 'var(--text-main)' }}>₹{item.price.toLocaleString('en-IN')}</p>
                                        {item.stockQuantity !== undefined && (
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                padding: '2px 6px',
                                                borderRadius: '3px',
                                                backgroundColor: item.stockQuantity > 0 ? 'rgba(46, 125, 50, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                                                color: item.stockQuantity > 0 ? '#2e7d32' : '#d32f2f',
                                                border: `1px solid ${item.stockQuantity > 0 ? '#2e7d32' : '#d32f2f'}`,
                                                display: 'inline-block',
                                                marginTop: '8px'
                                            }}>
                                                {item.stockQuantity > 0 ? `${item.stockQuantity} left` : 'Out of Stock'}
                                            </span>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginLeft: 'auto' }}>
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            disabled={item.stockQuantity !== undefined && item.stockQuantity <= 0}
                                            className="btn"
                                            style={{
                                                padding: '10px 20px',
                                                fontSize: '12px',
                                                opacity: (item.stockQuantity !== undefined && item.stockQuantity <= 0) ? 0.5 : 1,
                                                cursor: (item.stockQuantity !== undefined && item.stockQuantity <= 0) ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            MOVE TO CART
                                        </button>
                                        <button
                                            onClick={() => removeFromWaitlist(item._id)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: 'var(--text-light)',
                                                fontSize: '14px',
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '40px', textAlign: 'right' }}>
                            <button
                                onClick={clearWaitlist}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#d32f2f',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    textDecoration: 'underline'
                                }}
                            >
                                Clear Waitlist
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Waitlist;
