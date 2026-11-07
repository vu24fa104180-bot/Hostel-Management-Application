import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, getCurrentUser } from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-2 lg:hidden">
        <span className="text-xl font-bold text-primary-600">HostelApp</span>
      </div>
      <div className="hidden lg:block">
        {/* Placeholder for left side if needed */}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <div className="bg-primary-100 p-1.5 rounded-full text-primary-600">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium text-gray-700 capitalize">
            {user?.name || user?.role || 'Guest'}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
