import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import BrandBanner from './BrandBanner';

const Footer = () => {
    return (
        <footer>
            <BrandBanner />
            <div style={{ display: "flex", backgroundColor: "var(--bg-dark)", padding: "80px 10%", color: "#FFFFFF", flexWrap: "wrap", borderTop: "4px solid var(--primary)" }}>
                {/* Left Area - Brand name and description */}
                <div style={{ flex: '1 1 300px', display: "flex", flexDirection: "column", padding: "20px" }}>
                    <h1 style={{ fontWeight: "bold", fontSize: "28px", color: "var(--secondary)", marginBottom: "20px", fontFamily: "'Playfair Display', serif" }}>
                        <span style={{ marginRight: '10px' }}>♕</span> Take Easy - Luxury- watches
                    </h1>
                    <p style={{ margin: "20px 0px", color: "var(--text-light)", lineHeight: '1.8', fontSize: '14px' }}>
                        Experience the timeless elegance and precision engineering. Discover our curated collection of luxury timepieces crafted for the extraordinary.
                    </p>
                    {/* Social Media Icons */}
                    <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                        <div style={{ width: "35px", height: "35px", borderRadius: "50%", color: "var(--bg-dark)", backgroundColor: "var(--text-light)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }} onMouseOver={e => e.currentTarget.style.backgroundColor = "white"} onMouseOut={e => e.currentTarget.style.backgroundColor = "var(--text-light)"}>
                            <FaFacebook size={16} />
                        </div>
                        <div style={{ width: "35px", height: "35px", borderRadius: "50%", color: "var(--bg-dark)", backgroundColor: "var(--text-light)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }} onMouseOver={e => e.currentTarget.style.backgroundColor = "white"} onMouseOut={e => e.currentTarget.style.backgroundColor = "var(--text-light)"}>
                            <FaInstagram size={16} />
                        </div>
                        <div style={{ width: "35px", height: "35px", borderRadius: "50%", color: "var(--bg-dark)", backgroundColor: "var(--text-light)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }} onMouseOver={e => e.currentTarget.style.backgroundColor = "white"} onMouseOut={e => e.currentTarget.style.backgroundColor = "var(--text-light)"}>
                            <FaTwitter size={16} />
                        </div>
                    </div>
                </div>

                {/* Center Area - Useful Links */}
                <div style={{ flex: '1 1 200px', padding: "20px" }}>
                    <h3 style={{ marginBottom: "30px", color: "#FFFFFF", fontSize: "16px", textTransform: "uppercase", letterSpacing: "2px" }}>The Collection</h3>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "15px" }}>
                        <li><Link to="/shop" style={{ textDecoration: "none", color: "var(--text-light)", fontSize: "14px", transition: "color 0.3s" }} onMouseOver={e => e.currentTarget.style.color = "white"} onMouseOut={e => e.currentTarget.style.color = "var(--text-light)"}>View All Watches</Link></li>
                        <li><Link to="/about" style={{ textDecoration: "none", color: "var(--text-light)", fontSize: "14px", transition: "color 0.3s" }} onMouseOver={e => e.currentTarget.style.color = "white"} onMouseOut={e => e.currentTarget.style.color = "var(--text-light)"}>Our Heritage</Link></li>
                        <li><Link to="/care-and-service" style={{ textDecoration: "none", color: "var(--text-light)", fontSize: "14px", transition: "color 0.3s" }} onMouseOver={e => e.currentTarget.style.color = "white"} onMouseOut={e => e.currentTarget.style.color = "var(--text-light)"}>Care & Service</Link></li>
                        <li><Link to="/services" style={{ textDecoration: "none", color: "var(--text-light)", fontSize: "14px", transition: "color 0.3s" }} onMouseOver={e => e.currentTarget.style.color = "white"} onMouseOut={e => e.currentTarget.style.color = "var(--text-light)"}>Our Services</Link></li>
                        <li><Link to="/faq" style={{ textDecoration: "none", color: "var(--text-light)", fontSize: "14px", transition: "color 0.3s" }} onMouseOver={e => e.currentTarget.style.color = "white"} onMouseOut={e => e.currentTarget.style.color = "var(--text-light)"}>Frequently Asked Questions</Link></li>
                    </ul>
                </div>

                {/* Right Area - Contact */}
                <div style={{ flex: '1 1 300px', padding: "20px" }}>
                    <h3 style={{ marginBottom: "30px", color: "#FFFFFF", fontSize: "16px", textTransform: "uppercase", letterSpacing: "2px" }}>Official Channels</h3>
                    <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", color: "var(--text-light)", fontSize: "14px" }}>
                        <FaMapMarkerAlt style={{ marginRight: "12px", color: "var(--secondary)" }} /> 16 rajvadi road,moti palace office, ahemdabad, gujarat
                    </div>
                    <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", color: "var(--text-light)", fontSize: "14px" }}>
                        <FaPhone style={{ marginRight: "12px", color: "var(--secondary)" }} /> +91 6355211722
                    </div>
                    <div style={{ marginBottom: "25px", display: "flex", alignItems: "center", color: "var(--text-light)", fontSize: "14px" }}>
                        <FaEnvelope style={{ marginRight: "12px", color: "var(--secondary)" }} /> TackEasy@watch.com
                    </div>
                    <img src="http://localhost:5000/uploads/payment.png" alt="payment" style={{ width: "150px", opacity: 0.8 }} />
                </div>
            </div>
        </footer>
    );
};
export default Footer;
