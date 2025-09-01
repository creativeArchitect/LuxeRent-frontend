import { Search, Filter, Star, Sparkles, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const featuredItems = [
    {
      id: 1,
      brand: 'Sabyasachi',
      name: 'Designer Lehenga',
      category: 'Traditional',
      price: 500,
      rating: 4.8,
      status: 'Available',
      image: '/api/placeholder/300/400',
      bgColor: 'bg-blue-600'
    },
    {
      id: 2,
      brand: 'Hugo Boss',
      name: 'Tuxedo Suit',
      category: 'Formal',
      price: 800,
      rating: 4.9,
      status: 'Rented',
      image: '/api/placeholder/300/400',
      bgColor: 'bg-gray-900'
    },
    {
      id: 3,
      brand: 'Versace',
      name: 'Cocktail Dress',
      category: 'Party',
      price: 350,
      rating: 4.7,
      status: 'Available',
      image: '/api/placeholder/300/400',
      bgColor: 'bg-green-600'
    },
    {
      id: 4,
      brand: 'Zara',
      name: 'Casual Blazer',
      category: 'Casual',
      price: 200,
      rating: 4.5,
      status: 'Available',
      image: '/api/placeholder/300/400',
      bgColor: 'bg-navy-900'
    }
  ];

  const getStatusStyle = (status) => {
    if (status === 'Available') return 'bg-green-500 text-white';
    if (status === 'Rented') return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };

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
                <Search className="w-4 h-4" />
                <span>Browse Clothes</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Filter className="w-4 h-4" />
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Premium Clothing
              </h1>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Rental Experience
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Discover luxury fashion from top designers. Rent premium clothing for
              special occasions at a fraction of the cost.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Premium Brands</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Professional Cleaning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Fast Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, brand, or description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Categories</option>
                  <option>Traditional</option>
                  <option>Formal</option>
                  <option>Party</option>
                  <option>Casual</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
              
              <div className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm font-medium">
                3 of 4 available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Featured Collection</h3>
            <p className="text-gray-600">Discover our premium clothing collection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Status Badge */}
                <div className="relative">
                  <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                    {item.category}
                  </div>
                  
                  {/* Image Placeholder */}
                  <div className={`h-64 ${item.bgColor} flex items-center justify-center text-white`}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">👗</div>
                      <div className="text-sm opacity-75">{item.name}</div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">{item.brand}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{item.name}</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                      <span className="text-sm text-gray-500 ml-1">/day</span>
                    </div>
                    
                    {item.status === 'Available' ? (
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                        Rent Now
                      </button>
                    ) : (
                      <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg font-medium cursor-not-allowed">
                        Not Available
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Toast Notification */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm">✓</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">Welcome back!</p>
            <p className="text-sm text-gray-600">You have been logged in successfully.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;