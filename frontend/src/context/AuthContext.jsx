import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  // Save user + token in localStorage
  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", credentials);
      
      if (!res.data.success) {
        throw new Error(res.data.message || "Login failed");
      }

      const { user, token } = res.data.data;
      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      
      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed"
      };
      } finally {
      setLoading(false);
    }
  };



  const register = async (formData) => {
  setLoading(true);
  try {
    const res = await API.post("/auth/register", formData);
    
    if (!res.data.success) {
      throw new Error(res.data.message || "Registration failed");
    }

    const { user, token } = res.data.data;
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    
    return { success: true };
  } catch (err) {
    console.error("Registration error:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Registration failed",
    };
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
