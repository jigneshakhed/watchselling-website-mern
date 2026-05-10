import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { FaCreditCard, FaMobileAlt, FaUniversity, FaWallet, FaChevronRight } from 'react-icons/fa';
import { SiGooglepay, SiPhonepe, SiPaytm } from 'react-icons/si';

const Checkout = () => {
    const { cart, total, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);
    const [address, setAddress] = useState({
        name: "",
        address: "",
        phone: "",
        pincode: ""
    });
    const [loading, setLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, []);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const initPayment = async (data) => {
        try {
            const { data: { key } } = await axios.get(`${BASE_URL}payment/get-key`, {
                headers: { token: `Bearer ${user.accessToken}` }
            });

            const options = {
                key: key,
                amount: data.amount,
                currency: data.currency,
                name: "Watch Shop",
                description: "Order Checkout",
                theme: { color: "#00c3ff" },
                order_id: data.id,
                prefill: {
                    name: address.name,
                    contact: address.phone,
                },
                handler: async (response) => {
                    try {
                        const verifyUrl = `${BASE_URL}payment/verify`;
                        const { data: verifyData } = await axios.post(verifyUrl, response, {
                            headers: { token: `Bearer ${user.accessToken}` }
                        });

                        if (verifyData.message === "Payment verified successfully") {
                            await axios.post(`${BASE_URL}orders`, {
                                userId: user._id,
                                products: cart.map(item => ({
                                    productId: item._id,
                                    quantity: item.quantity
                                })),
                                amount: total,
                                address: address,
                                paymentId: response.razorpay_payment_id,
                                status: "paid"
                            }, {
                                headers: { token: `Bearer ${user.accessToken}` }
                            });

                            showNotification("Success! Order Confirmed.");
                            clearCart();
                            navigate("/my-orders");
                        }
                    } catch (error) {
                        console.error(error);
                        showNotification("Payment verification failed", "error");
                    }
                },
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error(error);
            showNotification("Could not initialize payment", "error");
        }
    };

    const [paymentType, setPaymentType] = useState('online'); // 'cod' or 'online'
    const [showMockModal, setShowMockModal] = useState(false);
    const [mockStep, setMockStep] = useState('list'); // 'list' or 'qr'

    const handleOrder = async (e) => {
        e.preventDefault();
        if (!user) { navigate("/login"); return; }
        
        if (paymentType === 'online' && !selectedMethod) {
            showNotification("Please select an online payment method", "warning");
            return;
        }

        // Final Stock Check
        for (const item of cart) {
            if (item.stockQuantity !== undefined && item.quantity > item.stockQuantity) {
                showNotification(`Sorry, ${item.name} only has ${item.stockQuantity} items left.`, "error");
                setLoading(false);
                return;
            }
        }

        setLoading(true);
        try {
            if (paymentType === 'cod') {
                // Direct COD Order
                await axios.post(`${BASE_URL}orders`, {
                    userId: user._id,
                    products: cart.map(item => ({
                        productId: item._id,
                        quantity: item.quantity
                    })),
                    amount: total,
                    address: address,
                    paymentId: "COD",
                    status: "cod"
                }, { headers: { token: `Bearer ${user.accessToken}` } });
                
                showNotification("Order Placed! (Cash on Delivery)");
                clearCart();
                navigate("/my-orders");
            } else {
                // Online Payment Logic
                const orderUrl = `${BASE_URL}payment/orders`;
                const { data } = await axios.post(orderUrl, { amount: total }, {
                    headers: { token: `Bearer ${user.accessToken}` }
                });

                if (data.isMock) {
                    setShowMockModal(true);
                    setMockStep('qr');
                } else {
                    initPayment(data.data);
                }
            }
        } catch (error) {
            console.error(error);
            showNotification("Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    const confirmMockPayment = async () => {
        setLoading(true);
        try {
            await axios.post(`${BASE_URL}orders`, {
                userId: user._id,
                products: cart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                })),
                amount: total,
                address: address,
                paymentId: "MOCK_PAYMENT_QR",
                status: "paid"
            }, { headers: { token: `Bearer ${user.accessToken}` } });
            
            showNotification("Payment Successful! Order Confirmed.");
            clearCart();
            navigate("/my-orders");
        } catch (err) {
            showNotification("Checkout failed", "error");
        } finally {
            setLoading(false);
            setShowMockModal(false);
        }
    };

    const methods = [
        { id: 'upi', name: 'UPI - Google Pay, PhonePe', icon: <FaMobileAlt color="#00c3ff" />, sub: [<SiGooglepay key="1" />, <SiPhonepe key="2" />, <SiPaytm key="3" />] },
        { id: 'card', name: 'Card', icon: <FaCreditCard color="#00c3ff" />, sub: 'Visa, MasterCard, RuPay' },
        { id: 'nb', name: 'Netbanking', icon: <FaUniversity color="#00c3ff" />, sub: 'All Indian Banks' },
        { id: 'wallet', name: 'Wallet', icon: <FaWallet color="#00c3ff" />, sub: 'Freecharge, Mobikwik & more' }
    ];

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '100px 20px', position: 'relative' }}>
            {/* Mock Payment Modal */}
            {showMockModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <div style={modalHeaderStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '30px', height: '30px', backgroundColor: '#00c3ff', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>j</div>
                                <span style={{ fontWeight: '600' }}>jignesh Akhed</span>
                            </div>
                            <button onClick={() => setShowMockModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
                        </div>
                        
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                                <div style={{ 
                                    width: '60px', 
                                    height: '60px', 
                                    borderRadius: '50%', 
                                    backgroundColor: '#f1f1f1', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    marginBottom: '10px',
                                    border: '1px solid #ddd'
                                }}>
                                    <span style={{ fontSize: '24px', color: '#666' }}>j</span>
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: 0 }}>jignesh Akhed</h3>
                            </div>
                            
                            <div style={qrContainerStyle}>
                                <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '10px', display: 'inline-block' }}>
                                    <img 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=jigneshahir1352@oksbi&pn=jignesh%20Akhed&am=${total}&cu=INR`} 
                                        alt="QR Code" 
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                </div>
                                <div style={{ marginTop: '15px', fontSize: '13px', color: '#666' }}>
                                    UPI ID: <strong style={{color: '#00c3ff'}}>jigneshahir1352@oksbi</strong><br/>
                                    Scan to pay with any UPI app
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                                        <SiGooglepay /> <SiPhonepe /> <SiPaytm />
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '30px' }}>
                                <button 
                                    onClick={confirmMockPayment}
                                    style={payBtnStyle}
                                >
                                    SIMULATE SUCCESSFUL PAYMENT
                                </button>
                                <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>₹{total.toLocaleString()} • Finalizing Order...</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                
                {/* Left Side - Details */}
                <div style={{ flex: '1.5', minWidth: '350px' }}>
                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 25px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '25px', color: '#1a1a1a', letterSpacing: '0.5px' }}>SHIPPING INFORMATION</h2>
                        <form id="checkout-form" onSubmit={handleOrder} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input name="name" placeholder="Full Name" onChange={handleChange} required style={inputStyle} />
                            <textarea name="address" placeholder="Complete Shipping Address" onChange={handleChange} required style={{ ...inputStyle, minHeight: '100px' }} />
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <input name="phone" placeholder="Phone Number" onChange={handleChange} required style={{ ...inputStyle, flex: 1 }} />
                                <input name="pincode" placeholder="Pincode" onChange={handleChange} required style={{ ...inputStyle, flex: 1 }} />
                            </div>
                        </form>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 25px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '25px', color: '#1a1a1a' }}>SELECT PAYMENT TYPE</h2>
                        
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                            <div 
                                onClick={() => setPaymentType('cod')}
                                style={{
                                    flex: 1,
                                    padding: '20px',
                                    borderRadius: '12px',
                                    border: `2px solid ${paymentType === 'cod' ? '#00c3ff' : '#eee'}`,
                                    backgroundColor: paymentType === 'cod' ? '#f0fcff' : 'white',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <FaWallet size={24} color={paymentType === 'cod' ? '#00c3ff' : '#888'} />
                                <div style={{ fontWeight: '600', marginTop: '10px', color: paymentType === 'cod' ? '#333' : '#888' }}>Cash on Delivery</div>
                            </div>
                            <div 
                                onClick={() => setPaymentType('online')}
                                style={{
                                    flex: 1,
                                    padding: '20px',
                                    borderRadius: '12px',
                                    border: `2px solid ${paymentType === 'online' ? '#00c3ff' : '#eee'}`,
                                    backgroundColor: paymentType === 'online' ? '#f0fcff' : 'white',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <FaMobileAlt size={24} color={paymentType === 'online' ? '#00c3ff' : '#888'} />
                                <div style={{ fontWeight: '600', marginTop: '10px', color: paymentType === 'online' ? '#333' : '#888' }}>Online Payment</div>
                            </div>
                        </div>

                        {paymentType === 'online' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeIn 0.5s ease' }}>
                                <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>Preferred Online Methods</h3>
                                {methods.map(m => (
                                    <div 
                                        key={m.id} 
                                        onClick={() => setSelectedMethod(m.id)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '18px 20px',
                                            border: `1.5px solid ${selectedMethod === m.id ? '#00c3ff' : '#eee'}`,
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            backgroundColor: selectedMethod === m.id ? '#f0fcff' : 'transparent',
                                        }}
                                    >
                                        <div style={{ marginRight: '20px', fontSize: '24px' }}>{m.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600', color: '#333' }}>{m.name}</div>
                                            <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                                                {Array.isArray(m.sub) ? (
                                                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>{m.sub}</div>
                                                ) : m.sub}
                                            </div>
                                        </div>
                                        <FaChevronRight color={selectedMethod === m.id ? '#00c3ff' : '#ccc'} size={14} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {paymentType === 'cod' && (
                            <div style={{ padding: '20px', backgroundColor: '#fffbe6', borderRadius: '10px', border: '1px solid #ffe58f', color: '#856404', fontSize: '14px' }}>
                                <strong>Note:</strong> You will pay the full amount of ₹{total.toLocaleString()} when the order is delivered to your address.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side - Summary */}
                <div style={{ flex: '1', minWidth: '320px' }}>
                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 25px rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '25px', color: '#1a1a1a' }}>ORDER SUMMARY</h2>
                        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '25px', paddingRight: '10px' }}>
                            {cart.map(item => (
                                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <div>
                                        <div style={{ fontWeight: '500', fontSize: '14px' }}>{item.name}</div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>Qty: {item.quantity}</div>
                                    </div>
                                    <div style={{ fontWeight: '600' }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                        
                        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginBottom: '25px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#888' }}>Subtotal</span>
                                <span style={{ fontWeight: '500' }}>₹{total.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#888' }}>Shipping</span>
                                <span style={{ fontWeight: '500', color: '#2e7d32' }}>FREE</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                                <span style={{ fontSize: '18px', fontWeight: '700' }}>Total</span>
                                <span style={{ fontSize: '20px', fontWeight: '700', color: '#00c3ff' }}>₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <button 
                            form="checkout-form"
                            type="submit" 
                            disabled={loading}
                            style={{ 
                                width: '100%', 
                                padding: '18px', 
                                background: loading ? '#ccc' : 'linear-gradient(135deg, #00c3ff 0%, #007bff 100%)',
                                color: 'white', 
                                fontWeight: '700', 
                                border: 'none', 
                                borderRadius: '12px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'transform 0.2s',
                                boxShadow: '0 4px 15px rgba(0, 195, 255, 0.3)'
                            }}
                            onMouseOver={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseOut={e => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
                        >
                            {loading ? "PROCESSING..." : (paymentType === 'cod' ? "PLACE COD ORDER" : "PAY NOW")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: "14px 18px",
    borderRadius: "10px",
    border: "1.5px solid #eee",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s",
    boxSizing: 'border-box'
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const modalContentStyle = {
    backgroundColor: 'white',
    width: '400px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
};

const modalHeaderStyle = {
    padding: '15px 20px',
    backgroundColor: '#f1f1f1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd'
};

const qrContainerStyle = {
    padding: '20px',
    backgroundColor: 'white',
    border: '1px solid #f0fcff',
    borderRadius: '12px'
};

const payBtnStyle = {
    width: '100%',
    padding: '15px',
    background: '#00c3ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '700',
    cursor: 'pointer'
};

export default Checkout;

