import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogData } from '../blogData';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';

const Article = () => {
    const { id } = useParams();
    const article = blogData.find(a => a.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!article) {
        return (
            <div style={{ padding: '100px 20px', textAlign: 'center', minHeight: '80vh' }}>
                <h1 style={{ color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>Article Not Found</h1>
                <Link to="/blog" style={{ color: 'var(--secondary)', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>Back to World of Rolex</Link>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
            {/* Header / Hero */}
            <div style={{ position: 'relative', height: '60vh', width: '100%', overflow: 'hidden' }}>
                <img 
                    src={article.image} 
                    alt={article.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 20px',
                    textAlign: 'center'
                }}>
                    <span style={{ color: 'var(--secondary)', fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '15px' }}>
                        {article.subtitle}
                    </span>
                    <h1 style={{ 
                        color: '#FFFFFF', 
                        fontSize: 'clamp(32px, 5vw, 64px)', 
                        fontFamily: "'Playfair Display', serif", 
                        maxWidth: '900px', 
                        lineHeight: '1.1',
                        marginBottom: '20px'
                    }}>
                        {article.title}
                    </h1>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
                    <Link to="/blog" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <FaArrowLeft /> Back to Editorial
                    </Link>
                    <div style={{ color: 'var(--text-light)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaCalendarAlt color="var(--secondary)" /> {article.date}
                    </div>
                </div>

                <div 
                    className="article-content"
                    style={{ 
                        color: 'var(--text-main)', 
                        fontSize: '18px', 
                        lineHeight: '1.8', 
                        fontFamily: "'Inter', sans-serif"
                    }}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <style>
                    {`
                        .article-content h2 {
                            font-size: 32px;
                            color: var(--primary);
                            margin: 60px 0 30px 0;
                            font-family: 'Playfair Display', serif;
                        }
                        .article-content p {
                            margin-bottom: 25px;
                        }
                        .article-content blockquote {
                            border-left: 4px solid var(--secondary);
                            padding-left: 30px;
                            margin: 50px 0;
                            font-family: 'Playfair Display', serif;
                            font-size: 24px;
                            font-style: italic;
                            color: var(--primary);
                            line-height: 1.5;
                        }
                    `}
                </style>

                <div style={{ marginTop: '100px', padding: '60px', backgroundColor: 'var(--bg-light)', textAlign: 'center' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', marginBottom: '20px' }}>Join the World of Rolex</h3>
                    <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>Receive the latest editorial stories and product launches directly in your inbox.</p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <input 
                            placeholder="Your email address" 
                            style={{ 
                                padding: '15px 25px', 
                                border: '1px solid var(--border-color)', 
                                minWidth: '300px',
                                outline: 'none'
                            }} 
                        />
                        <button className="btn">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;
