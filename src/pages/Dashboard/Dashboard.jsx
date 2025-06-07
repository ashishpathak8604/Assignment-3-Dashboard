import React, { useEffect } from 'react';
import OverviewCards from './OverviewCards';
import UserActivityChart from './UserActivityChart';
import TaskDistributionChart from './TaskDistributionChart';
import RecentActivityTable from './RecentActivityTable';

const Dashboard = () => {
    useEffect(() => {
    const alertShown = localStorage.getItem('dashboardAlertShown');
    if (!alertShown) {
      alert('This page is under work. It is not my full work and will be completed by week 4.');
      localStorage.setItem('dashboardAlertShown', 'true');
    }
  }, []);

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
