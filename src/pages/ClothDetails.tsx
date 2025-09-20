import {
  ArrowLeft,
  Star,
  Calendar,
  ShieldCheck,
  Truck,
  RefreshCw,
  Clock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Cloth } from "../types/Cloth";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

const featuredData = [
  {
    feature: "Insured",
    detail: "Full damage protection",
    icon: <ShieldCheck className="w-6 h-6 text-gray-700 mb-2" />,
  },
  {
    feature: "Free Delivery",
    detail: "Same day in metro cities",
    icon: <Truck className="w-6 h-6 text-gray-700 mb-2" />,
  },
  {
    feature: "Easy Returns",
    detail: "Hassle-free pickup",
    icon: <RefreshCw className="w-6 h-6 text-gray-700 mb-2" />,
  },
  {
    feature: "24/7 Support",
    detail: "Always here to help",
    icon: <Clock className="w-6 h-6 text-gray-700 mb-2" />,
  },
];

const ClothDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [item, setItem] = useState<Cloth | null>(null);
  const token = localStorage.getItem("token");

  const { addToCart } = useCart();

  const navigate = useNavigate();

  const fetchCloth = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/cloth/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      setItem(response.data.cloth);
    } catch (err) {
      toast.error("Error fetching cloth details.");
    }
  };

  useEffect(() => {
    fetchCloth();
  }, [id]);

  const totalDays = () => {
    if (!fromDate || !toDate) return 1;

    const from = new Date(fromDate);
    const to = new Date(toDate);
    const msDiff = to.getTime() - from.getTime();

    if (msDiff < 0) {
      toast.error("To Date must be after From Date");
      return 1;
    }

    const dayDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24));
    return dayDiff <= 0 ? 1 : dayDiff;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Back to Browse */}
      <div
        className="flex items-center gap-2 px-4 py-3 hover:bg-neutral-100 rounded-lg w-fit mt-6 ml-36 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Browse</span>
      </div>

      <main className="px-10 md:px-20 lg:px-40 py-6 flex flex-col lg:flex-row gap-10">
        {!item ? (
          <p className="text-center text-gray-500 w-full">
            No cloth data available
          </p>
        ) : (
          <>
            {/* Left - Image + Features */}
            <div className="flex flex-col gap-6 w-[500px]">
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[500px] h-auto max-h-[700px] object-cover rounded-lg"
                />
                <span
                  className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded-md ${
                    item.available
                      ? "bg-green-200 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.available ? "Available" : "Rented"}
                </span>
              </div>

              {/* Features */}
              <section className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {featuredData.map((d, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center border border-black/10"
                  >
                    {d.icon}
                    <p className="font-medium text-sm">{d.feature}</p>
                    <p className="text-xs text-gray-500">{d.detail}</p>
                  </div>
                ))}
              </section>
            </div>

            {/* Right - Details */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-semibold">{item.name}</span>
                {/* <Star className="w-4 h-4 text-yellow-500" />
                <span>4.8</span> */}
              </div>

              <h1 className="text-2xl font-bold">{item.category}</h1>
              <p className="text-gray-600 break-words">{item.description}</p>

              <div className="mt-2 flex items-center gap-3 text-xl font-bold">
                ₹{item.pricePerDay}
                <span className="text-sm text-gray-500 font-normal">/day</span>
                <span className="ml-4 text-sm text-gray-600">
                  Size: <b>{item.size}</b>
                </span>
              </div>

              {/* Rental Form */}
              <div className="bg-white rounded-lg shadow-sm p-5 mt-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Select Rental Dates</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="border border-black/20 rounded-lg px-3 py-2 text-sm w-full"
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="border border-black/20 rounded-lg px-3 py-2 text-sm w-full"
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-200 text-black border border-black/20 py-3 rounded-lg hover:cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      if(fromDate && toDate){
                        if(fromDate === toDate){
                          return toast.error("From date and To date cannot be same");
                        }
                        addToCart({
                          clothId: item._id as string,
                          name: item.name,
                          pricePerDay: item.pricePerDay,
                          available: item.available,
                          category: item.category,
                          size: item.size,
                          image: item.image,
                          quantity: 1,
                          fromDate: fromDate,
                          toDate: toDate,
                        });
                      }else{
                        toast.error("Please select the required dates");
                      }
                    }}
                  >
                    Add to cart
                  </button>
                  <button className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg hover:cursor-pointer hover:bg-gray-800">
                    <span>Rent Now – ₹{totalDays() * item.pricePerDay}</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ClothDetail;
