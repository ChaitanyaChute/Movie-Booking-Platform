import React, { useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import { Clock } from 'lucide-react';

const rows: string[] = ["A", "B", "C", "D", "E", "F", "G"];
const seatsPerRow: Record<string, number> = {
  A: 9,
  B: 9,
  C: 18,
  D: 18,
  E: 18,
  F: 18,
  G: 18,
  H: 15,
};

interface SeatProps {
  id: string;
  isTaken: boolean;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const Seat: React.FC<SeatProps> = ({ id, isTaken, isSelected, onClick }) => {
  let seatClass =
    "w-6 h-6 border border-[#EF3A55] rounded-md mx-[2px] my-[3px] transition-colors duration-200 text-2xl font-bold cursor-pointer";

  if (isTaken) {
    seatClass += " bg-[#EF3A55] cursor-not-allowed";
  } else if (isSelected) {
    seatClass += " bg-[#EF3A55]";
  } else {
    seatClass += " hover:bg-[#EF3A55]";
  }

  return (
    <div
      className={seatClass}
      title={id}
      onClick={() => {
        if (!isTaken) onClick(id);
      }}
    ></div>
  );
};

interface SeatRowProps {
  row: string;
  takenSeats: string[];
  selectedSeats: string[];
  onSeatClick: (id: string) => void;
}

const SeatRow: React.FC<SeatRowProps> = ({
  row,
  takenSeats,
  selectedSeats,
  onSeatClick,
}) => {
  const seatCount: number = seatsPerRow[row];
  const seats: JSX.Element[] = [];

  for (let i = 1; i <= seatCount; i++) {
    if (i === 10 && seatCount === 18) {
      seats.push(<div key={`${row}-gap`} className="w-6 h-6 mx-6"></div>);
    }

    const seatId = `${row}${i}`;
    const isTaken = takenSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    seats.push(
      <Seat
        key={seatId}
        id={seatId}
        isTaken={isTaken}
        isSelected={isSelected}
        onClick={onSeatClick}
      />
    );
  }

  return (
    <div className="flex items-center justify-center">
      <span className="w-4 text-white mr-2 text-xs">{row}</span>
      <div className="flex flex-wrap justify-center">{seats}</div>
    </div>
  );
};

const SeatLayout: React.FC = () => {
  const { id: movieId, date } = useParams();
  const [takenSeats] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [movieTitle, setMovieTitle] = useState<string>('');

  // Fetch movie details to get the title
  React.useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movies/${movieId}`);
        const movieData = await response.json();
        setMovieTitle(movieData.moviename || 'Movie');
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovie();
  }, [movieId]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSeatClick = (seatId: string) => {
    if (takenSeats.includes(seatId)) return;

    setSelectedSeats((prev) => {
      const isSelected = prev.includes(seatId);

      if (!isSelected && prev.length >= 4) {
        showToast("You can only select up to 4 seats");
        return prev;
      }

      const updated = isSelected
        ? prev.filter((id) => id !== seatId) 
        : [...prev, seatId]; 

      if (!isSelected) {
        showToast(`You have selected seat ${seatId}`);
      }

      return updated;
    });
  };

  const handleCheckoutClick = async () => {
    if (!movieId || !selectedTime || selectedSeats.length === 0) {
      showToast("Please select seats and show time");
      return;
    }

    try {
      // Get auth token from localStorage or your auth system
      const token = localStorage.getItem('token'); // Adjust based on your auth implementation
      
      if (!token) {
        showToast("Please login to continue");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/bookings/create-checkout-session`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "token": token
          },
          body: JSON.stringify({
            movieId,
            movieTitle,
            date: date?.replace('-', ' '), // Convert back to "day month" format
            time: selectedTime,
            seats: selectedSeats,
            totalSeats: selectedSeats.length,
            amount: selectedSeats.length * 200, // Price per seat (adjust as needed)
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to create checkout session");
      }

      if (data.success && data.url) {
        // Redirect to Stripe checkout page
        window.location.href = data.url;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      showToast(err.message || "Checkout failed. Please try again.");
    }
  };


  const isCheckoutEnabled = selectedSeats.length > 0 && selectedTime !== '';

  return (
    <div className="min-h-screen text-white flex flex-row items-start justify-start py-10 px-4 gap-12 pl-20 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-[#EF3A55] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Show Times Card */}
      <div className="flex flex-col justify-start items-center mt-30">
        <div className="bg-opacity-10 rounded-xl shadow-sm p-7 flex flex-col items-center w-[240px] border border-[#EF3A55]/20">
          <div className="text-lg font-semibold mb-6 text-white">Available Timings</div>
          <div className="flex flex-col gap-3 w-full items-center">
            {[
              '12:30 PM',
              '04:00 PM',
              '07:30 PM',
              '09:00 PM',
              '01:00 AM',
            ].map((time) => (
              <div 
                key={time} 
                onClick={() => setSelectedTime(time)}
                className={`flex items-center gap-3 text-md font-medium px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 w-full ${
                  selectedTime === time 
                    ? 'bg-[#EF3A55] text-white' 
                    : 'text-white hover:bg-[#EF3A55]/20'
                }`}
              >
                <Clock size={18} className={selectedTime === time ? 'text-white' : 'text-[#EF3A55]'} />
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="flex flex-col items-center mt-30 ml-25">
        <div className="mb-6">
          <div className="bg-gray-700 text-center py-2 px-8 rounded-t-lg text-sm">
            SCREEN
          </div>
          <div className="h-1 bg-gradient-to-b from-gray-600 to-transparent"></div>
        </div>
        <div className="space-y-1">
          {rows.map((row) => (
            <SeatRow
              key={row}
              row={row}
              takenSeats={takenSeats}
              selectedSeats={selectedSeats}
              onSeatClick={handleSeatClick}
            />
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex gap-6 mt-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border border-[#EF3A55] rounded-md"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#EF3A55] border border-[#EF3A55] rounded-md"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>

      {/* Booking Summary - Right Side */}
      {/* {selectedSeats.length > 0 && ( */}
        <div className="flex flex-col justify-start items-center mt-30 ml-12">
          <div className=" border border-[#EF3A55]/20 rounded-lg p-6 w-[240px] h-[360px]">
            <div className="text-center">
              <div className="text-lg font-semibold mb-4">Booking Summary</div>
              {date && (
                <>
                  <div className="text-md text-gray-300 mb-2 ">Movie Date</div>
                  <div className="text-sm mb-5 font-semibold">{date}</div>
                </>
              )}
              {selectedSeats && (
                <>
                  <div className="text-md text-gray-300 mb-2">Selected Seats</div>
                  <div className="text-md font-semibold mb-4">{selectedSeats.join(', ')}</div>
                </>
              )}
              {selectedTime && (
                <>
                  <div className="text-sm text-gray-300 mb-2">Show Time</div>
                  <div className="text-md font-semibold">{selectedTime}</div>
                </>
              )}
            </div>
          </div>
        </div>

      {/* Proceed to Checkout Button - Always Visible */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 ml-8">
        <button 
          onClick={handleCheckoutClick}
          disabled={!isCheckoutEnabled}
          className={`font-md px-4 py-1 rounded-lg transition-all duration-200 shadow-lg ${
            isCheckoutEnabled 
              ? 'bg-[#EF3A55] hover:bg-[#EF3A55]/80 text-white cursor-pointer' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
          }`}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;