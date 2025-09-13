import { ArrowLeft, ShoppingCart, Trash2, Calendar } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useMemo } from "react";
import { toast } from "sonner";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const total = useMemo(()=> {
    return cart.reduce((acc, item)=> acc + item.pricePerDay * item.quantity, 0);
  }, [cart]);

  const getTotalRentalDays = (fromDate: string, toDate: string)=> {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    const diff = Math.ceil((from.getTime() - to.getTime()) / (1000 * 60 * 60 * 24));

    return diff || 1;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div
        className="flex gap-3 items-centerpx-3 px-3 items-center py-3 hover:bg-neutral-100 rounded-md w-fit h-fit mt-6 ml-10 hover:cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <ArrowLeft size={15} />
        <span className="text-sm">Continue Shopping</span>
      </div>

      {/* Main Content */}
      <main className="py-6 px-40">
        {/* Cart Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
          </div>
          {/* <button className="flex items-center space-x-2 border border-red-200 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 hover:cursor-pointer">
            <Trash2 className="w-4 h-4" />
            <span>Clear Cart</span>
          </button> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.length > 0 ?
              cart.map((c) => (
                <div className="flex items-start bg-white rounded-xl shadow-sm p-4">
                  <img
                    src={c.image}
                    alt="Designer Lehenga"
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold">{c.name}</h3>
                    <p className="text-gray-600 text-sm">{c.pricePerDay}/day</p>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        From: <b>{(c.fromDate)}</b> To: <b>{c.toDate}</b>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {getTotalRentalDays(c.fromDate, c.toDate)} days
                    </p>
                  </div>
                  <div className="text-right" onClick={()=> {
                    removeFromCart(c.clothId);
                    toast.message(`${c.name} removed from cart`);
                  }}>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <p className="font-semibold mt-8">
                      {c.quantity * c.pricePerDay}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500">Your cart is empty.</p>
              )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold flex items-center space-x-2 mb-4">
              <ShoppingCart className="w-5 h-5" />
              <span>Order Summary</span>
            </h3>

            <div className="space-y-2 text-sm">
              {cart.length > 0 &&
                cart.map((c) => (
                  <div className="flex justify-between">
                    <span>{c.name}</span>
                    <span>{c.quantity * c.pricePerDay}</span>
                  </div>
                ))}
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>

            <button className="w-full mt-6 flex items-center justify-center space-x-2 bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 hover:cursor-pointer">
              <ShoppingCart className="w-5 h-5" />
              <span>Rent All Items</span>
            </button>

            <p className="text-xs text-gray-500 mt-4">
              All items will be rented with the selected dates. You can track
              your rentals in "My Rentals".
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
