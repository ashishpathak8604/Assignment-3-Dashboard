import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Completed', value: 400 },
  { name: 'In Progress', value: 300 },
  { name: 'Pending', value: 300 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export const TaskDistributionChart = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-2 cursor-pointer">
      <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Task Distribution</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            outerRadius={70}
            innerRadius={40}
            paddingAngle={5}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};


export default TaskDistributionChart;
