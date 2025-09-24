import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type {
  LoginDetailsType,
  RegisterDetailsType,
  UserType,
} from "../types/User";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type User = UserType | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  register: (userDetail: RegisterDetailsType) => void;
  login: (loginDetail: LoginDetailsType) => void;
  logout: () => void;
};

type JwtDecode = { exp: number };

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const decoded = jwtDecode<JwtDecode>(savedToken);
      const isExpired = decoded.exp*1000 < Date.now();

      if(!isExpired){
        setToken(savedToken);
        setIsAuthenticated(true);
        const savedAuth = localStorage.getItem("auth");
        if (savedAuth) setUser(JSON.parse(savedAuth));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
      }
    }
  }, []);

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
        JSON.stringify({ id: res.data?.id, email: res.data?.user?.email, firstName: res.data?.firstName, lastName: res.data?.lastName })
      );

      if (res.data.success) {
        toast.message(res.data.message as string);
        setIsAuthenticated(true);
        navigate("/home");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || "Registration failed");
      } else {
        toast.error("Error in user registration.");
      }
    }
  };

  const login = async (loginDetail: LoginDetailsType) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/user/login`,
        loginDetail
      );

      setToken(res.data?.token);
      setUser(res.data?.user);

      localStorage.setItem("token", res.data?.token);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          id: res.data?.user?.id, email: res.data?.user?.email, firstName: res.data?.user?.firstName, lastName: res.data?.user?.lastName
        })
      );

      if (res.data.success) {
        toast.message(res.data.message as string);
        setIsAuthenticated(true);
        navigate("/home");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || "login failed");
      } else {
        toast.error("Error in user login.");
      }
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

      if (res.data.success){
        toast.message(res.data.message as string);
      }
      setIsAuthenticated(false);
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message || "logout failed");
      } else {
        toast.error("Error in user logoug.");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
