import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms } from '../../services/roomService';
import RoomCard from '../../components/common/RoomCard';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const StudentRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (room) => {
    navigate(`/student/booking/${room._id || room.id}`, { state: { room } });
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Rooms</h1>
        <p className="text-gray-500 mt-1">Select a room and proceed to book a bed.</p>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">No rooms available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id || room.id} room={room} onBook={handleBook} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentRooms;
