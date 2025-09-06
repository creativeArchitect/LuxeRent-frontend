import { User, Mail, Lock, UserCircle, Crown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RegisterDetailsType } from "../types/User";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const [formData, setFormData] = useState<RegisterDetailsType>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user"
    });
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const { register } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setFormData({
            ...formData,
            [e.target.name]: [e.target.value]
        })
    }

    const handleRegister = async ()=> {
        register(formData);
        navigate('/home');
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
          {/* First Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter your first name"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none" onChange={handleChange}
            />
          </div>
          {/* Last Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter your last name"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none" onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none" onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Create a password (min. 6 characters)"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 outline-none" onChange={handleChange}
            />
          </div>

          {/* Account Type */}
          <div>
            <p className="text-sm font-medium mb-2">Account Type</p>
            <div className="flex gap-3">
              <button
                type="button"
                className={`flex-1 border border-gray-300 rounded-lg p-3 flex flex-col items-center cursor-pointer ${role === 'user' && 'border-yellow-500 bg-yellow-50'}`}
               onClick={()=> setRole('user')}>
                <UserCircle className="h-6 w-6 mb-1" />
                <span className="font-medium">User</span>
                <span className="text-xs text-gray-500">Rent premium clothes</span>
              </button>

              <button
                type="button"
                className={`flex-1 border border-gray-300 rounded-lg p-3 flex flex-col items-center cursor-pointer ${role === 'admin' && 'border-yellow-500 bg-yellow-50'}`} onClick={()=> setRole('admin')}
              >
                <Crown className="h-6 w-6 mb-1" />
                <span className="font-medium">Admin</span>
                <span className="text-xs text-gray-500">Manage platform</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md shadow-sm hover:bg-gray-800 transition hover:cursor-pointer" onClick={handleRegister}
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;