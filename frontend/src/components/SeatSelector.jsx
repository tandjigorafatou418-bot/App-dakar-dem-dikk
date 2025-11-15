import React, { useState } from "react";

export default function SeatSelector({ onSelect }) {
  const totalSeats = 36; // nombre total de sièges par bus
  const occupiedSeats = [3, 7, 15, 20, 25]; // Exemple — à venir de la BD plus tard
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSelect = (seat) => {
    if (occupiedSeats.includes(seat)) return;
    setSelectedSeat(seat);
    onSelect(seat);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Choisissez votre place 🪑
      </h3>

      <div className="grid grid-cols-4 gap-3 justify-items-center mb-6">
        {Array.from({ length: totalSeats }).map((_, i) => {
          const num = i + 1;
          const isOccupied = occupiedSeats.includes(num);
          const isSelected = selectedSeat === num;

          return (
            <button
              key={num}
              onClick={() => handleSelect(num)}
              disabled={isOccupied}
              className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                isOccupied
                  ? "bg-red-400 text-white cursor-not-allowed"
                  : isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-green-400 text-white hover:bg-green-500"
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-400 rounded"></div> <span>Libre</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 rounded"></div> <span>Occupée</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div> <span>Choisie</span>
        </div>
      </div>
    </div>
  );
}
