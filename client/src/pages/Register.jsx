import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register, isFetching, error } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await register({
                username,
                email,
                password,
            });
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{
            width: "100%",
            minHeight: "calc(100vh - 90px)",
            backgroundColor: "var(--bg-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px"
        }}>
            <div style={{
                width: "100%",
                maxWidth: "550px",
                padding: "60px 50px",
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                textAlign: "center"
            }}>
                <div style={{ fontSize: '32px', color: 'var(--secondary)', marginBottom: '15px' }}>♕</div>
                <h1 style={{
                    fontSize: "28px",
                    fontWeight: "500",
                    color: "var(--primary)",
                    fontFamily: "'Playfair Display', serif",
                    marginBottom: '40px',
                    letterSpacing: '1px'
                }}>
                    CREATE AN ACCOUNT
                </h1>

                <form style={{ display: "flex", flexDirection: 'column', gap: '20px' }} onSubmit={handleClick}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>Username</label>
                        <input
                            style={{ width: "100%", padding: "15px", backgroundColor: '#FAFAFA', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '14px', transition: 'border 0.3s' }}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>Email Address</label>
                        <input
                            type="email"
                            style={{ width: "100%", padding: "15px", backgroundColor: '#FAFAFA', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '14px', transition: 'border 0.3s' }}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>Password</label>
                        <input
                            type="password"
                            style={{ width: "100%", padding: "15px", backgroundColor: '#FAFAFA', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '14px', transition: 'border 0.3s' }}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <span style={{ fontSize: "12px", margin: "10px 0", color: "var(--text-light)", lineHeight: '1.6', textAlign: 'left' }}>
                        By creating an account, I consent to the processing of my personal data in accordance with the <strong style={{ color: "var(--primary)" }}>PRIVACY POLICY</strong>.
                    </span>

                    {error && <span style={{ color: "#d9534f", fontSize: '14px', textAlign: 'left' }}>An error occurred during registration.</span>}

                    <button className="btn" type="submit" disabled={isFetching}
                        style={{
                            width: "100%",
                            marginTop: "10px",
                            padding: "16px",
                            cursor: isFetching ? "not-allowed" : "pointer",
                        }}>
                        {isFetching ? "CREATING ACCOUNT..." : "REGISTER"}
                    </button>

                    <div style={{ marginTop: '25px' }}>
                        <Link to="/login" style={{ fontSize: "13px", fontWeight: "600", textDecoration: "none", color: "var(--primary)", borderBottom: "1px solid var(--primary)", paddingBottom: "2px", textTransform: "uppercase", letterSpacing: "1px" }}>ALREADY HAVE AN ACCOUNT? SIGN IN</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
