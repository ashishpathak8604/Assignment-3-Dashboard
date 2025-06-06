import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Completed', value: 400 },
  { name: 'In Progress', value: 300 },
  { name: 'Pending', value: 300 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

const TaskDistributionChart = () => {
  return (
   <div className="bg-white p-4 rounded-lg shadow-sm transition-all duration-200 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer">
  <h3 className="text-sm font-semibold mb-2">Task Distribution</h3>
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        outerRadius={70}
        innerRadius={40}
        fill="#8884d8"
        paddingAngle={5}
      >
        {data.map((entry, index) => (
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
