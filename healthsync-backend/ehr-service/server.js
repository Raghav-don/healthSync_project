// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ehrRoutes = require('./routes/ehrRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ehr', ehrRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5002, () => console.log('EHR Service running on port 5002')))
  .catch(err => console.error(err));