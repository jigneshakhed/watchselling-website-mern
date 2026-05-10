import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaHeart, FaUserCircle, FaShoppingBag } from 'react-icons/fa';
import { useRef } from 'react';
import '../index.css';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { WaitlistContext } from '../context/WaitlistContext';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const { waitlist } = useContext(WaitlistContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const location = useLocation();

    // Ensure menu closes whenever the route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const cartQuantity = cart.reduce((acc, item) => acc + Number(item.quantity || 0), 0);
    const waitlistQuantity = waitlist.length;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
            setSearchQuery("");
            setIsMenuOpen(false);
        }
    };

    const menuLinkStyle = {
        fontSize: '24px',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: 'var(--primary)',
        letterSpacing: '3px',
        fontWeight: '500',
        transition: 'color 0.3s ease'
    };

    return (
        <>
            <nav style={{
                height: '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 5%',
                borderBottom: '1px solid var(--border-color)',
                position: 'sticky',
                top: 0,
                width: '100%',
                zIndex: 50,
                backgroundColor: '#FFFFFF'
            }}>
                {/* Left Nav (Hamburger Menu) */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <div
                        onClick={() => setIsMenuOpen(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'var(--primary)', padding: '10px 0' }}
                    >
                        <FaBars size={24} />
                        <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>Menu</span>
                    </div>
                </div>

                {/* Center Logo */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <Link to="/" style={{
                        fontWeight: 'bold',
                        fontSize: '24px',
                        letterSpacing: '2px',
                        color: 'var(--primary)',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        lineHeight: '1.2'
                    }}>
                        <div style={{ fontSize: '32px', color: 'var(--secondary)', marginBottom: '5px' }}>♕</div>
                        Take Easy <span style={{ fontSize: '10px', display: 'block', fontWeight: 'normal', letterSpacing: '1px', color: 'var(--text-light)' }}>Luxury watches</span>
                    </Link>
                </div>

                {/* Right Nav (User / Cart) */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '25px' }}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '2px', marginRight: '10px' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '13px', width: '120px', color: 'var(--text-main)', fontFamily: "'Inter', sans-serif" }}
                        />
                        <button type="submit" style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)', padding: '0 5px', display: 'flex', alignItems: 'center' }}>
                            <FaSearch size={12} />
                        </button>
                    </form>

                    {user && user.isAdmin && <Link to="/admin" style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--secondary)', textDecoration: 'none', fontWeight: '600', letterSpacing: '1.5px' }}>Admin</Link>}

                    {!user ? (
                        <>
                            <Link to="/login" style={{ fontSize: '13px', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--text-main)', letterSpacing: '1.5px', fontWeight: '500' }}>Sign In</Link>
                        </>
                    ) : (
                        <div style={{ position: 'relative' }} ref={profileRef}>
                            <div 
                                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'var(--primary)' }}
                            >
                                <FaUserCircle size={24} />
                            </div>

                            {isProfileOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '40px',
                                    right: 0,
                                    width: '200px',
                                    backgroundColor: '#FFFFFF',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                    border: '1px solid var(--border-color)',
                                    padding: '20px',
                                    zIndex: 60,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px'
                                }}>
                                    <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '5px' }}>
                                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Welcome,</p>
                                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'var(--primary)' }}>{user.username}</p>
                                    </div>
                                    <Link to="/my-orders" style={{ textDecoration: 'none', fontSize: '13px', color: 'var(--text-main)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--secondary)'} onMouseOut={e => e.target.style.color = 'var(--text-main)'}>My Orders</Link>
                                    <div onClick={handleLogout} style={{ fontSize: '13px', cursor: 'pointer', color: 'var(--text-main)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--secondary)'} onMouseOut={e => e.target.style.color = 'var(--text-main)'}>Logout</div>
                                </div>
                            )}
                        </div>
                    )}

                    <Link to="/waitlist" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaHeart size={16} color="var(--primary)" />
                            {waitlistQuantity > 0 && (
                                <div style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: 'var(--secondary)', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>
                                    {waitlistQuantity}
                                </div>
                            )}
                        </div>
                    </Link>

                    <Link to="/cart" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <FaShoppingBag size={20} color="var(--primary)" />
                            {cartQuantity > 0 && (
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '-8px', 
                                    right: '-8px', 
                                    backgroundColor: 'var(--secondary)', 
                                    color: 'white', 
                                    borderRadius: '50%', 
                                    width: '16px', 
                                    height: '16px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    fontSize: '10px', 
                                    fontWeight: 'bold' 
                                }}>
                                    {cartQuantity}
                                </div>
                            )}
                        </div>
                    </Link>
                </div>
            </nav>

            {/* Slide-out Full Screen Menu overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: isMenuOpen ? '0' : '-100%',
                width: '100%',
                height: '100vh',
                backgroundColor: '#ffffff',
                zIndex: 100,
                transition: 'left 0.4s cubic-bezier(0.77, 0, 0.175, 1)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px 5%', alignItems: 'center' }}>
                    <div style={{ fontWeight: '600', fontSize: '15px', letterSpacing: '2px', color: 'var(--primary)', textTransform: 'uppercase' }}>
                        MENU
                    </div>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px' }}
                    >
                        <FaTimes size={28} color="var(--primary)" />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '35px', paddingBottom: '50px' }}>
                    <Link to="/shop" onClick={() => setIsMenuOpen(false)} style={menuLinkStyle} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>Watches</Link>
                    <Link to="/blog" onClick={() => setIsMenuOpen(false)} style={menuLinkStyle} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>World of Rolex</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)} style={menuLinkStyle} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>Store Locator</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)} style={menuLinkStyle} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>Contact</Link>
                    <Link to="/services" onClick={() => setIsMenuOpen(false)} style={menuLinkStyle} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>Services</Link>
                    <Link to="/reviews" onClick={() => setIsMenuOpen(false)} style={menuLinkStyle} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>Feedback</Link>
                    <Link to="/faq" onClick={() => setIsMenuOpen(false)} style={menuLinkStyle} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>FAQ</Link>
                    <Link to="/care-and-service" onClick={() => setIsMenuOpen(false)} style={menuLinkStyle} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>Care & Service</Link>
                </div>

                <div style={{ padding: '30px 5%', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', gap: '30px', backgroundColor: '#fcfcfc' }}>
                    {!user ? (
                        <>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '13px', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--text-main)', letterSpacing: '1.5px', fontWeight: '500' }}>Sign In</Link>
                            <Link to="/register" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '13px', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--text-main)', letterSpacing: '1.5px', fontWeight: '500' }}>Register</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/my-orders" onClick={() => setIsMenuOpen(false)} style={{ fontSize: '13px', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--text-main)', letterSpacing: '1.5px', fontWeight: '500' }}>My Orders</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default Navbar;
