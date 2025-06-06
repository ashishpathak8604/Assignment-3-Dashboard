import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'Pending',
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
  {
    name: 'Mike Lee',
    email: 'mike@example.com',
    role: 'Viewer',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
  {
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/40?img=4',
  },
];

const statusColor = {
  Active: 'text-green-600 bg-green-100',
  Pending: 'text-yellow-600 bg-yellow-100',
  Inactive: 'text-red-600 bg-red-100',
};

const tableTypes = [
  { value: 'basic', label: 'Basic Table' },
  { value: 'striped', label: 'Striped Table' },
  { value: 'grouped', label: 'Grouped by Role' },
];

function groupByRole(users) {
  return users.reduce((acc, user) => {
    acc[user.role] = acc[user.role] || [];
    acc[user.role].push(user);
    return acc;
  }, {});
}

const Tables = () => {
  const [tableType, setTableType] = useState('basic');

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm overflow-x-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Users Table</h2>
        <select
          className="border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          value={tableType}
          onChange={e => setTableType(e.target.value)}
        >
          {tableTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* Render the selected table type */}
      {tableType === 'basic' && (
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead>
            <tr className="text-gray-500 dark:text-gray-300 border-b bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="border-b last:border-none hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
                <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-gray-800 dark:text-gray-100">{user.name}</span>
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{user.email}</td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{user.role}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit">
                      <FaRegEdit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                      <MdDeleteOutline size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tableType === 'striped' && (
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead>
            <tr className="text-gray-500 dark:text-gray-300 border-b bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={idx}
                className={`border-b last:border-none transition-colors duration-150 ${
                  idx % 2 === 0
                    ? 'bg-white dark:bg-gray-900'
                    : 'bg-gray-50 dark:bg-gray-800'
                } hover:bg-blue-50 dark:hover:bg-blue-900`}
              >
                <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-gray-800 dark:text-gray-100">{user.name}</span>
                </td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{user.email}</td>
                <td className="p-3 text-gray-700 dark:text-gray-300">{user.role}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit">
                      <FaRegEdit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                      <MdDeleteOutline size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tableType === 'grouped' && (
        <div>
          {Object.entries(groupByRole(users)).map(([role, group]) => (
            <div key={role} className="mb-6">
              <div className="font-bold text-gray-700 dark:text-gray-200 mb-2">{role}</div>
              <table className="w-full text-sm text-left min-w-[600px] mb-2">
                <thead>
                  <tr className="text-gray-500 dark:text-gray-300 border-b bg-gray-50 dark:bg-gray-800">
                    <th className="p-3 font-medium">Name</th>
                    <th className="p-3 font-medium">Email</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {group.map((user, idx) => (
                    <tr
                      key={idx}
                      className={`border-b last:border-none hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors`}
                    >
                      <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-gray-800 dark:text-gray-100">{user.name}</span>
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[user.status]}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-3">
                          <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit">
                            <FaRegEdit size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                            <MdDeleteOutline size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tables;
