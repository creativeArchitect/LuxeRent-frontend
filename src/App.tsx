import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Hero from "./pages/Hero"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import UserRentals from "./pages/UserRentals"
import Cloth from "./pages/Cloth"
import AdminManageClothes from "./pages/ManageClothes"
import ManageClothes from "./pages/ManageClothes"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-rentals" element={<UserRentals />} />
        <Route path="/cloth" element={<Cloth />} />
        <Route path="/manage-cloth" element={<ManageClothes />} />
      </Routes>
    </div>
  )
}

export default App
