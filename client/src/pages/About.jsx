import React from 'react';

const About = () => {
    return (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', overflow: 'hidden' }}>

            {/* Hero Section */}
            <div style={{
                height: '70vh',
                minHeight: '500px',
                position: 'relative',
                backgroundImage: 'url("https://watchselling-website-mern.onrender.com/uploads/9.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', // Parallax effect
            }}>
                {/* White gradient overlay for light theme */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%)',
                    zIndex: 1
                }}></div>

                <div style={{
                    position: 'absolute',
                    zIndex: 2,
                    top: '50%',
                    left: '10%',
                    transform: 'translateY(-50%)',
                    maxWidth: '600px',
                    padding: '0 20px'
                }}>
                    <h2 style={{ fontSize: '14px', letterSpacing: '6px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '20px', fontWeight: 'bold' }}>The Legacy</h2>
                    <h1 style={{ fontWeight: "400", fontSize: 'clamp(40px, 5vw, 72px)', fontFamily: "'Playfair Display', serif", color: 'var(--primary)', lineHeight: '1.2' }}>
                        Our Heritage
                    </h1>
                    <p style={{ marginTop: '30px', fontSize: '18px', color: 'var(--text-main)', lineHeight: '1.8', fontFamily: "'Inter', sans-serif" }}>
                        Driven by a passion for perfection, Take Easy has spent decades refining the art of watchmaking. We specialize in faithfully reproducing the most iconic timepieces in history with exact precision.
                    </p>
                </div>
            </div>

            {/* Story Section */}
            <div style={{ maxWidth: '1200px', margin: '100px auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '150px' }}>

                    {/* Block 1 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
                        <div style={{ flex: '1 1 400px', paddingRight: '40px' }}>
                            <h2 style={{ color: 'var(--secondary)', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold' }}>Unrivaled Precision</h2>
                            <h3 style={{ fontSize: '42px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '30px', lineHeight: '1.2' }}>
                                A Commitment to<br />Excellence
                            </h3>
                            <p style={{ fontSize: '16px', color: 'var(--text-light)', lineHeight: '1.9', marginBottom: '20px' }}>
                                Each watch we create is a testament to the pursuit of flawless chronometry. By employing the same meticulous techniques as the Swiss masters, our timepieces offer virtually indistinguishable performance and weight.
                            </p>
                            <p style={{ fontSize: '16px', color: 'var(--text-light)', lineHeight: '1.9' }}>
                                We source the highest grade 904L stainless steel, scratch-resistant sapphire crystals, and precise automatic movements to ensure a legacy that lasts generations.
                            </p>
                        </div>
                        <div style={{ flex: '1 1 500px' }}>
                            <img src="https://watchselling-website-mern.onrender.com/uploads/8.jpg" alt="Watchmaking process" style={{ width: '100%', objectFit: 'cover', height: '600px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }} />
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '60px', alignItems: 'center' }}>
                        <div style={{ flex: '1 1 500px' }}>
                            <img src="https://watchselling-website-mern.onrender.com/uploads/13.jpg" alt="Master Watchmaker" style={{ width: '100%', objectFit: 'cover', height: '600px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }} />
                        </div>
                        <div style={{ flex: '1 1 400px', paddingLeft: '40px' }}>
                            <h2 style={{ color: 'var(--secondary)', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold' }}>The Artisans</h2>
                            <h3 style={{ fontSize: '42px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '30px', lineHeight: '1.2' }}>
                                Hands That Tell<br />Time
                            </h3>
                            <p style={{ fontSize: '16px', color: 'var(--text-light)', lineHeight: '1.9', marginBottom: '20px' }}>
                                Behind every flawless bezel and sweeping second hand lies the invisible touch of our master artisans. With decades of combined experience, they assemble and regulate each movement by hand.
                            </p>
                            <p style={{ fontSize: '16px', color: 'var(--text-light)', lineHeight: '1.9' }}>
                                It is this human element, combined with cutting-edge micro-engineering, that elevates our creations from mere reproductions to genuine works of art.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Banner Statement */}
            <div style={{ backgroundColor: 'var(--bg-light)', padding: '120px 20px', textAlign: 'center', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ fontSize: '28px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', lineHeight: '1.6', marginBottom: '40px' }}>
                        "We don't just replicate watches. We replicate the feeling of wearing perfection upon your wrist."
                    </p>
                    <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--secondary)', margin: '0 auto 20px auto' }}></div>
                    <span style={{ fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 'bold' }}>
                        - The Executive Board
                    </span>
                </div>
            </div>

        </div>
    );
};

export default About;
