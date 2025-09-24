import { MapPin, ShoppingBag, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

type CheckoutFormType = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

type CheckoutProps = {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
};

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = ({ showModal, setShowModal }: CheckoutProps) => {
  const [currStep, setCurrStep] = useState<number>(1);
  const [formData, setFormData] = useState<CheckoutFormType>({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const { cart } = useCart();

  const token = localStorage.getItem("token") as string;
  const currUser = JSON.parse(localStorage.getItem("auth") as string) ;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const orderData = {
      ...formData,
      user: currUser.id,
      // cloth: 
    }
    const response = await axios.post(
      `${import.meta.env.BASE_API_URL}/order`,
      formData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response.data.success) {
      toast.success("Order created successfully");
      setShowModal(false);
    }
  };

  const getTotalRentalDays = (fromDate: string, toDate: string) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    const diff = Math.ceil(
      (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
    );

    return diff || 1;
  };

  const total = useMemo(() => {
    return cart.reduce(
      (acc, item) =>
        acc +
        item.pricePerDay *
          getTotalRentalDays(item.fromDate, item.toDate) *
          item.quantity,
      0
    );
  }, [cart]);

  if (!showModal) return null;

  const handleRazorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/payments/create-order`,
        { amount: total },
        {
          headers: { Authorization: token },
        }
      );

      const options = {
        key: import.meta.env.VITE_PUBLIC_RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: "INR",
        name: "RentLuxe",
        description: "Online Payment",
        order_id: response.data.orderId,
        handler: async (res: any) => {
          const paymentResult = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/payments/verify-order`,
            {
              ...res,
              orderId: response.data.orderId,
              formData,
              cart,
            },
            {
              headers: { Authorization: token },
            }
          );

          if (paymentResult.data.success) {
            toast.success("Payment successful and order confirmed!");
          } else {
            toast.error("Payment succeeded but order failed to confirm.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: localStorage.getItem("email"),
          contact: formData.phone,
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: "#0d9488",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Something went wrong while initiating payment.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 sm:px-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-lg my-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
        >
          ✕
        </button>

        {/* Modal Content */}
        <main className="px-6 py-8 sm:p-10 overflow-y-auto max-h-[90vh]">
          <h1 className="text-2xl font-bold mb-2">
            {/* <FiCreditCard size={18} /> */}
            Checkout
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Complete your rental order
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-6 mb-10">
            {[1, 2, 3].map((step, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currStep === step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step !== 3 && <div className="h-0.5 w-6 bg-gray-300"></div>}
              </div>
            ))}
          </div>

          {/* Step 1: Address Form */}
          {currStep === 1 && (
            <section className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="text-blue-600" size={20} />
                <h2 className="text-lg font-semibold">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "First Name", name: "firstName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Phone Number", name: "phone" },
                  { label: "City", name: "city" },
                  { label: "State", name: "state" },
                  { label: "Pincode", name: "pincode" },
                ].map(({ label, name }) => (
                  <div key={name}>
                    <label className="text-sm font-medium text-gray-600">
                      {label} *
                    </label>
                    <input
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-blue-500"
                      placeholder={`Enter ${label}`}
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm resize-none"
                    placeholder="House No, Building, Street, Area"
                    rows={3}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Review */}
          {currStep === 2 && (
            <section className="space-y-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="text-blue-600" size={20} />
                <h2 className="text-lg font-semibold">Order Review</h2>
              </div>

              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-sm text-gray-400">
                          {item.fromDate} - {item.toDate}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      ₹
                      {getTotalRentalDays(item.fromDate, item.toDate) *
                        item.pricePerDay}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between px-2 font-semibold text-gray-700 border py-1 border-gray-600/10 rounded-md shadow-sm bg-gray-300/10">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              {/* Address Summary */}
              <div className="p-4 bg-gray-100 rounded-md text-sm">
                <h3 className="font-semibold text-gray-800 mb-1">
                  Delivery Address
                </h3>
                <p>{`${formData.firstName} ${formData.lastName}`}</p>
                <p>{formData.phone}</p>
                <p>{formData.address}</p>
                <p>
                  {formData.city}, {formData.state} - {formData.pincode}
                </p>
              </div>
            </section>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              disabled={currStep === 1}
              className={`px-5 py-2 rounded-md text-sm border ${
                currStep === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setCurrStep((prev) => prev - 1)}
            >
              <ArrowLeft size={16} className="inline mr-2" />
              Previous
            </button>

            {currStep < 2 ? (
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-500"
                onClick={() => {
                  if (
                    Object.values(formData).every(
                      (field) => field.trim() !== ""
                    )
                  ) {
                    setCurrStep((prev) => prev + 1);
                  } else {
                    toast.error(
                      "Please fill all required fields before proceeding."
                    );
                    return;
                  }
                }}
              >
                Next
              </button>
            ) : (
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-md text-sm hover:bg-green-600 hover:cursor-pointer"
                onClick={handleRazorpay}
              >
                Confirm Order
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Checkout;
