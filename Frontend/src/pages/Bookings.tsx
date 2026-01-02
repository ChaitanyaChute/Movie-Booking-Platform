import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Movie {
  moviename: string;
  duration: string;
  poster_path: string;
}

interface Booking {
  _id: string;
  movieId: Movie;
  showDate: string;
  showTime: string;
  seats: string[];
  totalSeats: number;
  amount: number;
  status: string;
  createdAt: string;
}

const MyBookings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currency: string = import.meta.env.VITE_CURRENCY || "$";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Handle Stripe redirect
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const bookingId = searchParams.get('bookingId');
    
    if (success === 'true' && bookingId) {
      // Booking is created as paid in backend, just refresh and show success
      toast.success("Payment successful! Your booking is confirmed.");
      getMyBookings();
      // Remove query params from URL
      navigate('/bookings', { replace: true });
    } else if (canceled === 'true') {
      toast.error("Payment canceled. Please try again.");
      navigate('/bookings', { replace: true });
    }
  }, [searchParams, navigate]);

  const getMyBookings = async () => {
    try {
      setIsLoading(true);
      setError(""); // Clear previous errors
      
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please login to view bookings");
        setIsLoading(false);
        return;
      }

      console.log('Fetching bookings from:', `${import.meta.env.VITE_BACKEND_URL}/bookings/my-bookings`);
      console.log('Token:', token ? 'Token exists' : 'No token');

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/bookings/my-bookings`,
        {
          headers: {
            "token": token
          }
        }
      );

      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(errorData.message || `Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log('Bookings data:', data);
      setBookings(data.bookings || []);
    } catch (err: unknown) {
      console.error('Fetch error:', err);
      setError((err as Error).message);
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0c11]">
      <div className="flex flex-col items-center gap-4">
        <svg className="animate-spin h-12 w-12 text-[#EF3A55]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-white text-lg">Loading bookings...</p>
      </div>
    </div>
  );
  if (error) return <p className="text-red-500 p-8">{error}</p>;

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] bg-[#0d0c11] text-white">

      <h1 className="text-2xl font-semibold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-400">No bookings found</p>
      ) : (
        bookings.map((item) => {
          const statusDisplay = item.status || 'paid';
          return (
          <div
            key={item._id}
            className="flex flex-col md:flex-row justify-between  border border-[#EF3A55]/20 rounded-lg mt-4 p-4 max-w-3xl"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={item.movieId?.poster_path}
                alt={item.movieId?.moviename}
                className="w-32 h-48 object-cover rounded"
              />

              <div className="flex flex-col justify-center">
                <p className="text-xl font-semibold mb-2">{item.movieId?.moviename}</p>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="text-[#EF3A55]">Date:</span> {item.showDate}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="text-[#EF3A55]">Time:</span> {item.showTime}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="text-[#EF3A55]">Seats:</span> {item.seats.join(', ')}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="text-[#EF3A55]">Total Seats:</span> {item.totalSeats}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:items-end md:text-right justify-between mt-4 md:mt-0">
              <div>
                <p className="text-2xl font-bold text-[#EF3A55]">
                  {currency}{item.amount}
                </p>
                <p className={`text-sm mt-2 px-3 py-1 rounded-full inline-block ${
                  statusDisplay === 'paid' ? 'bg-green-500/20 text-green-400' :
                  statusDisplay === 'paid' ? 'bg-green-500/20 text-green-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {statusDisplay.toUpperCase()}
                </p>
                {statusDisplay === 'paid' && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-400 mb-1">🎟️ Ticket Confirmed</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Booked: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
        })
      )}
    </div>
  );
};

export default MyBookings;
