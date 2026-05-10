import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh" }}>

            {/* Header */}
            <div style={{ textAlign: "center", padding: "120px 20px 60px 20px", backgroundColor: 'var(--bg-light)' }}>
                <h2 style={{ fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '15px', fontWeight: 'bold' }}>Uncompromising Care</h2>
                <h1 style={{ fontWeight: "400", fontSize: '56px', color: "var(--primary)", fontFamily: "'Playfair Display', serif" }}>
                    Our Services
                </h1>
                <p style={{ marginTop: '20px', fontSize: '18px', color: 'var(--text-light)', maxWidth: '600px', margin: '20px auto 0', lineHeight: '1.8', fontFamily: "'Inter', sans-serif" }}>
                    Preserve the precision and brilliance of your timepiece with our certified master watchmakers and unparalleled dedication to excellence.
                </p>
            </div>

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 20px 100px 20px" }}>

                {/* Service 1 */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "60px", marginBottom: '100px' }}>
                    <div style={{ flex: "1 1 500px" }}>
                        <img
                            src="http://localhost:5000/uploads/23.jpg"
                            alt="Watch Servicing"
                            style={{ width: "100%", height: "auto", objectFit: "cover", boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                        />
                    </div>
                    <div style={{ flex: "1 1 500px", color: "var(--text-main)", padding: '20px' }}>
                        <h4 style={{ color: 'var(--secondary)', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold' }}>01. Complete Restoration</h4>
                        <h3 style={{ fontSize: '38px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '25px', lineHeight: '1.3' }}>The Art of Precision Servicing</h3>
                        <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "20px", color: 'var(--text-light)' }}>
                            Every watch entrusted to us undergoes a meticulous disassembly process. Our experts clean and examine each individual component, replacing any worn parts with genuine components to ensure enduring performance.
                        </p>
                        <p style={{ fontSize: "16px", lineHeight: "1.8", color: 'var(--text-light)' }}>
                            The movement is then painstakingly reassembled and re-lubricated to guarantee the impeccable chronometric precision that defines our brand.
                        </p>
                    </div>
                </div>

                {/* Service 2 */}
                <div style={{ display: "flex", flexWrap: "wrap-reverse", alignItems: "center", gap: "60px", marginBottom: '100px' }}>
                    <div style={{ flex: "1 1 500px", color: "var(--text-main)", padding: '20px' }}>
                        <h4 style={{ color: 'var(--secondary)', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold' }}>02. Exterior Refinishing</h4>
                        <h3 style={{ fontSize: '38px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '25px', lineHeight: '1.3' }}>Restoring the Luster</h3>
                        <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "20px", color: 'var(--text-light)' }}>
                            Beyond internal mechanics, the exterior of your watch receives equal attention. We offer expert polishing and satin-finishing services to remove superficial scratches from the case and bracelet.
                        </p>
                        <p style={{ fontSize: "16px", lineHeight: "1.8", color: 'var(--text-light)' }}>
                            This delicate process restores the original grandeur of the metal without compromising the structural integrity of your timepiece.
                        </p>
                    </div>
                    <div style={{ flex: "1 1 500px" }}>
                        <img
                            src="http://localhost:5000/uploads/1.jpg"
                            alt="Watch Polishing"
                            style={{ width: "100%", height: "auto", objectFit: "cover", boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                        />
                    </div>
                </div>

                {/* Service 3 */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "60px" }}>
                    <div style={{ flex: "1 1 500px" }}>
                        <img
                            src="http://localhost:5000/uploads/24.jpg"
                            alt="Water Resistance Test"
                            style={{ width: "100%", height: "auto", objectFit: "cover", boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                        />
                    </div>
                    <div style={{ flex: "1 1 500px", color: "var(--text-main)", padding: '20px' }}>
                        <h4 style={{ color: 'var(--secondary)', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px', fontWeight: 'bold' }}>03. Quality Control</h4>
                        <h3 style={{ fontSize: '38px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '25px', lineHeight: '1.3' }}>Rigorous Final Testing</h3>
                        <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "20px", color: 'var(--text-light)' }}>
                            Following reassembly, your watch undergoes a series of stringent technical tests. This includes verifying water resistance through pressure testing and assessing power reserve over several days.
                        </p>
                        <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "30px", color: 'var(--text-light)' }}>
                            Only after passing our uncompromising quality control standards is the timepiece returned to you, backed by a service guarantee.
                        </p>
                        <Link to="/contact">
                            <button className="btn">Book a Service</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Services;
