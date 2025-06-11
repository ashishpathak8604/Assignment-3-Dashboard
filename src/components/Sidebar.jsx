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
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white h-60 w-60 px-4 py-6 transition-colors duration-300">
      <h1 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        <Link to="/">AdminPro</Link>
      </h1>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                ${isActive
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-500 dark:text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
