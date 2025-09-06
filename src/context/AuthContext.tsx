import { createContext, useContext, useState, type ReactNode } from "react";
import type { LoginDetailsType, RegisterDetailsType, UserType } from "../types/User";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type User = UserType | null;

type AuthContextType = {
  user: User;
  register: (userDetail: RegisterDetailsType)=> void;
  login: (loginDetail: LoginDetailsType)=> void;
  logout: ()=> void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const register = async (userDetail: RegisterDetailsType) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/user/register`,
        userDetail,
        {
          withCredentials: true,
        }
      );

      setUser(res.data?.user);
      localStorage.setItem(
        "auth",
        JSON.stringify({ email: res.data?.user?.email })
      );

      toast.message(res.data.message as string);

      navigate("/home");
    } catch (err) {
      toast.error("Error in user registration.");
    }
  };

  const login = async (loginDetail: LoginDetailsType) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/user/login`,
        loginDetail,
        {
          withCredentials: true,
        }
      );

      setUser(res.data?.user);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          email: res.data?.user?.email,
        })
      );

      toast.message(res.data.message as string);

      navigate("/home");
    } catch (err) {
      toast.error("Error in the user login.");
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);
      localStorage.removeItem("auth");

      toast.message(res.data.message as string);

      navigate("/");
    } catch (err) {
      toast.error("Error in the user logout.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
