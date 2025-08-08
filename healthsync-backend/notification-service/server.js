// notification-service/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/notifications', notificationRoutes);

const PORT = 7003;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});