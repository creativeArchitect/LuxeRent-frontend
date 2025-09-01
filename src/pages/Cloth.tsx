import { ArrowLeft, Star, Calendar, Shield, Truck, RotateCcw, Clock, LogOut, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Cloth = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">LuxeRent</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <span>Browse Clothes</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <span>My Rentals</span>
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  J
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">John Customer</div>
                  <div className="text-xs text-gray-500">Customer</div>
                </div>
              </div>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Browse</span>
        </button>
      </div>

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-[3/4] relative">
              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                Available
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded-full text-sm font-medium z-10">
                Traditional
              </div>

              {/* Lehenga Image Representation */}
              <div className="w-full h-full bg-gradient-to-br from-blue-800 via-blue-600 to-blue-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <div className="text-6xl">👘</div>
                  </div>
                  <div className="text-lg font-medium">Designer Lehenga</div>
                  <div className="text-sm opacity-75">Blue & Gold Embroidery</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Brand and Rating */}
            <div className="flex items-center justify-between">
              <span className="text-lg text-gray-600">Sabyasachi</span>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-medium">4.8</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Designer Lehenga
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Exquisite handcrafted lehenga with intricate embroidery perfect for 
              weddings and special occasions.
            </p>

            {/* Price and Size */}
            <div className="flex items-baseline space-x-4">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">₹500</span>
                <span className="text-lg text-gray-500 ml-2">/day</span>
              </div>
              <div className="text-gray-600">
                <span className="font-medium">Sizes:</span> S, M, L
              </div>
            </div>

            {/* Rental Dates Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">Select Rental Dates</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Rent Button */}
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Rent Now - ₹0</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {/* Insured */}
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Insured</h4>
            <p className="text-sm text-gray-600">Full damage protection</p>
          </div>

          {/* Free Delivery */}
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Free Delivery</h4>
            <p className="text-sm text-gray-600">Same day in metro cities</p>
          </div>

          {/* Easy Returns */}
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Easy Returns</h4>
            <p className="text-sm text-gray-600">Hassle-free pickup</p>
          </div>

          {/* 24/7 Support */}
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
            <p className="text-sm text-gray-600">Always here to help</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cloth;