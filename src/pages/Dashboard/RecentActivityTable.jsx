import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const initialActivities = [
  { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/40?img=3', action: 'Created new project', date: '2 hours ago', status: 'Completed' },
  { name: 'Michael Chen', avatar: 'https://i.pravatar.cc/40?img=5', action: 'Updated task status', date: '4 hours ago', status: 'In Progress' },
  { name: 'Emily Davis', avatar: 'https://i.pravatar.cc/40?img=7', action: 'Added new comment', date: '6 hours ago', status: 'Pending' },
  { name: 'David Lee', avatar: 'https://i.pravatar.cc/40?img=8', action: 'Archived old files', date: '1 day ago', status: 'Completed' },
  { name: 'Anna Smith', avatar: 'https://i.pravatar.cc/40?img=10', action: 'Changed user permissions', date: '2 days ago', status: 'In Progress' },
  { name: 'John Doe', avatar: 'https://i.pravatar.cc/40?img=12', action: 'Deleted a task', date: '3 days ago', status: 'Pending' },
  { name: 'Priya Patel', avatar: 'https://i.pravatar.cc/40?img=15', action: 'Uploaded documents', date: '4 days ago', status: 'Completed' },
  { name: 'Carlos Ruiz', avatar: 'https://i.pravatar.cc/40?img=20', action: 'Commented on issue', date: '5 days ago', status: 'In Progress' },
];

const statusStyles = {
  Completed: 'bg-green-100 text-green-600',
  'In Progress': 'bg-blue-100 text-blue-600',
  Pending: 'bg-yellow-100 text-yellow-600',
};

const statusOptions = ['Completed', 'In Progress', 'Pending'];

export const RecentActivityTable = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [editIndex, setEditIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setSelectedStatus(activities[index].status);
    setModalOpen(true);
  };

  const handleSave = () => {
    setActivities((prev) =>
      prev.map((item, idx) => (idx === editIndex ? { ...item, status: selectedStatus } : item))
    );
    setModalOpen(false);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setActivities((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md overflow-x-auto">
      <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Recent Activity</h3>
      <table className="w-full text-sm text-left min-w-[600px]">
        <thead>
          <tr className="text-gray-500 dark:text-gray-300 border-b bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
            <th className="p-3 font-medium">Name</th>
            <th className="p-3 font-medium">Action</th>
            <th className="p-3 font-medium">Date</th>
            <th className="p-3 font-medium">Status</th>
            <th className="p-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item, index) => (
            <tr
              key={index}
              className={`border-b transition duration-150 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-blue-50 dark:hover:bg-blue-900`}
            >
              <td className="p-3 whitespace-nowrap flex items-center gap-3">
                <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-gray-800 dark:text-white">{item.name}</span>
              </td>
              <td className="p-3 text-gray-700 dark:text-gray-300">{item.action}</td>
              <td className="p-3 text-gray-700 dark:text-gray-300">{item.date}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[item.status]}`}>
                  {item.status}
                </span>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleEdit(index)} className="text-blue-600 hover:text-blue-800" title="Edit">
                    <FaRegEdit size={18} />
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-800" title="Delete">
                    <MdDeleteOutline size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-80">
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Edit Status</h4>
            <select
              className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-800 dark:text-white"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivityTable;