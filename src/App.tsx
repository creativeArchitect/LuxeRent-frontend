import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Hero from "./pages/Hero";
import Home from "./pages/Home";
import ManageClothes from "./pages/ManageClothes";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import ClothDetails from "./pages/ClothDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyRentals from "./pages/MyRentals";
import { useAuth } from "./context/AuthContext";

export const PublicOnlyRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};

function App() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/home" element={<Home />} />
      <Route path="/cloth/:id" element={<ClothDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/manage-clothes" element={<ManageClothes />} />
      <Route path="/my-rentals" element={<MyRentals />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
