import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, User, Mail, Lock, Users, Crown } from 'lucide-react';

const LuxeRentSignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('customer');

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
          <p className="text-gray-600 text-sm">Join the premium clothing rental platform</p>
        </motion.div>

        {/* Create Account Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border p-8 mb-6"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600 text-sm">Sign up to start renting premium clothing</p>
          </div>

          {/* Sign Up Form */}
          <div className="space-y-5">
            
            {/* Full Name Field */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

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
                placeholder="Create a password (min. 6 characters)"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Account Type Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                
                {/* Customer Option */}
                <div 
                  onClick={() => setAccountType('customer')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    accountType === 'customer' 
                      ? 'border-slate-800 bg-slate-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <h3 className="font-medium text-gray-900 mb-1">Customer</h3>
                    <p className="text-xs text-gray-600">Rent premium clothes</p>
                  </div>
                </div>

                {/* Admin Option */}
                <div 
                  onClick={() => setAccountType('admin')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    accountType === 'admin' 
                      ? 'border-slate-800 bg-slate-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <Crown className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <h3 className="font-medium text-gray-900 mb-1">Admin</h3>
                    <p className="text-xs text-gray-600">Manage platform</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Create Account Button */}
            <button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 mt-6">
              Create Account
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <button className="text-slate-800 hover:text-slate-900 font-medium">
                Sign in
              </button>
            </p>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LuxeRentSignUp;