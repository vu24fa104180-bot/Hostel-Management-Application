import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../../services/bookingService';
import Table from '../../components/common/Table';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      header: 'Booking Date', 
      render: (row) => new Date(row.createdAt).toLocaleDateString() 
    },
    { 
      header: 'Student Info', 
      render: (row) => (
        <div>
          <p className="font-semibold text-gray-900">{row.user?.name || 'N/A'}</p>
          <p className="text-xs text-gray-500">{row.user?.email || ''}</p>
        </div>
      )
    },
    { 
      header: 'Room Detail', 
      render: (row) => (
        <div>
          <p className="font-medium">Room {row.room?.roomNumber}</p>
          <p className="text-xs text-gray-500">Floor {row.room?.floor}</p>
        </div>
      )
    },
    { header: 'Bed Allocated', render: (row) => row.bedNumber || 'Assigned' },
    { 
      header: 'Payment Status', 
      render: (row) => (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          Paid
        </span>
      )
    }
  ];

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Bookings</h1>
        <p className="text-gray-500 mt-1">View all room allocations and student details.</p>
      </div>

      <Table columns={columns} data={bookings} keyField="_id" />
    </div>
  );
};

export default AdminBookings;
