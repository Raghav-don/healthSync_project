// ehr-service/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const ehrRoutes = require('./routes/ehrRoutes');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('EHR Service DB connected'))
  .catch(err => console.error(err));

app.use('/api/ehr', ehrRoutes);

const PORT = 7004;
app.listen(PORT, () => {
  console.log(`EHR Service running on port ${PORT}`);
});