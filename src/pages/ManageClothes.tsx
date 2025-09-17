import { Search, Plus, Package, Star, Edit, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import React, { useEffect, useMemo, useState } from "react";
import type { Cloth } from "../types/Cloth";
import axios from "axios";
import { toast } from "sonner";
import ClothingItemModal from "../components/clothingItemModal";

export default function ManageClothes() {
  const [clothesInventory, setClothesInventory] = useState<Cloth[]>([]);
  const [clothes, setClothes] = useState<Cloth[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>("");
  const [editClothId, setEditClothId] = useState<string>("");
  const [editFormData, setEditFormData] = useState<Cloth>({
    name: "",
    description: "",
    brand: "",
    category: "", 
    size: "",
    pricePerDay: 0,
    image: "",
    available: true,
  });

  const token = localStorage.getItem("token");

  const fetchAllClothes = async () => {
    try {
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
    } catch (err) {
      toast.error("Error in fetching the clothes");
    }
  };

  const handleDeleteCloth = async (id: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/cloth/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message as string);
      }
    } catch (err) {
      toast.error("Error in deletion of cloth");
    }
  };

  const availableClothes = useMemo<number>(() => {
    let count = 0;
    clothes.map((c) => {
      c.available && ++count;
    });
    return count;
  }, [clothes]);
  const rentedClothes = useMemo<number>(() => {
    let count = 0;
    clothes.map((c) => {
      !c.available && ++count;
    });
    return count;
  }, [clothes]);

  useEffect(() => {
    fetchAllClothes();
    // const interval = setInterval(fetchAllClothes, 5000);

    // return ()=> clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);

    if (input.trim() === "") {
      setClothesInventory(clothes);
    } else {
      const filtered = clothes.filter(
        (c) =>
          c.name.toLowerCase().includes(input) ||
          c.brand.toLowerCase().includes(input) ||
          c.category.toLowerCase().includes(input)
      );
      setClothesInventory(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-20">
        {/* Header Section */}
        <div className="px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Manage Clothes</h1>
            <p className="text-gray-600">
              Add, edit, and manage your clothing inventory
            </p>
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800"
            onClick={() => {
              setOpenModal(true);
              setModalHeading("New New Cloth");
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add New Cloth</span>
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
                <span>Total: {clothes.length}</span>
              </span>
              <span className="flex items-center space-x-1 text-green-600 bg-green-500/10 px-2 py-1 rounded-sm shadow-xs">
                Available: {availableClothes}
              </span>
              <span className="flex items-center space-x-1 text-red-600 bg-red-500/10 px-2 py-1 rounded-sm shadow-xs">
                Rented: {rentedClothes}
              </span>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="px-6 mt-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 flex items-center space-x-2 font-semibold text-lg">
              <Package className="w-5 h-5" />
              <span>Inventory ({clothes.length} clothes)</span>
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
                      <span className="px-2 py-0.5 text-xs bg-yellow-500/10 text-yellow-800 rounded-md shadow-xs">
                        {item.size}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3 w-1/12 justify-end">
                      <button
                        className="text-gray-600 hover:text-black"
                        onClick={() => {
                          setOpenModal(true);
                          setModalHeading("Edit Cloth Details");
                          setEditClothId(item._id as string);
                          setEditFormData(item);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        className="text-gray-600 hover:text-red-600"
                        onClick={() => handleDeleteCloth(item._id as string)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <ClothingItemModal
        id={editClothId}
        editFormData={editFormData}
        heading={modalHeading}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}
