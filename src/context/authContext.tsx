import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const url = "https://rapid-api-rho.vercel.app"; //live version
  //const url = "http://127.0.0.1:8000"; //localhost

  useEffect(() => {
    // Check if user is already logged in on initial load
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      localStorage.setItem("accessToken", data.token);
      setIsAdmin(data.user.isadmin);
      setUserId(data.user.user_id);
      setUsername(data.user.user_name);
      setIsLoggedIn(true);
      console.log(isAdmin, userId, userName);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isAdmin, userId, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: any) => {
  const { isLoggedIn } = useAuth();

  // Redirect to login page if user is not logged in
  if (!isLoggedIn) {
    // Redirect logic or show login form
  }

  return children;
};
