
const Server = require('../models/Server');

// Get metrics (CPU, RAM, disk, network)
exports.getMetrics = async (req, res) => {
  try {
    const servers = await Server.find();
    const metrics = servers.map(server => ({
      name: server.name,
      cpu_usage: server.cpu_usage,
      ram_usage: server.ram_usage,
      disk_usage: server.disk_usage,
      network_in: server.network_in,
      network_out: server.network_out,
    }));

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
