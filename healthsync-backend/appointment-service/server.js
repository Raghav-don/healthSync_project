// appointment-service/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Appointment Service DB connected'))
  .catch(err => console.error(err));

app.use('/api/appointments', appointmentRoutes);

const PORT = 7002;
app.listen(PORT, () => {
  console.log(`Appointment Service running on port ${PORT}`);
});