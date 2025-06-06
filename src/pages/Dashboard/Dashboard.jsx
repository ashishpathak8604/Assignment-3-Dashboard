import React from 'react';
import OverviewCards from './OverviewCards';
import UserActivityChart from './UserActivityChart';
import TaskDistributionChart from './TaskDistributionChart';
import RecentActivityTable from './RecentActivityTable';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <OverviewCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserActivityChart />
        <TaskDistributionChart />
      </div>

      <RecentActivityTable />
    </div>
  );
};

export default Dashboard;
