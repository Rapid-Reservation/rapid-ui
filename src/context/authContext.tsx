// authContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Simulate login logic (replace with actual login logic)
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Simulate logout logic (replace with actual logout logic)
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
