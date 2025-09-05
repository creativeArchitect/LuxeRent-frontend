import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckSquare,
  LogOut,
  Calendar,
  CheckCircle,
  Package,
  Clock,
  AlertTriangle,
  IndianRupee,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import type { OrdersDetails } from "../types/OrderType";
// import { useRentalStore } from "../store/rentalStore";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/authContext";

const UserRentals = () => {
  const [activeTab, setActiveTab] = useState("all");

  const [totalRentals, setTotalRentals] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token:", token)
    const fetchRentals = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/order/my`, { headers: { Authorization: `Bearer ${token}` } });

      if (!res.data.success) {
        toast.error(res.data.message|| "error in fetch rentals of user")
      }

      setTotalRentals(res.data?.orders);

    };
    fetchRentals();

    console.log("totalRentals: ", totalRentals);

    const interval = setInterval(fetchRentals, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sample rental data
  const rentals = [
    {
      id: 1,
      name: "Designer Lehenga",
      status: "overdue",
      statusLabel: "Overdue",
      startDate: "Aug 1, 2023",
      endDate: "Aug 5, 2023",
      totalAmount: 2000,
      icon: Package,
    },
    {
      id: 2,
      name: "Cocktail Dress",
      status: "returned",
      statusLabel: "Returned",
      startDate: "Jul 15, 2023",
      endDate: "Jul 17, 2023",
      totalAmount: 700,
      icon: Package,
    },
  ];

  // Stats data
  const stats = [
    {
      title: "Total Rentals",
      value: "2",
      subtitle: "All time rentals",
      icon: Package,
    },
    {
      title: "Active Rentals",
      value: "1",
      subtitle: "Currently ongoing",
      icon: Clock,
    },
    {
      title: "Completed",
      value: "1",
      subtitle: "Successfully returned",
      icon: CheckCircle,
    },
    {
      title: "Total Spent",
      value: "₹2,700",
      subtitle: "Lifetime spending",
      icon: IndianRupee,
    },
  ];

  // Tab data
  const tabs = [
    { id: "all", label: "All", count: 2, icon: Package },
    { id: "ongoing", label: "Ongoing", count: 1, icon: Clock },
    { id: "returned", label: "Returned", count: 1, icon: CheckCircle },
    { id: "late", label: "Late", count: 0, icon: AlertTriangle },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "bg-blue-100 text-blue-800";
      case "returned":
        return "bg-green-100 text-green-800";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEndDateColor = (status: string) => {
    return status === "overdue" ? "text-red-600" : "text-gray-900";
  };

  const filteredRentals = rentals.filter((rental) => {
    switch (activeTab) {
      case "ongoing":
        return rental.status === "overdue"; // Overdue is considered ongoing
      case "returned":
        return rental.status === "returned";
      case "late":
        return rental.status === "late";
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Rentals</h1>
          <p className="text-gray-600">
            Manage your rental history and track current orders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div className="bg-white rounded-xl border border-gray-200 p-6" key={index}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600">{stat.subtitle}</div>
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium border-b-2 transition-colors hover:cursor-pointer ${
                  activeTab === tab.id
                    ? "border-slate-800 text-slate-800"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Rentals List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRentals.map((rental, index) => (
            <div
              key={rental.id}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <rental.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {rental.name}
                    </h3>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-sm shadow-xs text-sm font-medium ${getStatusColor(
                    rental.status
                  )}`}
                >
                  {rental.statusLabel}
                </span>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">Start Date</span>
                  </div>
                  <div className="font-medium text-gray-900">
                    {rental.startDate}
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">End Date</span>
                  </div>
                  <div
                    className={`font-medium ${getEndDateColor(rental.status)}`}
                  >
                    {rental.endDate}
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <IndianRupee className="w-4 h-4 mr-2" />
                    <span className="text-sm">Total Amount</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    ₹{rental.totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRentals.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No rentals found
            </h3>
            <p className="text-gray-600">
              No rentals match the selected filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserRentals;
