import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("User");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // On mount, try to restore from localStorage first, then from backend
    useEffect(() => {
      if(!user){
          const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setRole(storedUser.role);
            setLoading(false);
        } 

      }
       
    }, []);



const login = async (email, password, navigate) => {
    setLoading(true);
    setError(null);

    try {
        const data = await authApi.login(email, password);

        if (!data || !data.user || !data.token) {
            throw new Error("Invalid response from server");
        }

        setUser(data.user);
        setRole(data.user.role);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        if (navigate) {
            navigate('/dashboard');
        }
    } catch (err) {
        console.error("Login error:", err);
        setError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
        setLoading(false);
    }
};



    const register = async (payload, navigate) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authApi.register(payload);
            console.log('Register response:', data);
            setUser(data?.user);
            setRole(data?.user?.role);
            localStorage.setItem("user", JSON.stringify(data.user));
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            if (navigate) navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = async (navigate) => {
        setLoading(true);
        try {
            await authApi.logout();
            setUser(null);
            setRole(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            if (navigate) navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, role, setRole, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
