import { Search, Plus, Package, Star, Edit, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import type { Cloth } from "../types/Cloth";
import axios from "axios";

export default function ManageClothes() {
  const inventory = [
    {
      id: 1,
      image: "/designer-lehenga.jpg",
      title: "Designer Lehenga",
      description:
        "Exquisite handcrafted lehenga with intricate embroidery perfect for weddings and special occasions.",
      category: "Traditional",
      brand: "Sabyasachi",
      price: "₹500",
      rating: 4.8,
      status: "Available",
      sizes: ["S", "M", "L"],
    },
    {
      id: 2,
      image: "/tuxedo-suit.jpg",
      title: "Tuxedo Suit",
      description:
        "Premium black tuxedo suit for formal events and black-tie occasions.",
      category: "Formal",
      brand: "Hugo Boss",
      price: "₹800",
      rating: 4.9,
      status: "Rented",
      sizes: ["M", "L", "XL"],
    },
    {
      id: 3,
      image: "/cocktail-dress.jpg",
      title: "Cocktail Dress",
      description:
        "Elegant cocktail dress perfect for evening parties and social gatherings.",
      category: "Party",
      brand: "Versace",
      price: "₹350",
      rating: 4.7,
      status: "Available",
      sizes: ["XS", "S", "M"],
    },
    {
      id: 4,
      image: "/casual-blazer.jpg",
      title: "Casual Blazer",
      description: "Stylish casual blazer for everyday professional wear.",
      category: "Casual",
      brand: "Zara",
      price: "₹200",
      rating: 4.5,
      status: "Available",
      sizes: ["S", "M", "L", "XL"],
    },
  ];

  const [clothesInventory, setClothesInventory] = useState<Cloth[]>([]);
  const [clothes, setClothes] = useState<Cloth[]>([]);
  const token = localStorage.getItem("token");

  const [searchInput, setSearchInput] = useState<string>("");

  const fetchAllClothes = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/cloth/all`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setClothesInventory(response.data.clothes);
    setClothes(response.data.clothes);
  };

  useEffect(() => {
    fetchAllClothes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);

    if (input.trim() === "") {
      setClothesInventory(clothes);
    } else {
      const filtered = clothes.filter((c) =>
        c.name.toLowerCase().includes(input) ||
        c.brand.toLowerCase().includes(input) ||
        c.category.toLowerCase().includes(input)
      );
      setClothesInventory(filtered);
    }  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="px-6 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Clothes</h1>
          <p className="text-gray-600">
            Add, edit, and manage your clothing inventory
          </p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800">
          <Plus className="w-4 h-4" />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Search + Stats */}
      <div className="px-6">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
          {/* Search */}
          <div className="flex items-center w-full max-w-md bg-gray-50 border border-black/10 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clothes by title, brand, or category..."
              className="bg-transparent w-full px-2 text-sm outline-none"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* Inventory Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span className="flex items-center space-x-1 bg-gray-500/10 px-2 py-1 rounded-sm shadow-xs">
              <Package className="w-4 h-4" />
              <span>Total: 4</span>
            </span>
            <span className="flex items-center space-x-1 text-green-600 bg-green-500/10 px-2 py-1 rounded-sm shadow-xs">
              <span>✔</span>
              <span>Available: 3</span>
            </span>
            <span className="flex items-center space-x-1 text-red-600 bg-red-500/10 px-2 py-1 rounded-sm shadow-xs">
              <span>✘</span>
              <span>Rented: 1</span>
            </span>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 flex items-center space-x-2 font-semibold text-lg">
            <Package className="w-5 h-5" />
            <span>Inventory (4 items)</span>
          </div>
          <div className="flex flex-col gap-2 px-4">
            {clothesInventory.length > 0 &&
              clothesInventory.map((item) => (
                <div
                  key={item._id}
                  className="p-4 flex items-center justify-between rounded-lg shadow-xs border border-black/10 text-sm bg-gray-300/10"
                >
                  {/* Item */}
                  <div className="flex items-center space-x-4 w-1/3 ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-xs truncate max-w-[200px]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="w-1/12">
                    <span className="text-xs bg-gray-500/10 px-2 py-1 rounded-sm shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Brand */}
                  <div className="font-medium w-1/12 text-gray-600">
                    {item.brand}
                  </div>

                  {/* Price */}
                  <div className="w-1/12 font-medium text-gray-500">
                    {item.pricePerDay}
                  </div>

                  {/* Rating */}
                  {/* <div className="w-1/12 flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" />
                  <span>{item.rating}</span>
                </div> */}

                  {/* Status */}
                  <div className="w-1/12">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.available === true
                          ? "bg-green-500/10 px-2 py-1 rounded-sm shadow-xs text-green-700"
                          : "bg-red-500/10 px-2 py-1 rounded-sm shadow-xs text-red-700"
                      }`}
                    >
                      {item.available ? "Available" : "Rented"}
                    </span>
                  </div>

                  {/* Sizes */}
                  <div className="w-1/6 flex flex-wrap gap-2">
                    <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-md">
                      {item.size}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3 w-1/12 justify-end">
                    <button className="text-gray-600 hover:text-black">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
