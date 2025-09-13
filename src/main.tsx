import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-right" />
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
