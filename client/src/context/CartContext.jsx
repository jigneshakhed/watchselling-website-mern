import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const localData = localStorage.getItem("cart");
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            return [];
        }
    });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalAmount = cart.reduce((acc, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return acc + price * quantity;
        }, 0);
        setTotal(totalAmount);
    }, [cart]);

    const addToCart = (product, quantity) => {
        const existingItem = cart.find((item) => item._id === product._id);
        const stockLimit = product.stockQuantity ?? 10;

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > stockLimit) {
                // Limit to stock
                setCart(
                    cart.map((item) =>
                        item._id === product._id ? { ...item, quantity: stockLimit } : item
                    )
                );
            } else {
                setCart(
                    cart.map((item) =>
                        item._id === product._id ? { ...item, quantity: newQuantity } : item
                    )
                );
            }
        } else {
            const finalQuantity = Math.min(quantity, stockLimit);
            setCart([...cart, { ...product, quantity: finalQuantity }]);
        }
    };

    const updateQuantity = (productId, type) => {
        setCart(
            cart.map((item) => {
                if (item._id === productId) {
                    const stockLimit = item.stockQuantity ?? 10;
                    let newQty = parseInt(item.quantity) || 0;
                    if (type === "inc") {
                        newQty = Math.min(newQty + 1, stockLimit);
                    } else {
                        newQty = Math.max(1, newQty - 1);
                    }
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item._id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
