import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from 'react';
import api from "../api/api";
import type { UserType, LoginUserType, RegisterUserType } from "../types/UserType";

type User = UserType | null;

type AuthContextType = {
  user: User;
  token: string;
  login: (loginUser: LoginUserType, token: string) => Promise<void>;
  register: (registerUser: RegisterUserType) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string>("");

  // Restore user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("auth");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (loginUser: LoginUserType, token: string) => {
    const res = await api.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, loginUser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("auth", JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);
  };

  const register = async (registerUser: RegisterUserType) => {
    const res = await api.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, registerUser);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("auth", JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");

    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
