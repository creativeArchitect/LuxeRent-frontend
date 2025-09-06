import { Search, Filter, User, LogOut, Star } from "lucide-react";

const clothes = [
  {
    id: 1,
    name: "Designer Lehenga",
    brand: "Sabyasachi",
    price: 500,
    available: true,
    rating: 4.8,
    tag: "Traditional",
    img: "https://via.placeholder.com/200x250.png?text=Lehenga",
  },
  {
    id: 2,
    name: "Tuxedo Suit",
    brand: "Hugo Boss",
    price: 800,
    available: false,
    rating: 4.9,
    tag: "Formal",
    img: "https://via.placeholder.com/200x250.png?text=Tuxedo",
  },
  {
    id: 3,
    name: "Cocktail Dress",
    brand: "Versace",
    price: 350,
    available: true,
    rating: 4.7,
    tag: "Party",
    img: "https://via.placeholder.com/200x250.png?text=Dress",
  },
  {
    id: 4,
    name: "Casual Blazer",
    brand: "Zara",
    price: 400,
    available: true,
    rating: 4.5,
    tag: "Casual",
    img: "https://via.placeholder.com/200x250.png?text=Blazer",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-yellow-500 flex items-center justify-center">
            <span className="text-lg font-bold text-white">👕</span>
          </div>
          <span className="text-lg font-bold">LuxeRent</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          <a href="#">Browse Clothes</a>
          <a href="#">My Rentals</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <User className="h-5 w-5" />
            <div className="text-sm">
              <p className="font-medium">John Customer</p>
              <p className="text-xs text-gray-500">Customer</p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-gray-600 hover:text-black">
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          ✨ Premium Clothing Rental Experience
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Discover luxury fashion from top designers. Rent premium clothing for
          special occasions at a fraction of the cost.
        </p>
        <div className="flex justify-center gap-6 mt-6 text-sm text-yellow-300">
          <span>Premium Brands</span> <span className="animate-pulse">•</span> <span>Professional Cleaning</span> <span className="animate-pulse">•</span>{" "}
          <span>Fast Delivery</span>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
          <div className="flex items-center flex-1">
            <Search className="h-5 w-5 text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Search by name, brand, or description..."
              className="w-full px-3 py-2 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 border rounded-lg px-3 py-2 hover:bg-gray-50">
            <Filter className="h-4 w-4" /> All Categories
          </button>
          <div className="bg-yellow-500 text-white text-sm px-3 py-2 rounded-lg">
            3 of 4 available
          </div>
        </div>
      </div>

      {/* Featured Collection */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold mb-2">Featured Collection</h2>
        <p className="text-gray-500 mb-6">
          Discover our premium clothing collection
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {clothes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-lg"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-md font-medium ${
                    item.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.available ? "Available" : "Rented"}
                </span>
                <span className="absolute top-2 right-2 px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700 font-medium">
                  {item.tag}
                </span>
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-500">{item.brand}</p>
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <Star className="h-4 w-4 fill-yellow-500" /> {item.rating}
                </div>
                <p className="font-bold mt-1">₹{item.price} <span className="text-sm text-gray-500">/day</span></p>
                <button
                  disabled={!item.available}
                  className={`mt-2 w-full py-2 rounded-lg text-sm font-medium transition ${
                    item.available
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {item.available ? "Rent Now" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;