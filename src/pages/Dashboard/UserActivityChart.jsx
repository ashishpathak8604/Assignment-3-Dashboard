import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 700 },
  { name: 'May', value: 450 },
  { name: 'Jun', value: 650 },
];

const UserActivityChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm transition-all duration-200 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer">
      <h3 className="text-sm font-semibold mb-2">User Activity</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
