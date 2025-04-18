
const Server = require('../models/Server');

// Get all servers
exports.getAllServers = async (req, res) => {
  try {
    const servers = await Server.find();
    res.json(servers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new server
exports.createServer = async (req, res) => {
  const { name, ip_address, cpu_usage, ram_usage, disk_usage, network_in, network_out } = req.body;

  const server = new Server({ name, ip_address, cpu_usage, ram_usage, disk_usage, network_in, network_out });

  try {
    const newServer = await server.save();
    res.status(201).json(newServer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
