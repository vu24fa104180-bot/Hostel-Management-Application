import React from 'react';
import { Users, LayoutGrid, CheckCircle, XCircle } from 'lucide-react';

const RoomCard = ({ room, onBook }) => {
  const isAvailable = room.availableBeds > 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Room {room.roomNumber}</h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <LayoutGrid className="w-4 h-4" /> Floor {room.floor}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
          isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isAvailable ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          {isAvailable ? 'Available' : 'Full'}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 flex items-center gap-2">
            <Users className="w-4 h-4" /> Sharing Type
          </span>
          <span className="font-medium text-gray-900">{room.sharing} Person</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Available Beds</span>
          <span className="font-medium text-gray-900">{room.availableBeds}</span>
        </div>
        {room.price && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Price/Month</span>
            <span className="font-bold text-primary-600">${room.price}</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onBook(room)}
        disabled={!isAvailable}
        className={`w-full py-2.5 rounded-xl font-medium transition-colors ${
          isAvailable 
            ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-600/20' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isAvailable ? 'Book Now' : 'No Beds Available'}
      </button>
    </div>
  );
};

export default RoomCard;
