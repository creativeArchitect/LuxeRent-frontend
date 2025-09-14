import {
  Package,
  Clock,
  CheckCircle,
  IndianRupee,
  Calendar,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import type { OrderType } from "../types/Order";

export default function MyRentals() {
  const [clothes, setClothes] = useState<OrderType[]>([]);
  const [totalCompletedRentals, setTotalCompletedRentals] = useState<number>(0);
  const [totalActiveRentals, setTotalActiveRentals] = useState<number>(0);
  const [totalSpend, setTotalSpend] = useState<number>(0);

  const [ongoingClothes, setOngoingClothes] = useState<OrderType[]>([]);
  const [returnedClothes, setReturnedClothes] = useState<OrderType[]>([]);
  const [lateClothes, setLateClothes] = useState<OrderType[]>([]);

  const [currTab, setCurrTab] = useState<string>("all");

  const fetchMyRentals = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/order/my`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const allOrders = response.data.orders;

    setOngoingClothes(allOrders.filter((o) => o.status === "ongoing"));
    setReturnedClothes(allOrders.filter((o) => o.status === "returned"));
    setLateClothes(allOrders.filter((o) => o.status === "late"));

    setClothes(allOrders);

    let totalActiveRentals = 0;
    let totalSpend = 0;
    let totalCompletedRentals = 0;
    if (response.data.orders.length > 0) {
      response.data.orders.forEach((o: OrderType) => {
        const from = new Date(o.fromDate);
        const to = new Date(o.toDate);
        const currDate = new Date();
      
        if (currDate >= from && currDate < to) {
          ++totalActiveRentals;
        }
      
        if (currDate > to) {
          ++totalCompletedRentals;
        }
      
        totalSpend += o.totalPrice;
      });
      
    }
    setTotalSpend(totalSpend);
    setTotalCompletedRentals(totalCompletedRentals);
    setTotalActiveRentals(totalActiveRentals);
    console.log("response: ", response);
  };

  useEffect(() => {
    fetchMyRentals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Heading */}
      <div className="px-50 py-8">
        <h1 className="text-2xl font-bold">My Rentals</h1>
        <p className="text-gray-600 mt-1">
          Manage your rental history and track current orders
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between">
            <div>
              <p className="font-semibold">Total Rentals</p>
              <p className="text-sm text-gray-500">All time rental clothes</p>
              <p className="text-lg font-bold mt-1">{clothes?.length}</p>
            </div>
            <Package className="w-6 h-6 text-gray-500" />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between">
            <div>
              <p className="font-semibold">Active Rentals</p>
              <p className="text-sm text-gray-500">Currently ongoing</p>
              <p className="text-lg font-bold mt-1">{totalActiveRentals}</p>
            </div>
            <Clock className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between">
            <div>
              <p className="font-semibold">Completed</p>
              <p className="text-sm text-gray-500">Successfully returned</p>
              <p className="text-lg font-bold mt-1">{totalCompletedRentals}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between">
            <div>
              <p className="font-semibold">Total Spent</p>
              <p className="text-sm text-gray-500">Lifetime spending</p>
              <p className="text-lg font-bold mt-1">₹{totalSpend}</p>
            </div>
            <IndianRupee className="w-6 h-6 text-gray-500" />
          </div>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-4 mt-10 bg-gray-100 py-2 px-4 rounded-md shadow-sm text-gray-600">
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black transition"
            onClick={() => setCurrTab("all")}
          >
            <Package className="w-4 h-4" />
            <span>All ({clothes?.length ?? 0})</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black transition"
            onClick={() => setCurrTab("ongoing")}
          >
            <Clock className="w-4 h-4" />
            <span>Ongoing ({ongoingClothes?.length ?? 0})</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black transition"
            onClick={() => setCurrTab("returned")}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Returned ({returnedClothes?.length ?? 0})</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium hover:bg-white hover:text-black transition"
            onClick={() => setCurrTab("late")}
          >
            <span className="text-yellow-600">⚠️</span>
            <span>Late ({lateClothes?.length ?? 0})</span>
          </button>
        </div>

        {/* Rental Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {(currTab === "all"
            ? clothes
            : currTab === "ongoing"
            ? ongoingClothes
            : currTab === "returned"
            ? returnedClothes
            : lateClothes
          )?.map((c) => (
            <RentalCard order={c} key={c.clothId} />
          ))}
        </div>
      </div>
    </div>
  );
}

const RentalCard = ({ order }: { order: OrderType }) => (
  <div className="bg-white rounded-xl shadow-sm p-5">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold flex items-center space-x-2">
        <Package className="w-5 h-5" />
        <span>{order.cloth.name}</span>
      </h3>
      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
        {order.status}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-xs text-gray-500 flex items-center space-x-1">
          <Calendar className="w-4 h-4" /> <span>Start Date</span>
        </p>
        <p className="font-medium">{order.fromDate}</p>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-xs text-gray-500 flex items-center space-x-1">
          <Clock className="w-4 h-4" /> <span>End Date</span>
        </p>
        <p className="font-medium text-red-500">{order.toDate}</p>
      </div>
    </div>
    <div className="bg-gray-50 rounded-lg p-3 mt-4">
      <p className="text-xs text-gray-500 flex items-center space-x-1">
        <IndianRupee className="w-4 h-4" /> <span>Total Amount</span>
      </p>
      <p className="font-bold">{order.totalPrice}</p>
    </div>
  </div>
);
