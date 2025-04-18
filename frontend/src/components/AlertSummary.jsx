import React, { useEffect, useState } from 'react';
import { getAlerts } from '../api';

const AlertSummary = () => {
  const [alerts, setAlerts] = useState({});

  useEffect(() => {
    getAlerts()
      .then(data => setAlerts(data))
      .catch(console.error);
  }, []);

  const countBySeverity = (level) => alerts[level] || 0;

  const getBgColor = (severity) => {
    switch (severity) {
      case 'critical':
        return '#BF0000'; // red
      case 'medium':
        return '#2b6cb0'; // blue
      case 'low':
        return '#00B050'; // green
      default:
        return '#ccc';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {['critical', 'medium', 'low'].map((severity, i) => (
        <div
          key={i}
          className="flex justify-center items-center p-4 rounded-xl shadow-md text-white"
          style={{ backgroundColor: getBgColor(severity) }}
        >
          <div className="text-center">
            <h3 className="text-3xl font-semibold capitalize text-white">{severity} server</h3>
            <p className="text-2xl font-bold text-white">{countBySeverity(severity)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertSummary;
