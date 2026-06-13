require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employees');
const leaveRoutes = require('./routes/leave');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5006;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotella_hr';

mongoose.connect(MONGO_URI)
  .then(() => console.log('HR Service: Connected to MongoDB'))
  .catch((err) => console.error('HR Service: MongoDB connection error:', err));

app.get('/api/hr/health', (req, res) => {
  res.json({ service: 'hr-service', status: 'OK', db_connected: mongoose.connection.readyState === 1 });
});

app.use('/api/hr/login', authRoutes);
app.use('/api/hr/employees', employeeRoutes);
app.use('/api/hr/leave', leaveRoutes);

app.listen(PORT, () => {
  console.log(`HR Service running on port ${PORT}`);
});
