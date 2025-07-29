import React, { useState } from "react";
import screenImage from "../assets/screenImage.svg";

const rows: string[] = ["A", "B", "C", "D", "E", "F", "G"];
const seatsPerRow: Record<string, number> = {
  A: 9,
  B: 9,
  C: 18,
  D: 18,
  E: 18,
  F: 18,
  G: 18,
  H:15
};


interface SeatProps {
  id: string;
  isTaken: boolean;
  onClick: (id: string) => void;
}

const Seat: React.FC<SeatProps> = ({ id, isTaken, onClick }) => {
  return (
    <div
      className={`w-6 h-6 border border-[#EF3A55] rounded-md mx-[2px] my-[3px] transition-colors duration-200 text-2xl font-bold cursor-pointer ${
        isTaken ? "bg-[#EF3A55]" : "hover:bg-[#EF3A55]"
      }`}
      title={id}
      onClick={() => onClick(id)}
    ></div>
  );
};

interface SeatRowProps {
  row: string;
  takenSeats: string[];
  onSeatClick: (id: string) => void;
}

const SeatRow: React.FC<SeatRowProps> = ({ row, takenSeats, onSeatClick }) => {
  const seatCount: number = seatsPerRow[row];
  const seats: JSX.Element[] = [];

  for (let i = 1; i <= seatCount; i++) {
    if (i === 10 && seatCount === 18) {
      seats.push(<div key={`${row}-gap`} className="w-6 h-6 mx-6"></div>);
    }

    const seatId = `${row}${i}`;
    const isTaken = takenSeats.includes(seatId);

    seats.push(
      <Seat key={seatId} id={seatId} isTaken={isTaken} onClick={onSeatClick} />
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
  const [takenSeats, setTakenSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    setTakenSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="mt-50 min-h-screen  text-white flex flex-col items-center py-10 px-4">
      <div className="mb-4">
        <img src={screenImage} alt="Screen" />
      </div>
      <div className="space-y-1">
        {rows.map((row) => (
          <SeatRow
            key={row}
            row={row}
            takenSeats={takenSeats}
            onSeatClick={handleSeatClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SeatLayout;
