// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const notificationRoutes = require('./routes/notificationRoutes');


const app = express(); // ✅ Define app before using it

app.use(cors());
app.use(express.json());

app.use('/api/notifications', notificationRoutes);


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));