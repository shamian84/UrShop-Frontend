/* eslint-disable react-refresh/only-export-components */
// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useMemo } from "react";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem("user");
    }
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ user, setUser, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
