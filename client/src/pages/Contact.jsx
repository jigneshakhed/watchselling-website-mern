import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const { showNotification } = useContext(NotificationContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}contacts`, formData);
            showNotification('Your inquiry has been sent. An associate will contact you shortly.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending contact:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '16px 0',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--border-color)',
        color: 'var(--text-main)',
        fontSize: '15px',
        fontFamily: "'Inter', sans-serif",
        outline: 'none',
        transition: 'border-color 0.3s ease'
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Header Content */}
            <div style={{ flex: '0 0 auto', padding: '100px 20px 60px 20px', textAlign: 'center', backgroundColor: 'var(--bg-light)', borderBottom: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '15px', fontWeight: 'bold' }}>Client Services</h2>
                <h1 style={{ fontWeight: "400", fontSize: '56px', color: "var(--primary)", fontFamily: "'Playfair Display', serif" }}>
                    Contact Us
                </h1>
                <p style={{ marginTop: '20px', fontSize: '16px', color: 'var(--text-light)', maxWidth: '600px', margin: '20px auto 0', lineHeight: '1.8' }}>
                    To discuss a timepiece, request servicing, or consult with one of our specialists, please submit your inquiry below.
                </p>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: '1 1 auto', display: 'flex', flexWrap: 'wrap', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

                {/* Form Side (White/Light) */}
                <div style={{ flex: '1 1 600px', padding: '80px 5%' }}>
                    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>

                        <div style={{ marginBottom: '40px' }}>
                            <label style={{ display: 'block', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '5px', fontWeight: 'bold' }}>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                placeholder="Enter your full name"
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--secondary)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'var(--border-color)'}
                            />
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <label style={{ display: 'block', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '5px', fontWeight: 'bold' }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                placeholder="Enter your email address"
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--secondary)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'var(--border-color)'}
                            />
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <label style={{ display: 'block', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '5px', fontWeight: 'bold' }}>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                placeholder="Nature of your inquiry"
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--secondary)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'var(--border-color)'}
                            />
                        </div>

                        <div style={{ marginBottom: '50px' }}>
                            <label style={{ display: 'block', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '5px', fontWeight: 'bold' }}>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                style={{ ...inputStyle, resize: 'none' }}
                                placeholder="How may we assist you?"
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--secondary)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'var(--border-color)'}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn" style={{ width: '100%', padding: '18px 0', fontSize: '14px' }}>
                            Send Inquiry
                        </button>
                    </form>
                </div>

                {/* Right Panel - Map/Info */}
                <div style={{ flex: '1 1 500px', backgroundColor: 'var(--bg-light)', padding: '80px 5%', borderLeft: '1px solid var(--border-color)' }}>
                    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <h3 style={{ fontSize: '28px', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", marginBottom: '30px' }}>Our Boutiques</h3>

                        <div style={{ marginBottom: '40px' }}>
                            <h4 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '10px', fontWeight: 'bold' }}>Ahemdabad Head Office</h4>
                            <p style={{ color: 'var(--text-light)', lineHeight: '1.8', fontSize: '15px' }}>
                                16 rajvadi road<br />
                                moti palace office<br />
                                ahemdabad, gujarat
                            </p>
                            <p style={{ color: 'var(--secondary)', marginTop: '10px', fontSize: '15px' }}>+91 6355211722</p>
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <h4 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '10px', fontWeight: 'bold' }}>Gandinagar Service Center</h4>
                            <p style={{ color: 'var(--text-light)', lineHeight: '1.8', fontSize: '15px' }}>
                                grand palzz building,<br/>
                                near gandhi bhavan ,<br />
                                12 a science city road<br />
                                Gandinagar, Gujarat
                            </p>
                            <p style={{ color: 'var(--secondary)', marginTop: '10px', fontSize: '15px' }}>+91 6355815963</p>
                        </div>

                        <div style={{ marginTop: '50px' }}>
                            <h4 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '15px', fontWeight: 'bold' }}>Boutique Hours</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)', fontSize: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '10px' }}>
                                <span>Mon - Fri</span>
                                <span>10:00 - 6:00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)', fontSize: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '10px' }}>
                                <span>Saturday</span>
                                <span>10:00 - 4:00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)', fontSize: '15px' }}>
                                <span>Sunday</span>
                                <span>Closed</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
