import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, token } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      login(formData, token);

      console.log(localStorage.getItem("auth"));

      navigate("/home");
      toast.success("User registered successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error logging user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-md border border-gray-100 p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          {/* Email Field */}
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
            />
          </div>

          {/* Password Field */}
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
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            />
          </div>

          {/* Sign In Button */}
          <button
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors hover:cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              className="text-gray-900 font-medium hover:cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
          <p className="font-medium text-gray-900 mb-2">Demo Credentials:</p>
          <p>
            <span className="font-semibold">Admin:</span> admin@example.com
          </p>
          <p>
            <span className="font-semibold">Customer:</span>{" "}
            customer@example.com
          </p>
          <p>
            <span className="font-semibold">Password:</span> Any password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
