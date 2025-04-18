
const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ip_address: {
    type: String,
    required: true,
  },
  cpu_usage: {
    type: Number,
    required: true,
  },
  ram_usage: {
    type: Number,
    required: true,
  },
  disk_usage: {
    type: Number,
    required: true,
  },
  network_in: {
    type: Number,
    required: true,
  },
  network_out: {
    type: Number,
    required: true,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  }
});

const Server = mongoose.model('Server', serverSchema);
module.exports = Server;
