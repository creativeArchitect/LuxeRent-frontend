import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  LogOut, 
  BarChart3, 
  Settings, 
  Calendar,
  TrendingUp,
  IndianRupee,
  Clock,
  Users,
  Package,
  CheckCircle,
  AlertTriangle,
  Eye
} from 'lucide-react';

const Dashboard = () => {
  const [showWelcomeToast, setShowWelcomeToast] = useState(true);

  // Sample data
  const statsCards = [
    {
      icon: IndianRupee,
      title: 'Total Revenue',
      value: '₹2,700',
      subtitle: 'All time earnings',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      icon: Clock,
      title: 'Active Rentals',
      value: '1',
      subtitle: 'Currently ongoing',
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      icon: Users,
      title: 'Total Customers',
      value: '1',
      subtitle: 'Unique customers',
      change: '+8.1%',
      changeType: 'positive'
    },
    {
      icon: Package,
      title: 'Inventory',
      value: '3/4',
      subtitle: '25.0% utilization',
      change: '1',
      changeType: 'warning'
    }
  ];

  const revenueData = [
    { month: 'Jan', value: 2500 },
    { month: 'Feb', value: 3200 },
    { month: 'Mar', value: 2900 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 5200 },
    { month: 'Jun', value: 4800 }
  ];

  const categoryData = [
    { name: 'Traditional', value: 2000, count: 1 },
    { name: 'Formal', value: 0, count: 0 },
    { name: 'Party', value: 700, count: 1 },
    { name: 'Casual', value: 0, count: 0 }
  ];

  const rentalStatus = [
    { status: 'Completed', count: 1, color: 'bg-green-100 text-green-800' },
    { status: 'Ongoing', count: 1, color: 'bg-yellow-100 text-yellow-800' },
    { status: 'Late Returns', count: 0, color: 'bg-red-100 text-red-800' }
  ];

  const recentActivity = [
    { 
      customer: 'John Customer',
      action: 'rented Designer Lehenga',
      status: 'ongoing',
      statusColor: 'text-yellow-600'
    },
    {
      customer: 'John Customer', 
      action: 'rented Cocktail Dress',
      status: 'returned',
      statusColor: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Toast */}
      {showWelcomeToast && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg max-w-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">Welcome back!</div>
              <div className="text-sm opacity-90">You have been logged in successfully.</div>
            </div>
            <button 
              onClick={() => setShowWelcomeToast(false)}
              className="ml-2 text-white hover:bg-green-600 rounded p-1"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">LuxeRent</span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="flex items-center text-gray-900 font-medium">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Settings className="w-4 h-4 mr-2" />
              Manage Clothes
            </button>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Calendar className="w-4 h-4 mr-2" />
              Manage Rentals
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-900">Admin User</div>
              <div className="text-xs text-gray-600">Admin</div>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
            <button className="text-gray-600 hover:text-gray-900">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your rental business today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                    stat.changeType === 'warning' ? 'bg-gray-100' : 'bg-green-100'
                  }`}>
                    <stat.icon className={`w-6 h-6 ${
                      stat.changeType === 'warning' ? 'text-gray-600' : 'text-green-600'
                    }`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{stat.title}</div>
                  <div className="text-xs text-gray-600">{stat.subtitle}</div>
                </div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  stat.changeType === 'positive' ? 'bg-amber-100 text-amber-800' :
                  stat.changeType === 'warning' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {revenueData.map((item, index) => (
                <div key={item.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-slate-800 rounded-t"
                    style={{ height: `${(item.value / 6000) * 200}px`, minHeight: '4px' }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-2">{item.month}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center mb-6">
              <Eye className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
            </div>
            <div className="h-64 flex items-end justify-between space-x-4">
              {categoryData.map((category, index) => (
                <div key={category.name} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-slate-800 rounded-t"
                    style={{ height: `${category.value > 0 ? (category.value / 2000) * 200 : 4}px`, minHeight: '4px' }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-2 text-center">{category.name}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rental Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center mb-6">
              <Package className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Rental Status</h3>
            </div>
            <div className="space-y-4">
              {rentalStatus.map((item, index) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {item.status === 'Completed' && <CheckCircle className="w-5 h-5 text-green-500 mr-3" />}
                    {item.status === 'Ongoing' && <Clock className="w-5 h-5 text-yellow-500 mr-3" />}
                    {item.status === 'Late Returns' && <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />}
                    <span className="text-gray-900 font-medium">{item.status}</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${item.color}`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Distribution</h3>
            <div className="flex items-center justify-center mb-6">
              <div className="w-32 h-32 rounded-full border-8 border-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-xs text-gray-600">Active</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {categoryData.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-slate-800 rounded-full mr-3"></div>
                    <span className="text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-gray-900 font-medium">{category.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{activity.customer}</div>
                      <div className="text-sm text-gray-600">{activity.action}</div>
                    </div>
                    <span className={`text-sm font-medium ${activity.statusColor}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900">Welcome back!</div>
              <div className="text-sm text-green-700">You have been logged in successfully.</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;