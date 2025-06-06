// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiGrid,
  FiTable,
  FiPieChart,
  FiCalendar,
  FiCheckSquare,
} from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', icon: <FiGrid />, path: '/' },
  { name: 'Tables', icon: <FiTable />, path: '/tables' },
  { name: 'Charts', icon: <FiPieChart />, path: '/charts' },
  { name: 'Calendar', icon: <FiCalendar />, path: '/calendar' },
  { name: 'Kanban', icon: <FiCheckSquare />, path: '/kanban' },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-64 min-h-screen bg-white shadow-md p-4">
      <h1 className="text-xl font-bold mb-6">AdminPro</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition ${
              pathname === item.path ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
