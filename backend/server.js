const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import MongoDB connection
require('./config/db');  // This will establish the connection to MongoDB

const app = express();
const port = 5000;

// Define allowed origins
const allowedOrigins = [
  "https://servers-monitor.vercel.app",  // Production frontend URL
  "http://localhost:5173",  // Local development frontend URL
];

// CORS options with dynamic origin check
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow requests with no origin (e.g., mobile apps or Postman)
      callback(null, true);
    } else {
      // Reject requests from other origins
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',  // Allow only the specified methods
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors());  // Pre-flight request handling
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
