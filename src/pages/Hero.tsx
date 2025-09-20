import { Sparkles, Shield, Truck, Star, ShoppingBag } from "lucide-react"
import { useNavigate } from "react-router-dom";

const Hero = ()=> {
  const navigate = useNavigate();


  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-[#cc9815] text-white px-6">
      
      {/* Logo + Heading */}
      <div className="flex flex-col items-center text-center max-w-2xl">
        <div className="bg-yellow-500 text-black p-4 rounded-2xl mb-6">
          <ShoppingBag size={32} />
        </div>
        <h1 className="flex items-center gap-2 text-4xl md:text-5xl font-bold">
          <Sparkles className="text-yellow-400" size={36} />
          LuxeRent
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          Rent premium designer clothing for special occasions. Look stunning without the commitment.
        </p>

        {/* CTA */}
        <div className="flex gap-3 mt-6">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-md hover:cursor-pointer transition-all hover:shadow-yellow-500" onClick={()=> navigate('/register')}>
            Go to Dashboard
          </button>
          {/* <button className="bg-[#0f172a] hover:bg-[#0f172a] font-semibold px-6 py-3 rounded-md hover:cursor-pointer transition-all border border-neutral-700 text-white" onClick={()=> navigate('/login')}>
            Login
          </button> */}
        </div>
      </div>

      {/* Features */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="flex flex-col items-center">
          <Shield size={32} className="text-yellow-400 mb-3" />
          <h3 className="font-semibold text-lg">Premium Quality</h3>
          <p className="text-gray-300 text-sm">
            Designer brands with full damage protection
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Truck size={32} className="text-yellow-400 mb-3" />
          <h3 className="font-semibold text-lg">Fast Delivery</h3>
          <p className="text-gray-300 text-sm">
            Same day delivery in metro cities
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Star size={32} className="text-yellow-400 mb-3" />
          <h3 className="font-semibold text-lg">5-Star Service</h3>
          <p className="text-gray-300 text-sm">
            Professional cleaning and 24/7 support
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero;