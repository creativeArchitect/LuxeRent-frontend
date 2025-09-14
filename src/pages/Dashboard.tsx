import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowRightLeft,
  TrendingUp,
  Users,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  // Dummy chart data
  const revenueData = [
    { name: "Jan", revenue: 20000 },
    { name: "Feb", revenue: 30000 },
    { name: "Mar", revenue: 28000 },
    { name: "Apr", revenue: 45000 },
    { name: "May", revenue: 52000 },
    { name: "Jun", revenue: 48000 },
  ];

  const categoryData = [
    { name: "Traditional", value: 2000 },
    { name: "Formal", value: 0 },
    { name: "Party", value: 800 },
    { name: "Casual", value: 0 },
  ];

  const distributionData = [
    { name: "Traditional", value: 1 },
    { name: "Formal", value: 1 },
    { name: "Party", value: 0 },
    { name: "Casual", value: 0 },
  ];

  const COLORS = ["#0f172a", "#64748b", "#1d4ed8", "#9333ea"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-40 py-8 flex flex-col gap-7">
        {/* Dashboard Header */}
        <div className="px-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here’s what’s happening with your rental business
            today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-bold">₹2,700</h2>
            <span className="text-xs bg-yellow-400/20 text-yellow-700 px-2 py-0.5 rounded-sm shadow-xs">
              +12.5%
            </span>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Active Rentals</p>
            <h2 className="text-2xl font-bold">1</h2>
            <span className="text-xs bg-yellow-400/20 text-yellow-700 px-2 py-0.5 rounded-sm shadow-xs">
              +5.2%
            </span>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Customers</p>
            <h2 className="text-2xl font-bold">1</h2>
            <span className="text-xs bg-yellow-400/20 text-yellow-700 px-2 py-0.5 rounded-sm shadow-xs">
              +8.1%
            </span>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Inventory</p>
            <h2 className="text-2xl font-bold">3/4</h2>
            <span className="text-xs bg-yellow-400/20 text-yellow-700 px-2 py-0.5 rounded-sm shadow-xs">
              25% utilization
            </span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Revenue Trend */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ace63"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Performance */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Category Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0ace63" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pb-10">
          {/* Rental Status */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Rental Status</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between bg-green-500/10 px-3 py-2 rounded-md shadow-xs">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completed</span>
                </div>
                <span className="text-green-700 text-xs px-2 py-0.5 rounded-md">
                  1
                </span>
              </li>
              <li className="flex items-center justify-between bg-yellow-600/10 px-3 py-2 rounded-md shadow-xs">
                <div className="flex items-center space-x-2 text-yellow-600">
                  <Clock className="w-4 h-4" />
                  <span>Ongoing</span>
                </div>
                <span className="text-yellow-700 text-xs px-2 py-0.5 rounded-md">
                  1
                </span>
              </li>
              <li className="flex items-center justify-between bg-red-600/10 px-3 py-2 rounded-md shadow-xs">
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Late Returns</span>
                </div>
                <span className="text-red-700 text-xs px-2 py-0.5 rounded-md">
                  0
                </span>
              </li>
            </ul>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul className="flex flex-wrap gap-4 text-xs text-gray-600 mt-2">
              {distributionData.map((d, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  ></span>
                  <span>
                    {d.name} - {d.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-between bg-gray-400/10 px-3 py-2 rounded-md shadow-xs">
                <div>
                  <p>
                    <span className="font-medium">John Customer</span> rented
                    Designer Lehenga
                  </p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-sm">
                  ongoing
                </span>
              </li>
              <li className="flex items-center justify-between bg-gray-400/10 px-3 py-2 rounded-md shadow-xs">
                <div>
                  <p>
                    <span className="font-medium">John Customer</span> rented
                    Cocktail Dress
                  </p>
                </div>
                <span className="text-xs bg-green-400/10 text-green-700 px-2 py-0.5 rounded-sm">
                  returned
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
