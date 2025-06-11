import React from 'react';

const stats = [
  { title: 'Total Users', value: '2,847', change: '+12%', color: 'text-green-500' },
  { title: 'Active Projects', value: '89', change: '+7%', color: 'text-green-500' },
  { title: 'Monthly Revenue', value: '$283,429', change: '+23%', color: 'text-green-500' },
  { title: 'Pending Tasks', value: '154', change: '-2%', color: 'text-red-500' },
];

export const OverviewCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-2 cursor-pointer"
        >
          <div className="text-sm text-gray-500 dark:text-gray-300">{stat.title}</div>
          <div className="text-xl font-semibold text-gray-900 dark:text-white">{stat.value}</div>
          <div className={`text-xs ${stat.color}`}>{stat.change}</div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
