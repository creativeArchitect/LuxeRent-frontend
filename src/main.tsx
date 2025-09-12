import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <AuthProvider>
        <Toaster position='top-right' />
        <App />
      </AuthProvider>
    </BrowserRouter>
);
