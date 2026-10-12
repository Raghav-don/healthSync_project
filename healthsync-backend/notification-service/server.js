// notification-service/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const notificationRoutes = require('./routes/notificationRoutes');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:7000'],
  credentials: true,
}));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'notification-service' }));

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Notification Service DB connected'))
    .catch((err) => console.warn('⚠️ Notification Service DB warning:', err.message));
}

app.use('/api/notifications', notificationRoutes);

app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 7003;
app.listen(PORT, () => {
  console.log(`🚀 Notification Service running on port ${PORT}`);
});