import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "../types/CartItem";
import { toast } from "sonner";

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (clothId: string) => void
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    // const itemFromDate = new Date(item.fromDate);
    // const itemToDate = new Date(item.toDate);

    // const handleSameDates = (i: CartItem)=> {
    //   const exitItemFromDate = new Date(i.fromDate);
    //   const exitItemToDate = new Date(i.toDate);

    //   const diffFromDates = exitItemFromDate.getTime() - itemFromDate.getTime();

    //   const diffToDates = exitItemToDate.getTime() - itemToDate.getTime();

    //   return diffFromDates 
    // }

    setCart((prev: CartItem[]) => {
      const isItemExists = prev.find((i) => (
        i.clothId === item.clothId && (
          (i.fromDate === item.fromDate || i.toDate === item.toDate))
      ));

      if (isItemExists) {
        toast.error("Cloth is already in the cart for selected dates");
        return prev.map((i) =>
          i.clothId === item.clothId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      toast.success("Cloth is added in the cart")
      return [...prev, { ...item, quantity:  item.quantity || 1 }];
    });
  };

  const removeFromCart = (clothId: string) => {
    setCart((pre) => pre.filter((i) => i.clothId !== clothId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
