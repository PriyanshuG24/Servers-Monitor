const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import MongoDB connection
require('./config/db');  // This will establish the connection to MongoDB

const app = express();
const port = 5000;

// Define allowed origins
res.setHeader('Access-Control-Allow-Origin', 'https://servers-monitor.vercel.app/');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Pre-flight request handling
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
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
