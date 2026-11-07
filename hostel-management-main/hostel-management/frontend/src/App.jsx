import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from './components/layout/MainLayout';

// Auth
import Login from './pages/auth/Login';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentRooms from './pages/student/Rooms';
import StudentBooking from './pages/student/Booking';
import StudentMyRoom from './pages/student/MyRoom';
import StudentComplaints from './pages/student/Complaints';
import StudentPayments from './pages/student/Payments';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminRooms from './pages/admin/Rooms';
import AdminBookings from './pages/admin/Bookings';
import AdminComplaints from './pages/admin/Complaints';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Student Routes */}
        <Route path="/student" element={<MainLayout allowedRole="student" />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="rooms" element={<StudentRooms />} />
          <Route path="booking/:roomId" element={<StudentBooking />} />
          <Route path="my-room" element={<StudentMyRoom />} />
          <Route path="complaints" element={<StudentComplaints />} />
          <Route path="payments" element={<StudentPayments />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<MainLayout allowedRole="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="rooms" element={<AdminRooms />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="complaints" element={<AdminComplaints />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
