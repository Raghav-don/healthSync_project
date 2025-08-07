// models/EHR.js
const mongoose = require('mongoose');

const ehrSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId },
  diagnosis: { type: String, required: true },
  prescriptions: [String],
  allergies: [String],
  vitals: {
    temperature: Number,
    bloodPressure: String,
    heartRate: Number
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('EHR', ehrSchema);