import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    // Axios interceptor to handle token expiration
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    const message = error.response.data;
                    if (message === "Token is not valid or expired!" || message === "You are not authenticated! No token provided.") {
                        console.warn("Session expired or invalid. Logging out...");
                        logout();
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const login = async (userCredentials) => {
        setIsFetching(true);
        setError(false);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", userCredentials);
            setUser(res.data);
            setIsFetching(false);
        } catch (err) {
            setError(true);
            setIsFetching(false);
            throw err;
        }
    };

    const register = async (userData) => {
        setIsFetching(true);
        setError(false);
        try {
            await axios.post("http://localhost:5000/api/auth/register", userData);
            setIsFetching(false);
        } catch (err) {
            setError(true);
            setIsFetching(false);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isFetching,
                error,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
