import React from 'react';
import { useNavigate } from 'react-router-dom';
import { blogData } from '../blogData';

const Blog = () => {
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh" }}>

            {/* Light Hero Section */}
            <div style={{ textAlign: "center", padding: "120px 20px 80px 20px", backgroundColor: 'var(--bg-light)', borderBottom: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '20px', fontWeight: 'bold' }}>Editorial Hub</h2>
                <h1 style={{ fontWeight: "400", fontSize: '64px', color: "var(--primary)", fontFamily: "'Playfair Display', serif", marginBottom: '20px' }}>
                    The World of Rolex
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', fontFamily: "'Inter', sans-serif" }}>
                    Essays on precision, style, and the enduring legacy of mechanical excellence.
                </p>
            </div>

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 20px 100px 20px" }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>

                    {blogData.map((article, index) => (
                        <div key={article.id} style={{
                            display: 'flex',
                            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                            alignItems: 'center',
                            gap: '50px',
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            padding: '40px',
                            border: '1px solid var(--border-color)'
                        }}>

                            <div style={{ flex: '1 1 500px', overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/blog/${article.id}`)}>
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease',
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>

                            <div style={{ flex: '1 1 500px', padding: '20px' }}>
                                <span style={{ color: 'var(--secondary)', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                    {article.subtitle}
                                </span>
                                <h3 
                                    style={{ fontSize: '36px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", margin: '15px 0 20px 0', lineHeight: '1.2', cursor: 'pointer' }}
                                    onClick={() => navigate(`/blog/${article.id}`)}
                                >
                                    {article.title}
                                </h3>
                                <p style={{ color: 'var(--text-light)', fontSize: '16px', lineHeight: '1.8', marginBottom: '30px' }}>
                                    {article.description}
                                </p>
                                <button className="btn-secondary" onClick={() => navigate(`/blog/${article.id}`)}>
                                    Read Article
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default Blog;
