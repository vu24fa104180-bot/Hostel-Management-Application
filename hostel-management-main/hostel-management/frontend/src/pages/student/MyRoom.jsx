import React, { useEffect, useState } from 'react';
import { getMyBooking } from '../../services/bookingService';
import Loader from '../../components/common/Loader';
import { Building, MapPin, Users, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentUser } from '../../services/authService';

const MyRoom = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    fetchMyBooking();
  }, []);

  const fetchMyBooking = async () => {
    try {
      const data = await getMyBooking(user.regNo);
      setBooking(data);
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error('Failed to load room details');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  if (!booking) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Room Allocated</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          You haven't booked any room yet. Browse available rooms and secure your accommodation.
        </p>
        <button 
          onClick={() => window.location.href = '/student/rooms'}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20"
        >
          View Available Rooms
        </button>
      </div>
    );
  }

  const room = booking.room || {};

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Accommodation</h1>
      
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Building className="w-48 h-48" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-6 mb-6">
          <div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
              Active Allocation
            </span>
            <h2 className="text-4xl font-bold text-gray-900">Room {room?.roomNumber || booking?.roomNumber}</h2>
          </div>
          <div className="text-left md:text-right mt-4 md:mt-0">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <p className="font-semibold text-green-600 capitalize">Active</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Floor Location</p>
                <p className="font-semibold text-gray-900 text-lg">Floor {room?.floorNumber || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sharing Type</p>
                <p className="font-semibold text-gray-900 text-lg">{room?.sharing || 'N/A'} Person Sharing</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Bed Number</p>
                <p className="font-semibold text-gray-900 text-lg">{booking.bedNumber || 'Assigned on arrival'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Booking Date</p>
                <p className="font-semibold text-gray-900 text-lg">
                  {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRoom;
