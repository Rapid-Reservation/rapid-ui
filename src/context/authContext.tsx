import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initialize isLoggedIn state from localStorage if available
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedLoggedIn) {
      setIsLoggedIn(JSON.parse(storedLoggedIn));
    }
  }, []);

  const login = () => {
    // Simulate login logic (replace with actual login logic)
    setIsLoggedIn(true);
    // Store isLoggedIn state in localStorage
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  const logout = () => {
    // Simulate logout logic (replace with actual logout logic)
    setIsLoggedIn(false);
    // Remove isLoggedIn state from localStorage
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    console.log(`isLoggedIn state changed to: ${isLoggedIn}`);
    // Set a timeout to clear isLoggedIn state after 5 minutes
    const timeoutId = setTimeout(() => {
      logout();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
