import React, { useEffect, useState } from 'react';
import { getServers } from '../api';

const ServerTable = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    getServers()
      .then(data => setServers(data))
      .catch(console.error);
  }, []);

  const getUsageColor = (value) => {
    if (value <= 30) return 'text-green-600 font-semibold';
    if (value <= 60) return 'text-blue-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  return (
    <div className="bg-teal-50 p-4 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Servers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr>
              {['Name', 'IP', 'CPU', 'RAM', 'Disk', 'In', 'Out', 'Updated'].map((head, idx) => (
                <th key={idx} className="px-4 py-2 border-b font-medium">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {servers.map((s, i) => (
              <tr key={i} className="hover:bg-gray-100">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.ip_address}</td>
                <td className={`px-4 py-2 ${getUsageColor(s.cpu_usage)}`}>{s.cpu_usage}%</td>
                <td className={`px-4 py-2 ${getUsageColor(s.ram_usage)}`}>{s.ram_usage}%</td>
                <td className={`px-4 py-2 ${getUsageColor(s.disk_usage)}`}>{s.disk_usage}%</td>
                <td className="px-4 py-2">{s.network_in} KB/s</td>
                <td className="px-4 py-2">{s.network_out} KB/s</td>
                <td className="px-4 py-2">{new Date(s.last_updated).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServerTable;
