import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 400 },
  { month: 'Feb', sales: 800 },
  { month: 'Mar', sales: 600 },
  { month: 'Apr', sales: 1000 },
  { month: 'May', sales: 700 },
  { month: 'Jun', sales: 900 },
];

const revenueData = [
  { name: 'Jan', revenue: 2400 },
  { name: 'Feb', revenue: 1398 },
  { name: 'Mar', revenue: 9800 },
  { name: 'Apr', revenue: 3908 },
  { name: 'May', revenue: 4800 },
  { name: 'Jun', revenue: 3800 },
];

const userTypeData = [
  { name: 'Admin', value: 400 },
  { name: 'Editor', value: 300 },
  { name: 'Viewer', value: 300 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

const sum = arr => arr.reduce((a, b) => a + b, 0);
const avg = arr => (arr.length ? (sum(arr) / arr.length).toFixed(2) : 0);

const getStats = (type) => {
  if (type === 'line') {
    const salesArr = salesData.map(d => d.sales);
    return {
      total: sum(salesArr),
      average: avg(salesArr),
      max: Math.max(...salesArr),
      min: Math.min(...salesArr),
    };
  }
  if (type === 'bar') {
    const revenueArr = revenueData.map(d => d.revenue);
    return {
      total: sum(revenueArr),
      average: avg(revenueArr),
      max: Math.max(...revenueArr),
      min: Math.min(...revenueArr),
    };
  }
  if (type === 'pie') {
    const total = sum(userTypeData.map(d => d.value));
    return {
      total,
      breakdown: userTypeData.map(d => `${d.name}: ${d.value}`).join(', '),
    };
  }
  return {};
};

const chartTabs = [
  { key: 'line', label: 'Sales Trends' },
  { key: 'bar', label: 'Monthly Revenue' },
  { key: 'pie', label: 'User Types' },
];

const Charts = () => {
  const [activeTab, setActiveTab] = useState('line');
  const [reportOpen, setReportOpen] = useState(false);

  const renderReport = () => {
    const stats = getStats(activeTab);
    return (
      <div>
        <h4 className="font-semibold mb-2">
          {activeTab === 'line' && 'Sales Trends Report'}
          {activeTab === 'bar' && 'Monthly Revenue Report'}
          {activeTab === 'pie' && 'User Types Report'}
        </h4>
        <ul className="text-sm">
          {activeTab !== 'pie' ? (
            <>
              <li>Total: <span className="font-medium">{stats.total}</span></li>
              <li>Average: <span className="font-medium">{stats.average}</span></li>
              <li>Max: <span className="font-medium">{stats.max}</span></li>
              <li>Min: <span className="font-medium">{stats.min}</span></li>
            </>
          ) : (
            <>
              <li>Total Users: <span className="font-medium">{stats.total}</span></li>
              <li>Breakdown: <span className="font-medium">{stats.breakdown}</span></li>
            </>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-6 border-b">
        {chartTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm relative text-black dark:text-gray-100">

        <button
          className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
          onClick={() => setReportOpen(true)}
        >
          Report
        </button>

        {activeTab === 'line' && (
          <>
            <h3 className="text-sm font-semibold mb-2">Sales Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}

        {activeTab === 'bar' && (
          <>
            <h3 className="text-sm font-semibold mb-2">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}

        {activeTab === 'pie' && (
          <>
            <h3 className="text-sm font-semibold mb-2">User Types</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </div>

      {reportOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-black dark:text-gray-100">

            {renderReport()}
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
              onClick={() => setReportOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;
