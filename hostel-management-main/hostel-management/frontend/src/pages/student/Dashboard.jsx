import React from 'react';
import { getCurrentUser } from '../../services/authService';

const StudentDashboard = () => {
  const user = getCurrentUser();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-500">
            Here's what's happening with your hostel accommodation today.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-hover cursor-pointer" onClick={() => window.location.href='/student/rooms'}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Find a Room</h3>
          <p className="text-sm text-gray-500">Browse available rooms and book your bed.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-hover cursor-pointer" onClick={() => window.location.href='/student/my-room'}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">My Allocation</h3>
          <p className="text-sm text-gray-500">View your current room and roommate details.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 card-hover cursor-pointer" onClick={() => window.location.href='/student/complaints'}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Need Help?</h3>
          <p className="text-sm text-gray-500">Raise a complaint to the administration.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
