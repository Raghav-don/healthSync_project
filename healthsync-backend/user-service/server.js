// user-service/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:7000'],
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'user-service' }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ User Service DB connected'))
  .catch((err) => {
    console.error('❌ User Service DB connection error:', err.message);
    process.exit(1);
  });

app.use('/api/users', userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});