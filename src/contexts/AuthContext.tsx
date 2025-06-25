import React, { createContext, useContext, useState, ReactNode } from "react";
import apiClient from "../services/apiClient";
import { API_ROUTES } from "../constants/apiRoutes";

interface AuthContextType {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  async function login(username: string, password: string) {
    // First API call (your backend)
    const response = await apiClient(API_ROUTES.AUTH.LOGIN, {
      method: "POST",
      body: { username, password, role: "admin" },
    }) as any;

    console.log("Token:", response?.data?.token);
    localStorage.setItem("token", response?.data?.token);
    setIsAuthenticated(true);

    try {
      const wpResponse = await fetch(API_ROUTES.AUTH.WORDPRESS_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!wpResponse.ok) {
        const wpError = await wpResponse.json();
        console.error("WordPress Login Error:", wpError.message);

      } else {
        const wpData = await wpResponse.json();
        console.log("WordPress JWT Token:", wpData.token);
        localStorage.setItem("wp_token", wpData.token);
      }
    } catch (err) {
      console.error("Failed to connect to WordPress API:", err);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    // localStorage.removeItem("wp_token"); // if stored
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
