// Editable user table with working edit/delete
import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

const initialUsers = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/40?img=1' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Pending', avatar: 'https://i.pravatar.cc/40?img=2' },
  { name: 'Mike Lee', email: 'mike@example.com', role: 'Viewer', status: 'Inactive', avatar: 'https://i.pravatar.cc/40?img=3' },
  { name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/40?img=4' },
];

const statusOptions = ['Active', 'In Progress', 'Pending', 'Inactive'];

const statusColor = {
  Active: 'text-green-600 bg-green-100',
  Pending: 'text-yellow-600 bg-yellow-100',
  Inactive: 'text-red-600 bg-red-100',
  'In Progress': 'text-blue-600 bg-blue-100',
};

export default function EditableTable() {
  const [users, setUsers] = useState(initialUsers);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editStatus, setEditStatus] = useState('');

  const handleDelete = (index) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditStatus(users[index].status);
  };

  const saveEdit = (index) => {
    const updated = [...users];
    updated[index].status = editStatus;
    setUsers(updated);
    setEditingIndex(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Editable Users Table</h2>
      <table className="w-full text-sm text-left min-w-[600px]">
        <thead>
          <tr className="text-gray-500 dark:text-gray-300 border-b bg-gray-50 dark:bg-gray-800">
            <th className="p-3 font-medium">Name</th>
            <th className="p-3 font-medium">Email</th>
            <th className="p-3 font-medium">Role</th>
            <th className="p-3 font-medium">Status</th>
            <th className="p-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b last:border-none hover:bg-blue-50 dark:hover:bg-blue-900">
              <td className="p-3 flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="text-gray-800 dark:text-gray-100">{user.name}</span>
              </td>
              <td className="p-3 text-gray-700 dark:text-gray-300">{user.email}</td>
              <td className="p-3 text-gray-700 dark:text-gray-300">{user.role}</td>
              <td className="p-3">
                {editingIndex === index ? (
                  <select
                    className="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                ) : (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[user.status]}`}>
                    {user.status}
                  </span>
                )}
              </td>
              <td className="p-3">
                <div className="flex gap-3">
                  {editingIndex === index ? (
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => saveEdit(index)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => startEdit(index)}
                    >
                      <FaRegEdit size={18} />
                    </button>
                  )}
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(index)}
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
