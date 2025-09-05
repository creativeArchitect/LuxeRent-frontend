import { useState } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  BarChart3,
  Calendar,
  TrendingUp,
  IndianRupee,
  Clock,
  Users,
  Package,
  CheckCircle,
  AlertTriangle,
  Eye,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Navbar from "../components/Navbar";
import axios from "axios";

const Dashboard = () => {
  const [showWelcomeToast, setShowWelcomeToast] = useState(true);

  const getDashboardData = async ()=> {
    try{
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/order/`)
    }catch(err){

    }
  }

  // Stats cards
  const statsCards = [
    {
      icon: IndianRupee,
      title: "Total Revenue",
      value: "₹2,700",
      subtitle: "All time earnings",
      change: "+12.5%",
      changeType: "positive",
    },
    {
      icon: Clock,
      title: "Active Rentals",
      value: "1",
      subtitle: "Currently ongoing",
      change: "+5.2%",
      changeType: "positive",
    },
    {
      icon: Users,
      title: "Total Customers",
      value: "1",
      subtitle: "Unique customers",
      change: "+8.1%",
      changeType: "positive",
    },
    {
      icon: Package,
      title: "Inventory",
      value: "3/4",
      subtitle: "25.0% utilization",
      change: "1",
      changeType: "warning",
    },
  ];

  // Charts Data
  const revenueData = [
    { month: "Jan", revenue: 20000 },
    { month: "Feb", revenue: 30000 },
    { month: "Mar", revenue: 28000 },
    { month: "Apr", revenue: 45000 },
    { month: "May", revenue: 52000 },
    { month: "Jun", revenue: 48000 },
  ];

  const categoryData = [
    { name: "Traditional", value: 2000, count: 1 },
    { name: "Formal", value: 0, count: 0 },
    { name: "Party", value: 700, count: 1 },
    { name: "Casual", value: 0, count: 0 },
  ];

  const rentalStatus = [
    { status: "Completed", count: 1, color: "bg-green-100 text-green-800" },
    { status: "Ongoing", count: 1, color: "bg-yellow-100 text-yellow-800" },
    { status: "Late Returns", count: 0, color: "bg-red-100 text-red-800" },
  ];

  const recentActivity = [
    {
      customer: "John Customer",
      action: "rented Designer Lehenga",
      status: "ongoing",
      statusColor: "text-yellow-600",
    },
    {
      customer: "John Customer",
      action: "rented Cocktail Dress",
      status: "returned",
      statusColor: "text-green-600",
    },
  ];

  const COLORS = ["#1e293b", "#3b82f6", "#f97316", "#10b981"];

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
              <div className="text-sm opacity-90">
                You have been logged in successfully.
              </div>
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
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your rental business
            today.
          </p>
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
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-md shadow-xs mb-4 ${
                      stat.changeType === "warning"
                        ? "bg-gray-100"
                        : "bg-green-100"
                    }`}
                  >
                    <stat.icon
                      className={`w-6 h-6 ${
                        stat.changeType === "warning"
                          ? "text-gray-600"
                          : "text-green-600"
                      }`}
                    />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {stat.title}
                  </div>
                  <div className="text-xs text-gray-600">{stat.subtitle}</div>
                </div>
                <div
                  className={`inline-flex items-center px-2 py-1 rounded-sm shadow-xs text-xs font-medium ${
                    stat.changeType === "positive"
                      ? "bg-amber-100 text-amber-800"
                      : stat.changeType === "warning"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center mb-6">
              <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trend
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1e293b"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
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
              <h3 className="text-lg font-semibold text-gray-900">
                Category Performance
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1e293b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
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
              <h3 className="text-lg font-semibold text-gray-900">
                Rental Status
              </h3>
            </div>
            <div className="space-y-4">
              {rentalStatus.map((item) => (
                <div
                  key={item.status}
                  className="flex items-center justify-between border border-black/10 px-3 py-2.5 shadow-xs rounded-md bg-gray-50"
                >
                  <div className="flex items-center">
                    {item.status === "Completed" && (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    )}
                    {item.status === "Ongoing" && (
                      <Clock className="w-5 h-5 text-yellow-500 mr-3" />
                    )}
                    {item.status === "Late Returns" && (
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                    )}
                    <span className="text-gray-900 font-medium">
                      {item.status}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${item.color}`}
                  >
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
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Category Distribution
            </h3>
            <div className="h-48">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="count"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="px-4 py-2 rounded-md border border-black/10 shadow-xs bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {activity.customer}
                      </div>
                      <div className="text-sm text-gray-600">
                        {activity.action}
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium ${activity.statusColor}`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
