import { motion } from 'framer-motion';
import { Shield, Truck, Star, CheckSquare, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background overlay for texture */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        
        {/* Logo/Icon */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-2xl mb-6">
            <CheckSquare className="w-10 h-10 text-slate-900" />
          </div>
        </motion.div>

        {/* Brand name with sparkle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <Sparkles className="w-8 h-8 text-amber-400" />
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            LuxeRent
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Rent premium designer clothing for special occasions. Look stunning without the commitment.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors duration-200 text-lg">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-200 text-lg backdrop-blur-sm border border-white/20">
            Learn More
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {/* Premium Quality */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-2xl mb-6 group-hover:bg-amber-500/30 transition-colors duration-300">
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Premium Quality</h3>
            <p className="text-slate-400 leading-relaxed">
              Designer brands with full damage protection
            </p>
          </div>

          {/* Fast Delivery */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-2xl mb-6 group-hover:bg-amber-500/30 transition-colors duration-300">
              <Truck className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Fast Delivery</h3>
            <p className="text-slate-400 leading-relaxed">
              Same day delivery in metro cities
            </p>
          </div>

          {/* 5-Star Service */}
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-2xl mb-6 group-hover:bg-amber-500/30 transition-colors duration-300">
              <Star className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">5-Star Service</h3>
            <p className="text-slate-400 leading-relaxed">
              Professional cleaning and 24/7 support
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-1 h-1 bg-amber-300 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-amber-500 rounded-full opacity-30 animate-pulse delay-500"></div>
    </div>
  );
};

export default Hero;