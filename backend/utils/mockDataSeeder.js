const mongoose = require('mongoose');
const Server = require('../models/Server');
const Metric = require('../models/Metric');
const Alert = require('../models/Alert');

const seedMockData = async () => {
  try {
    
    await Server.deleteMany({});
    await Metric.deleteMany({});
    await Alert.deleteMany({});

    const servers = [
      { name: 'Zephyr-01', ip_address: '192.168.1.1', cpu_usage: 2, ram_usage: 20, disk_usage: 50, network_in: 500, network_out: 100 },
      { name: 'Apollo-02', ip_address: '192.168.1.2', cpu_usage: 20, ram_usage: 65, disk_usage: 70, network_in: 700, network_out: 200 },
      { name: 'Titan-03', ip_address: '192.168.1.3', cpu_usage: 60, ram_usage: 55, disk_usage: 40, network_in: 800, network_out: 300 },
      { name: 'Orion-04', ip_address: '192.168.1.4', cpu_usage: 45, ram_usage: 70, disk_usage: 25, network_in: 600, network_out: 150 },
      { name: 'Nebula-05', ip_address: '192.168.1.5', cpu_usage: 5, ram_usage: 20, disk_usage: 75, network_in: 1000, network_out: 500 },
      { name: 'Phoenix-06', ip_address: '192.168.1.6', cpu_usage: 55, ram_usage: 50, disk_usage: 65, network_in: 400, network_out: 120 },
      { name: 'Atlas-07', ip_address: '192.168.1.7', cpu_usage: 21, ram_usage: 26, disk_usage: 20, network_in: 720, network_out: 240 },
      { name: 'Vega-08', ip_address: '192.168.1.8', cpu_usage: 16, ram_usage: 30, disk_usage: 80, network_in: 900, network_out: 400 },
      { name: 'Comet-09', ip_address: '192.168.1.9', cpu_usage: 12, ram_usage: 72, disk_usage: 50, network_in: 550, network_out: 160 },
      { name: 'Echo-10', ip_address: '192.168.1.10', cpu_usage: 92, ram_usage: 85, disk_usage: 90, network_in: 1100, network_out: 600 }
    ];
    

    const savedServers = await Server.insertMany(servers);

   
    const metrics = [];

    for (let i = 9; i >= 0; i--) {
      const timestamp = new Date(Date.now() - i * 60000); 

      for (const server of savedServers) {
        metrics.push({
          server_id: server._id,
          cpu_usage: server.cpu_usage,
          ram_usage: server.ram_usage,
          disk_usage: server.disk_usage,
          network_in: server.network_in,
          network_out: server.network_out,
          timestamp,
        });
      }
    }

    await Metric.insertMany(metrics);

    
    const alerts = [
      { severity: 'critical', message: 'Server1 CPU usage is too high!' },
      { severity: 'medium', message: 'Server2 RAM usage is moderate.' },
      { severity: 'low', message: 'Server3 Network usage is stable.' },
      { severity: 'critical', message: 'Server4 CPU usage is critical!' },
      { severity: 'medium', message: 'Server5 RAM usage is moderate.' },
      { severity: 'low', message: 'Server6 Disk usage is stable.' },
      { severity: 'critical', message: 'Server7 CPU usage is very high!' },
      { severity: 'medium', message: 'Server8 RAM usage is increasing.' },
      { severity: 'low', message: 'Server9 Network out is normal.' },
      { severity: 'critical', message: 'Server10 Disk usage is critical!' }
    ];

    await Alert.insertMany(alerts);

    console.log('Mock data seeded successfully without fluctuation!');
  } catch (err) {
    console.error('Error seeding mock data:', err);
  }
};

module.exports = { seedMockData };
