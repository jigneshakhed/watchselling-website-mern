import React from 'react';
import { Link } from 'react-router-dom';

const CareAndService = () => {
    return (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: 'var(--text-main)', paddingBottom: '100px' }}>

            {/* Header Content */}
            <div style={{ textAlign: "center", padding: "100px 20px -20px 20px", backgroundColor: 'var(--bg-light)' }}>
                <h2 style={{ fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '15px', fontWeight: 'bold' }}>Maintenance Guide</h2>
                <h1 style={{ fontWeight: "400", fontSize: '56px', color: "var(--primary)", fontFamily: "'Playfair Display', serif" }}>
                    Care & Service
                </h1>
            </div>

            {/* Hero Image */}
            <div style={{ width: '100%', height: '50vh', minHeight: '400px' }}>
                <img
                    src="https://watchselling-website-mern.onrender.com/uploads/4.jpg"
                    alt="Watch care"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            <div style={{ maxWidth: '800px', margin: '80px auto 0', padding: '0 20px' }}>

                <p style={{ fontSize: '20px', lineHeight: '1.8', color: 'var(--text-light)', textAlign: 'center', marginBottom: '80px', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>
                    "A Rolex Master Copy is designed to last a lifetime. With proper care and regular maintenance, your timepiece will retain its precision and brilliance for generations."
                </p>

                {/* Section 1 */}
                <div style={{ marginBottom: '80px' }}>
                    <h3 style={{ fontSize: '28px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '25px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                        Everyday Care
                    </h3>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-light)', marginBottom: '20px' }}>
                        To maintain the luster of your watch, you can wash it occasionally with a microfiber cloth. You can also clean the case and the metal bracelet from time to time using soapy water and a soft brush (except leather straps).
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-light)' }}>
                        Before cleaning your watch, always ensure that the winding crown is screwed down properly against the case to guarantee waterproofness.
                    </p>
                </div>

                {/* Section 2 */}
                <div style={{ marginBottom: '80px' }}>
                    <h3 style={{ fontSize: '28px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '25px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                        Waterproofness
                    </h3>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-light)', marginBottom: '20px' }}>
                        All our models are waterproof to a minimum depth of 100 meters, ensuring protection not only against water but also against dust and pressure.
                    </p>
                    <div style={{ backgroundColor: 'var(--bg-light)', padding: '30px', borderLeft: '4px solid var(--secondary)', marginTop: '30px' }}>
                        <h4 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '10px', fontWeight: 'bold' }}>Important</h4>
                        <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-light)' }}>
                            After diving or spending time in the sea, it is essential to rinse your watch with fresh water to remove salt and sand deposits.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div style={{ marginBottom: '80px' }}>
                    <h3 style={{ fontSize: '28px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '25px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                        The Winding Crown
                    </h3>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-light)', marginBottom: '20px' }}>
                        The winding crown plays a crucial role in maintaining your watch's waterproof integrity. Always make sure it is screwed down completely after winding the movement manually or setting the time.
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                        <li style={{ position: 'relative', paddingLeft: '25px', marginBottom: '15px', color: 'var(--text-light)', lineHeight: '1.8' }}>
                            <span style={{ position: 'absolute', left: 0, color: 'var(--secondary)' }}>—</span>
                            Never unscrew the crown underwater.
                        </li>
                        <li style={{ position: 'relative', paddingLeft: '25px', marginBottom: '15px', color: 'var(--text-light)', lineHeight: '1.8' }}>
                            <span style={{ position: 'absolute', left: 0, color: 'var(--secondary)' }}>—</span>
                            If your watch stops, wind it manually to give it minimum required power before wearing it.
                        </li>
                    </ul>
                </div>

                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                    <Link to="/services">
                        <button className="btn" style={{ padding: '16px 40px', fontSize: '14px' }}>
                            VIEW SERVICING OPTIONS
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default CareAndService;
