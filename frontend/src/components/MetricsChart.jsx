import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MetricsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMetrics = async () => {
      const res = await fetch('/api/metrics');
      if (!res.ok) throw new Error('Failed to fetch metrics');
      const data = await res.json();
      setData(data);
    };
    getMetrics().catch(console.error);
  }, []);

  return (
    <div className="bg-teal-50 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">CPU, RAM, Disk Usage</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cpu_usage" stroke="#6b46c1" strokeWidth={3} />
          <Line type="monotone" dataKey="ram_usage" stroke="#38a169" strokeWidth={3} />
          <Line type="monotone" dataKey="disk_usage" stroke="#dd6b20" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;
