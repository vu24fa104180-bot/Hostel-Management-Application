import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { bookRoom } from '../../services/bookingService';
import { createPayment } from '../../services/paymentService';
import { getRoomById } from '../../services/roomService';
import { getCurrentUser } from '../../services/authService';
import toast from 'react-hot-toast';
import { CreditCard, CheckCircle, Info, Bed } from 'lucide-react';
import Loader from '../../components/common/Loader';

const Booking = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const [room, setRoom] = useState(location.state?.room || null);
  const [loading, setLoading] = useState(!location.state?.room);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedBed, setSelectedBed] = useState('');

  useEffect(() => {
    if (!room && roomId) {
      fetchRoom();
    } else if (room && !room.beds) {
      // we need bed info
      fetchRoom(room.roomNumber);
    }
  }, [roomId, room]);

  const fetchRoom = async (roomNo = roomId) => {
    try {
      setLoading(true);
      const data = await getRoomById(roomNo);
      setRoom(data);
    } catch (error) {
      toast.error('Failed to load room details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  if (!room) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Room details not found. Please go back and select a room.</p>
        <button 
          onClick={() => navigate('/student/rooms')}
          className="mt-4 text-primary-600 font-medium hover:underline"
        >
          Back to Rooms
        </button>
      </div>
    );
  }

  const handlePaymentAndBooking = async () => {
    if (!selectedBed) {
      toast.error('Please select an available bed first');
      return;
    }

    setProcessing(true);
    try {
      // Simulating payment process via API
      await createPayment({
        studentRegNo: user.regNo,
        amount: room.price || 500
      });
      
      // Book the room
      await bookRoom({ 
        studentRegNo: user.regNo,
        roomNumber: room.roomNumber,
        bedNumber: Number(selectedBed)
      });
      
      setSuccess(true);
      toast.success('Room booked successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book room');
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-8">
          Your payment was successful and Bed {selectedBed} in Room {room.roomNumber} has been allocated to you.
        </p>
        <button
          onClick={() => navigate('/student/my-room')}
          className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20"
        >
          View My Room
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Booking</h1>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">Room Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Room Number</span>
            <span className="font-semibold text-gray-900">{room.roomNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Floor</span>
            <span className="font-medium text-gray-900">{room.floorNumber || room.floor}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Sharing Type</span>
            <span className="font-medium text-gray-900">{room.sharing} Person</span>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bed</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {room.beds?.map(bed => (
                <button
                  key={bed.bedNumber}
                  disabled={!bed.isAvailable}
                  onClick={() => setSelectedBed(bed.bedNumber)}
                  className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                    !bed.isAvailable ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                    selectedBed === bed.bedNumber ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20' : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'
                  }`}
                >
                  <Bed className="w-5 h-5" />
                  <span className="text-xs font-semibold">Bed {bed.bedNumber}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="text-gray-900 font-medium">Total Amount to Pay</span>
            <span className="text-2xl font-bold text-primary-600">${room.price || '500'}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 text-blue-800 rounded-xl p-4 flex items-start gap-3 mb-8 text-sm">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>By clicking "Pay & Book", you agree to the hostel terms and conditions. The amount is non-refundable after 7 days of booking.</p>
      </div>

      <button
        onClick={handlePaymentAndBooking}
        disabled={processing || !selectedBed}
        className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <CreditCard className="w-5 h-5" />
        {processing ? 'Processing...' : 'Pay & Book Securely'}
      </button>
    </div>
  );
};

export default Booking;
