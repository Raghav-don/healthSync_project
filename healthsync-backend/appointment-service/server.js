// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/appointments', appointmentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(7002, () => console.log('Appointment Service running on port 7002')))
  .catch(err => console.error(err));