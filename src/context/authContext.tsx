import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

// context wrapper to allow components to use this globally!
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
    // TODO: Add API login logic to allow protected routes
    setIsLoggedIn(true);
    // Store isLoggedIn state in localStorage
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Remove isLoggedIn state from localStorage
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    console.log(`isLoggedIn state changed to: ${isLoggedIn}`);
    // Set a timeout to clear isLoggedIn state after 5 minutes
    const timeoutId = setTimeout(() => {
      logout();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds ( 5 mins by 60 to get second, times 1000 for miliseconds)

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
