import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Movie {
  moviename: string;
  duration: string;
  poster_path: string;
}

interface User {
  username: string;
  email: string;
}

interface Booking {
  _id: string;
  movieId: Movie;
  userId: User;
  showDate: string;
  showTime: string;
  seats: string[];
  totalSeats: number;
  amount: number;
  status: string;
  createdAt: string;
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const currency: string = import.meta.env.VITE_CURRENCY || "$";

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError("Please login as admin");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/bookings`,
        {
          headers: {
            'token': token
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError((error as Error).message);
      toast.error("Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-white p-8">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">All Bookings</h2>
          <p className="text-gray-400">Manage all platform bookings</p>
        </div>
        <div className="text-white">
          <span className="text-gray-400">Total Bookings: </span>
          <span className="text-2xl font-bold text-[#EF3A55]">{bookings.length}</span>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-gray-400 text-center py-12">No bookings found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-[#1A1A1C] rounded-xl overflow-hidden">
            <thead className="bg-[#0F0F10] text-gray-300">
              <tr>
                <th className="px-6 py-4 text-left">Booking ID</th>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Movie</th>
                <th className="px-6 py-4 text-left">Show Details</th>
                <th className="px-6 py-4 text-left">Seats</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-[#2a2a2b] transition-colors">
                  <td className="px-6 py-4 text-gray-400 text-sm font-mono">
                    {booking._id.slice(-8)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{booking.userId?.username || 'N/A'}</div>
                    <div className="text-gray-400 text-sm">{booking.userId?.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={booking.movieId?.poster_path}
                        alt={booking.movieId?.moviename}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <div className="text-white font-medium">{booking.movieId?.moviename}</div>
                        <div className="text-gray-400 text-sm">{booking.movieId?.duration}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">{booking.showDate}</div>
                    <div className="text-gray-400 text-sm">{booking.showTime}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">{booking.seats.join(', ')}</div>
                    <div className="text-gray-400 text-sm">{booking.totalSeats} seats</div>
                  </td>
                  <td className="px-6 py-4 text-white font-semibold">
                    {currency}{booking.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                      booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
