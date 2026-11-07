import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BedDouble, 
  ClipboardList, 
  MessageSquareWarning, 
  CreditCard,
  Building
} from 'lucide-react';
import { getCurrentUser } from '../../services/authService';

const Sidebar = () => {
  const user = getCurrentUser();
  const isAdmin = user?.role === 'admin';

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'View Rooms', path: '/student/rooms', icon: BedDouble },
    { name: 'My Room', path: '/student/my-room', icon: Building },
    { name: 'Complaints', path: '/student/complaints', icon: MessageSquareWarning },
    { name: 'Payments', path: '/student/payments', icon: CreditCard },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Rooms', path: '/admin/rooms', icon: BedDouble },
    { name: 'Bookings', path: '/admin/bookings', icon: ClipboardList },
    { name: 'Complaints', path: '/admin/complaints', icon: MessageSquareWarning },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 hidden lg:flex lg:flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            H
          </div>
          <span className="text-xl font-bold text-gray-900">HostelApp</span>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Menu
        </p>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
