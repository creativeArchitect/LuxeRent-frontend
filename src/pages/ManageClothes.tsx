import { Search, Plus, Package, Star, Edit, Trash2 } from "lucide-react";

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
      description:
        "Stylish casual blazer for everyday professional wear.",
      category: "Casual",
      brand: "Zara",
      price: "₹200",
      rating: 4.5,
      status: "Available",
      sizes: ["S", "M", "L", "XL"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center text-white font-bold">
            L
          </div>
          <span className="text-xl font-bold">LuxeRent</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-gray-700">
          <a href="#" className="hover:text-black">
            Dashboard
          </a>
          <a href="#" className="hover:text-black">
            Manage Clothes
          </a>
          <a href="#" className="hover:text-black">
            Manage Rentals
          </a>
        </nav>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
            <div>
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
          <button className="flex items-center space-x-1 text-gray-700 hover:text-black">
            <span>Logout</span>
          </button>
        </div>
      </header>

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
          <div className="flex items-center w-full max-w-md bg-gray-50 border rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clothes by title, brand, or category..."
              className="bg-transparent w-full px-2 text-sm outline-none"
            />
          </div>
          {/* Inventory Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <Package className="w-4 h-4" />
              <span>Total: 4</span>
            </span>
            <span className="flex items-center space-x-1 text-green-600">
              <span>✔</span>
              <span>Available: 3</span>
            </span>
            <span className="flex items-center space-x-1 text-red-600">
              <span>✘</span>
              <span>Rented: 1</span>
            </span>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center space-x-2 font-semibold text-lg">
            <Package className="w-5 h-5" />
            <span>Inventory (4 items)</span>
          </div>
          <div className="divide-y">
            {inventory.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between text-sm"
              >
                {/* Item */}
                <div className="flex items-center space-x-4 w-1/3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500 text-xs truncate max-w-[200px]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="w-1/12">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                    {item.category}
                  </span>
                </div>

                {/* Brand */}
                <div className="w-1/12 font-medium">{item.brand}</div>

                {/* Price */}
                <div className="w-1/12 font-medium">{item.price}</div>

                {/* Rating */}
                <div className="w-1/12 flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500" />
                  <span>{item.rating}</span>
                </div>

                {/* Status */}
                <div className="w-1/12">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Sizes */}
                <div className="w-1/6 flex flex-wrap gap-2">
                  {item.sizes.map((size, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-md"
                    >
                      {size}
                    </span>
                  ))}
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
