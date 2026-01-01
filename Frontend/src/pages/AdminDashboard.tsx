import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, DollarSign, Ticket, Film } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    paidBookings: 0,
    totalRevenue: 0,
    totalTickets: 0,
    activeShows: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/stats`,
          {
            headers: {
              'token': token
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setStats(data.stats);
          }
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color, bgColor }: any) => (
    <div className="bg-[#1A1A1C] rounded-xl p-6 border border-[#2a2a2b] hover:border-[#EF3A55] transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`${bgColor} p-4 rounded-lg`}>
          <Icon size={32} className={color} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-gray-400">Your platform statistics at a glance</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <svg className="animate-spin h-12 w-12 text-[#EF3A55]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-white text-lg">Loading statistics...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Ticket}
              title="Total Bookings"
              value={stats.totalBookings}
              color="text-[#EF3A55]"
              bgColor="bg-[#EF3A55]/10"
            />
            <StatCard
              icon={Ticket}
              title="Paid Bookings"
              value={stats.paidBookings}
              color="text-purple-500"
              bgColor="bg-purple-500/10"
            />
            <StatCard
              icon={DollarSign}
              title="Total Revenue"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              color="text-green-500"
              bgColor="bg-green-500/10"
            />
            <StatCard
              icon={Ticket}
              title="Total Tickets Sold"
              value={stats.totalTickets}
              color="text-yellow-500"
              bgColor="bg-yellow-500/10"
            />
            <StatCard
              icon={Film}
              title="Active Shows"
              value={stats.activeShows}
              color="text-blue-500"
              bgColor="bg-blue-500/10"
            />
          </div>

          <div className="bg-[#1A1A1C] rounded-xl p-6 border border-[#2a2a2b]">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="text-[#EF3A55]" size={24} />
              <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/admin/add"
                className="p-4 bg-[#0F0F10] rounded-lg border border-gray-600 hover:border-[#EF3A55] transition-all"
              >
                <h4 className="text-white font-semibold mb-1">Add New Movie</h4>
                <p className="text-gray-400 text-sm">Upload a new movie to the platform</p>
              </Link>
              <Link
                to="/admin/shows"
                className="p-4 bg-[#0F0F10] rounded-lg border border-gray-600 hover:border-[#EF3A55] transition-all"
              >
                <h4 className="text-white font-semibold mb-1">View Active Shows</h4>
                <p className="text-gray-400 text-sm">Manage your movie listings</p>
              </Link>
              <Link
                to="/admin/bookings"
                className="p-4 bg-[#0F0F10] rounded-lg border border-gray-600 hover:border-[#EF3A55] transition-all"
              >
                <h4 className="text-white font-semibold mb-1">View All Bookings</h4>
                <p className="text-gray-400 text-sm">Check all customer bookings and payments</p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
