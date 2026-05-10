import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`${BASE_URL}reviews`);
                setReviews(res.data);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };
        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}reviews`, formData);
            setReviews([res.data, ...reviews]);
            setFormData({ name: '', rating: 5, comment: '' });
            showNotification("Thank you for your feedback.");
        } catch (err) {
            console.error("Error submitting review:", err);
        }
    };

    const renderStars = (rating) => {
        return (
            <div style={{ display: 'flex', gap: '3px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} style={{ color: star <= rating ? 'var(--secondary)' : 'var(--border-color)', fontSize: '18px' }}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    const inputStyle = {
        width: '100%',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        color: 'var(--text-main)',
        fontSize: '15px',
        fontFamily: "'Inter', sans-serif",
        outline: 'none',
        transition: 'border-color 0.3s ease'
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '100vh', paddingBottom: '100px' }}>

            {/* Header */}
            <div style={{ textAlign: "center", padding: "100px 20px 60px 20px", backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '15px', fontWeight: 'bold' }}>Client Testimonials</h2>
                <h1 style={{ fontWeight: "400", fontSize: '56px', color: "var(--primary)", fontFamily: "'Playfair Display', serif" }}>
                    Voices of Excellence
                </h1>
                <p style={{ marginTop: '20px', fontSize: '16px', color: 'var(--text-light)', maxWidth: '600px', margin: '20px auto 0', lineHeight: '1.8' }}>
                    Discover what collectors and enthusiasts have to say about our mastercrafted timepieces and unrivaled service.
                </p>
            </div>

            <div style={{ maxWidth: '1400px', margin: '60px auto 0', padding: '0 20px', display: 'flex', flexWrap: 'wrap', gap: '50px' }}>

                {/* Form Sidebar */}
                <div style={{ flex: '1 1 350px' }}>
                    <div style={{ position: 'sticky', top: '100px', padding: '40px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ fontSize: '24px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '30px' }}>Share Your Experience</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '8px', fontWeight: 'bold' }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                />
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '8px', fontWeight: 'bold' }}>Rating</label>
                                <select
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                                    required
                                >
                                    <option value="5">5 Stars - Exceptional</option>
                                    <option value="4">4 Stars - Excellent</option>
                                    <option value="3">3 Stars - Good</option>
                                    <option value="2">2 Stars - Fair</option>
                                    <option value="1">1 Star - Poor</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label style={{ display: 'block', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '8px', fontWeight: 'bold' }}>Comment</label>
                                <textarea
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    required
                                    rows="5"
                                    style={{ ...inputStyle, resize: 'none' }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--secondary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn" style={{ width: '100%', padding: '16px 0' }}>Submit Review</button>
                        </form>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div style={{ flex: '2 1 700px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                        {reviews.length === 0 ? (
                            <p style={{ color: 'var(--text-light)', fontStyle: 'italic', padding: '20px' }}>No reviews yet. Be the first to share your experience!</p>
                        ) : (
                            reviews.map((review) => (
                                <div key={review._id} style={{
                                    backgroundColor: '#FFFFFF',
                                    padding: '40px',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        {renderStars(review.rating)}
                                        <p style={{ color: 'var(--text-main)', fontSize: '16px', lineHeight: '1.8', margin: '20px 0', fontStyle: 'italic' }}>
                                            "{review.comment}"
                                        </p>
                                    </div>
                                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: 'var(--primary)' }}>{review.name}</span>
                                        <span style={{ fontSize: '12px', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Verified Buyer</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Reviews;
