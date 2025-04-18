const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  server_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Server',
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
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Metric = mongoose.model('Metric', metricSchema);
module.exports = Metric;
