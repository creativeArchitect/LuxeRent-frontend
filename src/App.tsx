import { Routes, Route } from "react-router-dom"
import Hero from "./pages/Hero"
import Home from "./pages/Home"
import ManageClothes from "./pages/ManageClothes"
import Cart from "./pages/Cart"
import ManageRentals from "./pages/ManageRentals"
import Dashboard from "./pages/Dashboard"
import ClothDetails from "./pages/ClothDetails"
import Register from "./pages/Register"
import Login from "./pages/Login"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cloth" element={<ClothDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/manage-clothes" element={<ManageClothes />} />
      <Route path="/manage-rentals" element={<ManageRentals />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
