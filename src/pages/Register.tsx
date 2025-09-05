import { useState } from "react";
import { User, Mail, Lock, Users, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Role } from "../types/UserType";
import { useAuth } from "../context/authContext";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user"
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<Role>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      role: accountType as Role
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role as Role
      })

      console.log(localStorage.getItem("auth"));
      console.log(localStorage.getItem("token"));

      navigate("/home");

      toast.success("User registered successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error registering user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign up to start renting premium clothing
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* First Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4 mr-2" />
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <User className="w-4 h-4 mr-2" />
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min. 6 characters)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              required
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Account Type</label>
            <div className="grid grid-cols-2 gap-3">
          {/* Customer */}
          <div 
                onClick={() => setAccountType('user')}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  accountType === 'user'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                <div className="text-center">
                  <Users className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <h3 className="font-medium text-gray-900">Customer</h3>
                  <p className="text-xs text-gray-500">Rent premium clothes</p>
                </div>
              </div>

          {/* Admin */}
          <div 
                onClick={() => setAccountType('admin')}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  accountType === 'admin'
                    ? 'border-amber-600 bg-gray-50'
                    : 'border-gray-300 hover:bg-gray-100 hover:border-amber-600'
                }`}
              >
                <div className="text-center">
                  <Crown className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <h3 className="font-medium text-gray-900">Admin</h3>
                  <p className="text-xs text-gray-500">Manage platform</p>
                </div>
              </div>
          </div>
          </div>

          {/* Create Account */}
          <button
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors hover:cursor-pointer"
            name="submit"
            onClick={handleSubmit}
          >
            Create Account
          </button>

          {/* Sign In */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              className="text-gray-900 font-medium hover:underline hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
