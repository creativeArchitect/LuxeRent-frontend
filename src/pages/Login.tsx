import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Mail, Lock } from 'lucide-react';

const LuxeRentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Logo and Brand */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-xl mb-4">
            <CheckSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">LuxeRent</h1>
          <p className="text-gray-600 text-sm">Premium clothing rental platform</p>
        </motion.div>

        {/* Welcome Back Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm">Sign in to your account to continue</p>
        </motion.div>

        {/* Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          
          {/* Email Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button className="text-slate-800 hover:text-slate-900 font-medium">
              Sign up
            </button>
          </p>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-4 bg-gray-100 rounded-lg border"
        >
          <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="font-medium text-gray-700 mr-1">Admin:</span>
              <span className="text-gray-600">admin@example.com</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-gray-700 mr-1">Customer:</span>
              <span className="text-gray-600">customer@example.com</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-gray-700 mr-1">Password:</span>
              <span className="text-gray-600">Any password</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LuxeRentLogin;