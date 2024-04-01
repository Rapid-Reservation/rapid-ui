// authContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Simulate login logic (replace with actual login logic)
    console.log(`Current login state: ${isLoggedIn}`);
    console.log("Updating global login state");
    setIsLoggedIn(true);
    console.log(isLoggedIn);
  };

  const logout = () => {
    // Simulate logout logic (replace with actual logout logic)
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log(`isLoggedIn state changed to: ${isLoggedIn}`);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
