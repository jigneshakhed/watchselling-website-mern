import { createContext, useState, useEffect } from "react";

export const WaitlistContext = createContext();

export const WaitlistProvider = ({ children }) => {
    // Initialize from local storage if available
    const [waitlist, setWaitlist] = useState(() => {
        try {
            const localData = localStorage.getItem("waitlist");
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error parsing waitlist from localStorage:", error);
            return [];
        }
    });

    // Save to local storage on changes
    useEffect(() => {
        localStorage.setItem("waitlist", JSON.stringify(waitlist));
    }, [waitlist]);

    const addToWaitlist = (product) => {
        // Prevent duplicates
        if (!waitlist.some((item) => item._id === product._id)) {
            setWaitlist([...waitlist, product]);
        }
    };

    const removeFromWaitlist = (productId) => {
        setWaitlist(waitlist.filter((item) => item._id !== productId));
    };

    const clearWaitlist = () => {
        setWaitlist([]);
    };

    return (
        <WaitlistContext.Provider value={{ waitlist, addToWaitlist, removeFromWaitlist, clearWaitlist }}>
            {children}
        </WaitlistContext.Provider>
    );
};
