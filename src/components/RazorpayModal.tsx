import axios from "axios";
import { toast } from "sonner";
import type { CartItem } from "../types/CartItem";

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

type CheckoutFormType = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export const openRazorpayModal = async (
  totalPrice: number,
  formData: CheckoutFormType,
  cart: CartItem[],
  token: string,
  email: string,
  onSuccess: () => void
) => {
  const res = await loadRazorpayScript();
  if (!res) {
    toast.error("Razorpay SDK failed to load.");
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/payments/create-order`,
      { amount: totalPrice },
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
          onSuccess();
        } else {
          toast.error("Payment succeeded but order failed to confirm.");
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: email,
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
