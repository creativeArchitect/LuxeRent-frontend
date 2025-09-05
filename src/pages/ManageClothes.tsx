import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Star,
  BarChart3,
  Shirt,
  List,
  LogOut,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import AddClothingModal from "../components/ItemModal";
import axios from "axios";
import type { ModalDataType } from "../types/ModalType";
import { toast } from "sonner";
import type { ClothesType } from "../types/ClothesType";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { useAuth } from "../context/authContext";

const ManageClothes: React.FC = () => {
  // const [inventoryItems, setInventoryItems] = useState<ClothesType>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  const inventoryItems = [
    {
      id: 1,
      name: "Designer Lehenga",
      description:
        "Exquisite handcrafted lehenga with intricate embroidery perfect...",
      category: "Traditional",
      brand: "Sabyasachi",
      price: 500,
      // rating: 4.8,
      status: "Available",
      sizes: ["S", "M", "L"],
      image: "👘",
    },
    {
      id: 2,
      name: "Tuxedo Suit",
      description: "Premium black tuxedo suit for formal events and black-tie...",
      category: "Formal",
      brand: "Hugo Boss",
      price: 800,
      // rating: 4.9,
      status: "Rented",
      sizes: ["M", "L", "XL"],
      image: "🤵",
    },
    {
      id: 3,
      name: "Cocktail Dress",
      description:
        "Elegant cocktail dress perfect for evening parties and social...",
      category: "Party",
      brand: "Versace",
      price: 350,
      // rating: 4.7,
      status: "Available",
      sizes: ["XS", "S", "M"],
      image: "👗",
    },
    {
      id: 4,
      name: "Casual Blazer",
      description: "Stylish casual blazer for everyday professional wear.",
      category: "Casual",
      brand: "Zara",
      price: 200,
      // rating: 4.5,
      status: "Available",
      sizes: ["S", "M", "L", "XL"],
      image: "🧥",
    },
  ];

  const getStatusStyle = (status: string) => {
    if (status === "Available") return "rounded-sm bg-green-500/10 text-green-500";
    if (status === "Rented") return "bg-red-500/10 text-red-500 rounded-sm";
    return "bg-gray-500 text-gray-500 rounded-sm";
  };

  const getSizeStyle = (size: string) => {
    const baseStyle =
      "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap";
    const colors: Record<string, string> = {
      XS: "bg-purple-100 text-purple-800",
      S: "bg-yellow-100 text-yellow-800",
      M: "bg-blue-100 text-blue-800",
      L: "bg-green-100 text-green-800",
      XL: "bg-red-100 text-red-800",
    };
    return `${baseStyle} ${colors[size] || "bg-gray-100 text-gray-800"}`;
  };


  useEffect(()=> {
    const fetchClothes = async ()=> {
      const token = localStorage.getItem('token');
      try{
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/order/all`,{ 
          headers: { Authorization: `Bearer ${token}` } 
        });

        console.log(res.data.clothes);

        // setInventoryItems(res.data.clothes);
  
      }catch(err: any){
        toast.error(err.response?.data?.message || "Error fetching clothes");
      }
    }
    fetchClothes()

    const interval = setInterval(fetchClothes, 5000);

    return ()=> clearInterval(interval);
  }, []);


  const handleSubmitModal = async (formData: ModalDataType)=> {
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/cloth/`, formData);

      if (!res.data.success) {
        toast.error(res.data.message || "Registration failed.");
      }

      console.log("res after login user: ", res);

      toast.success("User registered successfully!");
    }catch(err: any){
      toast.error(err.response?.data?.message || "Error logging user.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Manage Clothes
            </h1>
            <p className="text-gray-600">
              Add, edit, and manage your clothing inventory
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 md:mt-0 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors hover: cursor-pointer" onClick={ ()=> setOpenModal(true) }
          >
            <Plus className="w-5 h-5" />
            <span>Add New Item</span>
          </motion.button>
        </div>

        <AddClothingModal isOpen={openModal} onClose={()=> setOpenModal(false)} onSubmit={handleSubmitModal} />

        {/* Search Bar and Stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clothes by title, brand, or category..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <span className="font-medium">Total: {inventoryItems.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium">
                Available: {inventoryItems.filter((i) => i.status === "Available").length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="font-medium">
                Rented: {inventoryItems.filter((i) => i.status === "Rented").length}
              </span>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">
                  <AiOutlineCodeSandbox color="black" size={22  } />
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Inventory ({inventoryItems.length} items)
              </h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price/Day
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sizes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryItems.map((item, index) => (
                  <tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Item Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white text-xl`}
                        >
                          {item.image}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {item.category}
                      </span>
                    </td>

                    {/* Brand */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {item.brand}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        ₹{item.price}
                      </span>
                    </td>

                    {/* Rating */}
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-900">
                          {item.rating}
                        </span>
                      </div>
                    </td> */}

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1.5 text-xs font-semibold rounded-sm ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Sizes */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {item.sizes.map((size) => (
                          <span key={size} className={getSizeStyle(size)}>
                            {size}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClothes;
