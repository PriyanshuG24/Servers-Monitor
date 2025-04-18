import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMetrics } from '../api';

const NetworkChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMetrics()
      .then(data => setData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-teal-50 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Network Traffic</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="network_in" stroke="#2c7a7b" strokeWidth={3} />
          <Line type="monotone" dataKey="network_out" stroke="#e53e3e" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetworkChart;
