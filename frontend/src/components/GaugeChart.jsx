import React, { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const GaugeChart = () => {
  const [data, setData] = useState([]);
  const URL= import.meta.env.VITE_BACKEND_URL; 
  useEffect(() => {
    const getMetrics = async () => {
      try {
        const res = await fetch(`${URL}/api/metrics`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch metrics');
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getMetrics();
  }, []);

  if (data.length === 0) return null;

  const total = data.reduce(
    (acc, item) => ({
      cpu: acc.cpu + item.cpu_usage,
      ram: acc.ram + item.ram_usage,
      disk: acc.disk + item.disk_usage,
    }),
    { cpu: 0, ram: 0, disk: 0 }
  );

  const avgCpu = total.cpu / data.length;
  const avgRam = total.ram / data.length;
  const avgDisk = total.disk / data.length;

  const getStatusText = (value) => {
    if (value <= 35) return { text: "Good", color: "text-green-600" };
    if (value <= 75) return { text: "Moderate", color: "text-blue-600" };
    return { text: "Critical", color: "text-red-600" };
  };

  const UsageGauge = ({ label, value }) => {
    const status = getStatusText(value);
    return (
      <div className="flex flex-col items-center w-full max-w-sm p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-2">{label}</h3>
        <ReactSpeedometer
          minValue={0}
          maxValue={100}
          value={value}
          currentValueText={`${value.toFixed(1)}%`}
          needleColor="#2d3748"
          segments={25}
          segmentColors={['#00B050', '#2b6cb0', '#BF0000']}
          height={180}
          ringWidth={15}
          needleHeightRatio={0.7}
        />
        <p className={`mt-2 text-md font-medium ${status.color}`}>{status.text}</p>
      </div>
    );
  };

  return (
    <div className="bg-teal-50 p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-6 text-center">System Health Gauges</h2>
      <div className="flex flex-wrap justify-around gap-y-8">
        <UsageGauge label="CPU Usage" value={avgCpu} />
        <UsageGauge label="RAM Usage" value={avgRam} />
        <UsageGauge label="Disk Usage" value={avgDisk} />
      </div>
    </div>
  );
};

export default GaugeChart;
