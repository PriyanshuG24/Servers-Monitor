
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  severity: {
    type: String,
    enum: ['critical', 'medium', 'low'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;
