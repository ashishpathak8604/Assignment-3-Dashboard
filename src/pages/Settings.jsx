import React from "react";

const Settings = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Settings</h2>
      <form className="space-y-6">
        {/* Example: Profile Info Section */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="john.doe@email.com"
          />
        </div>
        {/* Example: Theme Selection */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-2">Theme</label>
          <select className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
            <option>System Default</option>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
