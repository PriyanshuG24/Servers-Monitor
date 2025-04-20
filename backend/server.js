const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import MongoDB connection
require('./config/db');  // This will establish the connection to MongoDB

const app = express();
const port = 5000;
app.use(express.json());
const allowedOrigins = [
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

// app.options("*", cors());

// ... All your existing imports and middleware setup above

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

mongoose.connection.once('open', () => {
  console.log('Connecting to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    // ✅ Log all registered routes safely
    const routes = [];
    app._router?.stack.forEach((middleware) => {
      if (middleware.route) {
        // Routes registered directly on the app
        const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
        routes.push(`${methods} ${middleware.route.path}`);
      } else if (middleware.name === 'router') {
        // Routes added via router.use()
        middleware.handle.stack.forEach((handler) => {
          const route = handler.route;
          if (route) {
            const methods = Object.keys(route.methods).join(', ').toUpperCase();
            routes.push(`${methods} ${route.path}`);
          }
        });
      }
    });

    console.log('Registered Routes:');
    routes.forEach(r => console.log(' -', r));
  });
});

