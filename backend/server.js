const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import MongoDB connection
require('./config/db');  // This will establish the connection to MongoDB

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const alertRoutes = require('./routes/alertsRoutes');
const serverRoutes = require('./routes/serversRoutes');
const metricRoutes = require('./routes/metricsRoutes');
app.use('/api/alerts', alertRoutes);
app.use('/api/servers', serverRoutes);
app.use('/api/metrics', metricRoutes);

// Start server after MongoDB connection is established
mongoose.connection.once('open', () => {
  console.log('Connecting to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
