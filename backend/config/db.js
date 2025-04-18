const mongoose = require('mongoose');
const { seedMockData } = require('../utils/mockDataSeeder');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log("MongoDB connected");
    await seedMockData(); 
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

module.exports = mongoose;
