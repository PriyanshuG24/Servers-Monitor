
const Alert = require('../models/Alert');

// Get count of critical, medium, and low alerts
exports.getAlertCounts = async (req, res) => {
  try {
    const critical = await Alert.countDocuments({ severity: 'critical' });
    const medium = await Alert.countDocuments({ severity: 'medium' });
    const low = await Alert.countDocuments({ severity: 'low' });

    res.json({ critical, medium, low });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new alert
exports.createAlert = async (req, res) => {
  const { severity, message } = req.body;

  const alert = new Alert({ severity, message });

  try {
    const newAlert = await alert.save();
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
