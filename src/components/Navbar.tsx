import axios from "axios";
import { Sparkles, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
    const [logout, setLogout] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogout = async ()=> {
        try{
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`);

            if(!res.data.success){
                toast.error("Error in logout");
                return
            }

            toast(res.data.message);
            navigate('/');

        }catch(err){
            toast.error("Error in logout");
        }
    }

  return (
    <header className="bg-white border-b shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">LuxeRent</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:cursor-pointer" onClick={()=> navigate('/home')}>
            <span>Browse Clothes</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:cursor-pointer" onClick={()=> navigate('/my-rentals')}>
            <span>My Rentals</span>
          </button>
        </nav>

        {/* User */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
              J
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900">
                John Customer
              </div>
              <div className="text-xs text-gray-500">Customer</div>
            </div>
          </div>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 hover:cursor-pointer hover:bg-gray-500/10 px-4 py-1.5 rounded-sm" onClick={()=> handleLogout()}>
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Navbar