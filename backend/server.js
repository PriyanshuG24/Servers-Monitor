const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import MongoDB connection
require('./config/db');  // This will establish the connection to MongoDB

const port = 5000;

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://ai-news-letter-agent.vercel.app", 
  "http://localhost:5173", 
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.options("*", cors());

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
