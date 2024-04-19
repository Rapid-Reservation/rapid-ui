import router from "next/router";
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

  // @ts-ignore
  const login = async (credentials) => {
    try {
      const response = await fetch("/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(credentials).toString(),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("accessToken", data.access_token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    console.log(`isLoggedIn state changed to: ${isLoggedIn}`);
    // Set a timeout to clear isLoggedIn state after 5 minutes
    const timeoutId = setTimeout(() => {
      alert("You are being logged out");
      logout();
      router.push("/");
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
