// user-service/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
//const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('User Service DB connected'))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);
//app.use('/api/auth', authRoutes);

const PORT = 7001;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});