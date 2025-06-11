import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const lineData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 700 },
  { name: 'May', value: 450 },
  { name: 'Jun', value: 650 },
];

export const UserActivityChart = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-2 cursor-pointer">
      <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">User Activity</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={lineData}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
