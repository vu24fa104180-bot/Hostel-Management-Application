import React, { useEffect, useState } from 'react';
import { getRooms } from '../../services/roomService';
import { getAllBookings } from '../../services/bookingService';
import { getAllComplaints } from '../../services/complaintService';
import { BedDouble, Users, MessageSquareWarning, DollarSign } from 'lucide-react';
import Loader from '../../components/common/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalBookings: 0,
    activeComplaints: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // In a real app, you might have a dedicated /admin/stats endpoint
      const [rooms, bookings, complaints] = await Promise.all([
        getRooms().catch(() => []),
        getAllBookings().catch(() => []),
        getAllComplaints().catch(() => [])
      ]);

      setStats({
        totalRooms: rooms.length,
        totalBookings: bookings.length,
        activeComplaints: complaints.filter(c => c.status !== 'resolved').length,
        revenue: bookings.length * 500, // Dummy calculation
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  const statCards = [
    { title: 'Total Rooms', value: stats.totalRooms, icon: BedDouble, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Students', value: stats.totalBookings, icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Pending Complaints', value: stats.activeComplaints, icon: MessageSquareWarning, color: 'text-orange-600', bg: 'bg-orange-100' },
    { title: 'Monthly Revenue', value: `$${stats.revenue}`, icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of hostel operations and statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button onClick={() => window.location.href='/admin/rooms'} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors font-medium">
              Manage Rooms Inventory
            </button>
            <button onClick={() => window.location.href='/admin/complaints'} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors font-medium">
              Review Student Complaints
            </button>
            <button onClick={() => window.location.href='/admin/bookings'} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition-colors font-medium">
              View All Allocations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
