import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';

const Cart = () => {
    // Cart Page - Ahiya user potana pasand karela products joi sake che
    const { cart, total, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    // Checkout function - Order place karva mate
    const handleCheckout = async () => {
        if (!user) {
            navigate("/login"); // Jo user login na hoy to login page par moklo
            return;
        }

        try {
            // Order API call
            await axios.post(`${BASE_URL}orders`, {
                userId: user._id,
                products: cart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                })),
                amount: total,
                address: "Sample Address", // Dummy address (vastavik app ma form hovu joie)
            }, {
                headers: { token: `Bearer ${user.accessToken}` }
            });
            showNotification("Order placed successfully!");
            clearCart(); // Cart khali karo
            navigate("/my-orders"); // Order list page par lai jao
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ fontWeight: 300, textAlign: "center" }}>YOUR BAG</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px" }}>
                <Link to="/shop">
                    <button style={{ padding: "10px", fontWeight: 600, cursor: "pointer", border: "1px solid black", backgroundColor: "transparent" }}>CONTINUE SHOPPING</button>
                </Link>
                <div style={{ display: "flex" }}>
                    <span style={{ textDecoration: "underline", cursor: "pointer", margin: "0 10px" }}>Shopping Bag ({cart.length})</span>
                </div>
                <button onClick={handleCheckout} style={{ padding: "10px", fontWeight: 600, cursor: "pointer", border: "none", backgroundColor: "black", color: "white" }} disabled={cart.length === 0}>CHECKOUT NOW</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 3 }}>
                    {cart.map((product) => (
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid lightgray", padding: "20px 0" }} key={product._id}>
                            <div style={{ flex: 2, display: "flex" }}>
                                <img src={product.image && (product.image.startsWith('http') ? product.image : `https://watchselling-website-mern.onrender.com/uploads/${product.image}`)} style={{ width: "200px", objectFit: "contain" }} alt={product.name} />
                                <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <span><b>Product:</b> {product.name}</span>
                                    <span><b>ID:</b> {product._id}</span>
                                </div>
                            </div>
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                                    <button onClick={() => updateQuantity(product._id, "dec")} style={{ cursor: "pointer", border: "1px solid teal", background: "none", width: "25px", height: "25px", borderRadius: "5px" }}>-</button>
                                    <div style={{ fontSize: "24px", margin: "0 15px" }}>{parseInt(product.quantity) || 1}</div>
                                    <button onClick={() => updateQuantity(product._id, "inc")} style={{ cursor: "pointer", border: "1px solid teal", background: "none", width: "25px", height: "25px", borderRadius: "5px" }}>+</button>
                                </div>
                                <div style={{ fontSize: "30px", fontWeight: 200 }}>₹ {(parseFloat(product.price) * parseInt(product.quantity)).toFixed(2)}</div>
                                <button onClick={() => removeFromCart(product._id)} style={{ marginTop: "10px", padding: "5px", color: "red", border: "1px solid red", backgroundColor: "transparent", cursor: "pointer" }}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ flex: 1, border: "0.5px solid lightgray", borderRadius: "10px", padding: "20px", height: "50vh" }}>
                    <h1 style={{ fontWeight: 200 }}>ORDER SUMMARY</h1>
                    <div style={{ margin: "30px 0", display: "flex", justifyContent: "space-between" }}>
                        <span>Subtotal</span>
                        <span>₹ {total.toFixed(2)}</span>
                    </div>
                    <div style={{ margin: "30px 0", display: "flex", justifyContent: "space-between" }}>
                        <span>Estimated Shipping</span>
                        <span>₹ 50.00</span>
                    </div>
                    <div style={{ margin: "30px 0", display: "flex", justifyContent: "space-between" }}>
                        <span>Shipping Discount</span>
                        <span>₹ -50.00</span>
                    </div>
                    <div style={{ margin: "30px 0", display: "flex", justifyContent: "space-between", fontWeight: 500, fontSize: "24px" }}>
                        <span>Total</span>
                        <span>₹ {total.toFixed(2)}</span>
                    </div>
                    <button onClick={() => navigate("/checkout")} style={{ width: "100%", padding: "10px", backgroundColor: "black", color: "white", fontWeight: 600, cursor: "pointer" }}>CHECKOUT NOW</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
