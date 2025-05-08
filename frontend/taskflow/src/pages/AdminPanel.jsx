import React from "react";

const AdminPanel = () => {
  // Sample data - replace with your actual data
  const stats = {
    totalUsers: 1248,
    activeToday: 342,
    newThisWeek: 128,
    adminUsers: 12,
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-indigo-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
        User Statistics
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Total Users Card */}
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="text-indigo-800 font-bold text-3xl">
            {stats.totalUsers}
          </div>
          <div className="text-gray-600 text-sm">Total Users</div>
        </div>

        {/* Active Today Card */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-green-800 font-bold text-3xl">
            {stats.activeToday}
          </div>
          <div className="text-gray-600 text-sm">Active Today</div>
        </div>

        {/* New This Week Card */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-blue-800 font-bold text-3xl">
            {stats.newThisWeek}
          </div>
          <div className="text-gray-600 text-sm">New This Week</div>
        </div>

        {/* Admin Users Card */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-purple-800 font-bold text-3xl">
            {stats.adminUsers}
          </div>
          <div className="text-gray-600 text-sm">Admin Users</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default AdminPanel;
