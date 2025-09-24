import { LogOut, LucideShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { IoIosList } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log("user", user);

  const { cart } = useCart();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (err) {
      toast.error("Error in the logout");
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-lg bg-yellow-500 flex items-center justify-center">
          <span className="text-lg font-bold text-white">👕</span>
        </div>
        <span className="text-lg font-bold">LuxeRent</span>
      </div>
      <nav className="flex gap-6 text-sm font-medium text-gray-700">
        <Link
          to="/home"
          className="px-3 py-3 hover:bg-neutral-100 rounded-md flex gap-1 items-center font-semibold"
        >
          <LucideShoppingBag size={15} />
          Browse Clothes
        </Link>
        <Link
          to="/my-rentals"
          className="px-3 py-3 hover:bg-neutral-100 rounded-md flex gap-1 items-center font-semibold"
        >
          <IoIosList size={15} />
          My Rentals
        </Link>
        <Link
          to="/cart"
          className="relative flex items-center gap-2 px-3 py-2 hover:bg-neutral-100 rounded-md font-semibold"
        >
          <TiShoppingCart size={24} className="text-gray-700" />
          <span className="text-sm">Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-neutral-100 px-3 py-1 rounded-full">
          <img src={user?.avatarUrl} />
          <div className="text-sm">
            <p className="font-medium">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>
        <button
          className="flex items-center gap-1 px-2 py-1.5 rounded-md text-gray-600 hover:text-red-500 hover:bg-red-500/10 hover:cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
