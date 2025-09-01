import { Star, Calendar, Shield, Truck, RotateCcw, Clock } from "lucide-react";
import { motion, useAnimateMini } from "framer-motion";
import Navbar from "../components/Navbar";
import { BsArrowLeft, BsBag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const Cloth = (price: number) => {
  const navigte = useNavigate();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [totalDays, setTotalDays] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);

  const calculatePaidAmount = () => {
    if(startDate && endDate){
      const start = new Date(startDate)
      const end = new Date(endDate)

      const diffTime = end.getTime() - start.getTime()
      const diffDays = Math.ceil(diffTime / (24*60*60*1000))

      const days = diffDays > 0 ? diffDays : 0

      setTotalDays(days)
      setPaidAmount(days * price)
  
      console.log("totalDays: ", days)
      console.log("paidAmount: ", days * price)
    }
  };

  const getClothDetail = async (id)=> {
    try{
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${id}`)
    }catch(err){
      toast.error("Error in the fetching cloth details");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-800 hover:bg-gray-500/10 px-4 py-2 rounded-lg hover:cursor-pointer"
          onClick={() => navigte("/Home")}
        >
          <BsArrowLeft size={17} />
          <span className="text-sm font-semibold">Back to Browse</span>
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
              <div className="absolute top-4 right-4 rounded-sm bg-green-500/10 text-green-500 px-3 py-1 text-sm font-medium z-10">
                Available
              </div>

              {/* Full Image */}
              <img
                src="https://www.cdnensemble.xyz/pub/media/catalog/product/cache/391a5e1abf666a8c41861a6cd6227bf9/r/m/rmct-15-1_1.jpg"
                alt="Designer Lehenga"
                className="w-full h-full object-cover"
              />
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
              <div className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-lg shadow-xs border border-black/10">
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
              Exquisite handcrafted lehenga with intricate embroidery perfect
              for weddings and special occasions.
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
                <h3 className="text-xl font-semibold text-gray-900">
                  Select Rental Dates
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    placeholder="dd-mm-yyyy"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    placeholder="dd-mm-yyyy"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Rent Button */}
              <button
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2 hover:cursor-pointer"
                onClick={() => {
                  calculatePaidAmount()
                }}
              >
                <BsBag size={15} />
                <span>Rent Now - {paidAmount}</span>
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
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 hover:cursor-pointer">
            <div className="w-12 h-12 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-neutral-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Insured</h4>
            <p className="text-sm text-gray-600">Full damage protection</p>
          </div>

          {/* Free Delivery */}
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 hover:cursor-pointer">
            <div className="w-12 h-12 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-neutral-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Free Delivery</h4>
            <p className="text-sm text-gray-600">Same day in metro cities</p>
          </div>

          {/* Easy Returns */}
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 hover:cursor-pointer">
            <div className="w-12 h-12 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-neutral-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Easy Returns</h4>
            <p className="text-sm text-gray-600">Hassle-free pickup</p>
          </div>

          {/* 24/7 Support */}
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 hover:cursor-pointer">
            <div className="w-12 h-12 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-neutral-600" />
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
