import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Cloth } from "../types/Cloth";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState<Cloth[]>([]);
  const token = `Bearer ${localStorage.getItem("token")}`;
  const [totalPages, settotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const limit = 8;

  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/cloth/all?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      settotalPages(response.data.totalPages);

      if (page === 1) {
        setItems(response.data.clothes);
      } else {
        setItems((prevItems) => [...prevItems, ...response.data.clothes]);
      }
    } catch (error) {
      console.error("Error fetching clothes:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20 px-2 text-center">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          ✨ <span className="text-yellow-500">Premium</span> Clothing Rental
          Experience
        </h1>
        <p className="text-gray-200 text-xl max-w-3xl mx-auto leading-relaxed">
          Discover <span className="text-yellow-400">luxury fashion</span> from
          top designers. Rent premium clothing for special occasions at a
          fraction of the cost.
        </p>
        <div className="flex items-center justify-center gap-8 mt-6 text-sm font-semibold text-yellow-400">
          <span className="animate-pulse">Premium Brands</span>
          <span className="animate-pulse">Professional Cleaning</span>
          <span className="animate-pulse">Fast Delivery</span>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="max-w-6xl mx-auto px-2 -mt-12">
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <div className="flex items-center flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, brand, or description..."
              className="w-full px-3 py-1 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-md px-4 py-2 bg-yellow-500 text-white hover:bg-yellow-400 transition duration-150 ease-in-out">
            <IoSearchOutline size={20} /> Search
          </button>
        </div>
      </div>

      {/* Featured Collection */}
      <section className="max-w-6xl mx-auto px-2 py-10">
        <h2 className="text-2xl font-bold mb-4">Featured Collection</h2>
        <p className="text-gray-500 mb-8 max-w-3xl">
          Discover our premium clothing collection
        </p>

        <div className="flex flex-col justify-center gap-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {items.map((item) => (
              <div
                key={item?._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
              >
                <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                  <span
                    className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-md font-medium ${
                      item.available
                        ? "bg-green-200 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.available ? "Available" : "Rented"}
                  </span>
                </div>

                <div className="mt-4 flex-grow px-3">
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <h3 className="font-semibold text-lg mt-1">{item.name}</h3>
                  <p className="font-bold mt-2 text-xl">
                    ₹{item.pricePerDay}{" "}
                    <span className="text-sm text-gray-500 font-normal">
                      /day
                    </span>
                  </p>
                </div>

                <div className="flex gap-3 px-3 py-3">
                  <button
                    disabled={!item.available}
                    className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition ${
                      item.available
                        ? "bg-gray-900 text-white hover:bg-gray-800 hover:cursor-pointer"
                        : "bg-gray-200 text-gray-500"
                    }`}
                    onClick={()=> {
                      const id: string = item._id;
                      item.available && navigate(`/cloth/${id}`)
                    }}
                  >
                    {item.available ? "Rent Now" : "Not Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            className={`self-center px-6 py-3 rounded-md transition duration-150 ease-in-out ${
              totalPages <= page
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-400 cursor-pointer"
            }`}
            onClick={() => {
              setPage((curr) => curr + 1);
            }}
            disabled={page >= totalPages}
          >
            {page >= totalPages ? "No More Items" : "Load More"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
