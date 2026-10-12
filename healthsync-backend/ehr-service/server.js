// ehr-service/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const ehrRoutes = require('./routes/ehrRoutes');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:7000'],
  credentials: true,
}));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'ehr-service' }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ EHR Service DB connected'))
  .catch((err) => {
    console.error('❌ EHR Service DB error:', err.message);
    process.exit(1);
  });

app.use('/api/ehr', ehrRoutes);

app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 7004;
app.listen(PORT, () => {
  console.log(`🚀 EHR Service running on port ${PORT}`);
});