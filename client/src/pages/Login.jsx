import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, isFetching, error } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password });
            navigate("/");
        } catch (err) { }
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
                maxWidth: "450px",
                padding: "60px 40px",
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
                    SIGN IN TO YOUR ACCOUNT
                </h1>

                <form style={{ display: "flex", flexDirection: "column", gap: "25px" }} onSubmit={handleClick}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--text-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>Username</label>
                        <input
                            style={{ width: "100%", padding: "15px", backgroundColor: '#FAFAFA', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontSize: '14px', transition: 'border 0.3s' }}
                            onChange={(e) => setUsername(e.target.value)}
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

                    {error && <span style={{ color: "#d9534f", fontSize: '14px', textAlign: 'left' }}>Invalid username or password.</span>}

                    <button className="btn" type="submit" disabled={isFetching}
                        style={{
                            width: '100%',
                            padding: "16px",
                            marginTop: '10px',
                            cursor: isFetching ? "not-allowed" : "pointer"
                        }}
                    >
                        {isFetching ? "SIGNING IN..." : "SIGN IN"}
                    </button>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                        <a href="#" style={{ fontSize: "12px", textDecoration: "underline", color: "var(--text-light)", transition: "color 0.3s" }} onMouseOver={e => e.currentTarget.style.color = "var(--primary)"} onMouseOut={e => e.currentTarget.style.color = "var(--text-light)"}>Forgot your password?</a>
                        <Link to="/register" style={{ fontSize: "13px", fontWeight: "600", textDecoration: "none", color: "var(--primary)", borderBottom: "1px solid var(--primary)", alignSelf: "center", paddingBottom: "2px", textTransform: "uppercase", letterSpacing: "1px" }}>Create an account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
