import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "../types/CartItem";

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (clothId: string) => void
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    console.log("cartitem: ", item);
    setCart((prev: CartItem[]) => {
      const isItemExists = prev.find((i) => i.clothId === item.clothId);

      if (isItemExists) {
        return prev.map((i) =>
          i.clothId === item.clothId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

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
