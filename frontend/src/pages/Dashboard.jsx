import React from 'react';
import AlertSummary from '../components/AlertSummary';
import MetricsChart from '../components/MetricsChart';
import NetworkChart from '../components/NetworkChart';
import ServerTable from '../components/ServerTable';
import GaugeChart from '../components/GaugeChart';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-4">
  <h1 className="text-3xl font-bold mb-6">Server Monitoring Dashboard</h1>

  {/* AlertSummary Section */}
  <div className="bg-indigo-100 p-4 rounded-xl shadow-sm mb-4">
    <AlertSummary />
  </div>

  {/* Charts Row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div className="bg-indigo-100 p-4 rounded-xl shadow-sm">
      <MetricsChart />
    </div>
    <div className="bg-indigo-100 p-4 rounded-xl shadow-sm">
      <NetworkChart />
    </div>
  </div>

  {/* Gauges Section */}
  <div className="bg-indigo-100 p-4 rounded-xl shadow-sm mt-4">
    <GaugeChart />
  </div>

  {/* Server Table Section */}
  <div className="bg-indigo-100 p-4 rounded-xl shadow-sm mt-4">
    <ServerTable />
  </div>
</div>

  );
};

export default Dashboard;
