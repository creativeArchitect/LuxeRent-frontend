import { createContext, useContext, useState, type ReactNode } from "react";
import type {
  LoginDetailsType,
  RegisterDetailsType,
  UserType,
} from "../types/User";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type User = UserType | null;

type AuthContextType = {
  user: User;
  register: (userDetail: RegisterDetailsType) => void;
  login: (loginDetail: LoginDetailsType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const register = async (userDetail: RegisterDetailsType) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/user/register`,
        userDetail
      );

      setToken(res.data?.token);
      setUser(res.data?.user);
      localStorage.setItem("token", res.data?.token);
      localStorage.setItem(
        "auth",
        JSON.stringify({ email: res.data?.user?.email })
      );

      console.log("localStorage token", localStorage.getItem("token"));

      toast.message(res.data.message as string);
    } catch (err) {
      toast.error("Error in user registration.");
    }
  };

  const login = async (loginDetail: LoginDetailsType) => {
    try {
      // const token = localStorage.getItem("token") as string;
      // if (!token) {
      //   toast.message("Invalid token, please register");
      // }

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/user/login`,
        loginDetail);

      console.log("res.data.sucecess",res.data.message);
      
      if (!res.data.success) {
        toast.message(res.data.message);
      }

      console.log("res after login: ", res);

      setToken(res.data?.token);
      setUser(res.data?.user);

      localStorage.setItem("token", res.data?.token);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          email: res.data?.user?.email,
        })
      );

      toast.message(res.data.message as string);
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setToken("");
      setUser(null);

      localStorage.removeItem("token");
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
