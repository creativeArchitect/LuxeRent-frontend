import { Search, Filter, Star } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { Cloth, ClothesType } from "../types/ClothesType";

const Home = () => {
  const featuredItems = [
    {
      id: 1,
      brand: "Sabyasachi",
      name: "Designer Lehenga",
      category: "Traditional",
      price: 500,
      rating: 4.8,
      status: "Available",
      image: "/images/lehenga.jpg",
    },
    {
      id: 2,
      brand: "Hugo Boss",
      name: "Tuxedo Suit",
      category: "Formal",
      price: 800,
      rating: 4.9,
      status: "Rented",
      image: "/images/tuxedo.jpg",
    },
    {
      id: 3,
      brand: "Versace",
      name: "Cocktail Dress",
      category: "Party",
      price: 350,
      rating: 4.7,
      status: "Available",
      image: "/images/cocktail.jpg",
    },
    {
      id: 4,
      brand: "Zara",
      name: "Casual Blazer",
      category: "Casual",
      price: 200,
      rating: 4.5,
      status: "Available",
      image: "/images/blazer.jpg",
    },
  ];

  const navigate = useNavigate();
  const [clothes, setClothes] = useState<ClothesType>();

  const handleFilter = async (e: React.ChangeEvent<HTMLSelectElement>)=> {
    const filterValue = e.target.value;
    setClothes(clothes.filter((cloth: Cloth)=> cloth.category === filterValue))
  }

  const getStatusStyle = (status: string) => {
    if (status === "Available") return "rounded-sm bg-green-500/10 text-green-500";
    if (status === "Rented") return "rounded-sm bg-red-500/10 text-red-500";
    return "bg-neutral-500/10 text-neutral-500";
  };


  // useEffect(()=> {
  //   const getClothes = async ()=> {
  //     try{
  //       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/all`)
  
  //       if(!res.data.success){
  //         toast.error("Error in fetching clothes.");
  //         return 
  //       }
  
  //       console.log("res.data: ", res.data);
  //       setClothes(res.data);
  //     }catch(err){
  //       toast.error("Error in fetching clothes.");
  //       return
  //     }
  //   }
  //   getClothes()

  //   const interval = setInterval(getClothes, 5000);

  //   return ()=> clearInterval(interval);
  // }, [])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto text-center px-4">
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              Premium Clothing
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Rental Experience
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover luxury fashion from top designers. Rent premium clothing
              for special occasions at a fraction of the cost.
            </p>
            <div className="flex justify-center gap-6 text-sm md:text-base">
              {["Premium Brands", "Professional Cleaning", "Fast Delivery"].map(
                (feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="bg-white py-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 px-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, brand, or description..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500">
                <option>All Categories</option>
                <option>Traditional</option>
                <option>Formal</option>
                <option>Party</option>
                <option>Casual</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            {/* <div className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
              3 of 4 available
            </div> */}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Collection
          </h3>
          <p className="text-gray-600 mb-8">
            Discover our premium clothing collection
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div
                    className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </div>
                  {/* <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {item.category}
                  </div> */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-64 w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{item.brand}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {item.name}
                  </h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{item.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/day</span>
                    </div>
                    {item.status === "Available" ? (
                      <button className="bg-neutral-900 text-white px-4 py-2 rounded-md font-medium hover:bg-neutral-700 hover:cursor-pointer" onClick={()=> navigate('/cloth')}>
                        Rent Now
                      </button>
                    ) : (
                      <button
                        disabled
                        className="text-neutral-500 border border-black/20 px-2 py-1.5 rounded-md font-medium cursor-not-allowed"
                      >
                        Not Available
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
