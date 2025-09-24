import { Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import type { LoginDetailsType } from "../types/User";

const Login = () => {
    const [formData, setFormData] = useState<LoginDetailsType>({
      email: "",
      password: ""
    })
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    const handleLogin = async (e: React.FormEvent)=> {
      e.preventDefault();
      login(formData);
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-14 w-14 rounded-xl bg-yellow-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">👕</span>
          </div>
          <h1 className="text-2xl font-bold mt-2">LuxeRent</h1>
          <p className="text-gray-500 text-sm">
            Join the premium clothing rental platform
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <input
              type="email"
              value={formData.email}
              name="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <input
              type="password"
              name="password"
              placeholder="Create a password (min. 6 characters)"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none"
              onChange={handleChange}
            />
          </div>


          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md shadow-sm hover:bg-gray-800 transition hover:cursor-pointer" onClick={handleLogin}
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-yellow-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;