const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import MongoDB connection
require('./config/db');  // Establish MongoDB connection

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // replace with your actual frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Routes
const alertRoutes = require('./routes/alertsRoutes');
const serverRoutes = require('./routes/serversRoutes');
const metricRoutes = require('./routes/metricsRoutes');

app.use('/api/alerts', alertRoutes);
app.use('/api/servers', serverRoutes);
app.use('/api/metrics', metricRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server after DB is connected
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
