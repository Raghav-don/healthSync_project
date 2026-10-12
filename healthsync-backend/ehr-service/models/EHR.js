// ehr-service/models/EHR.js
const mongoose = require('mongoose');

const ehrSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId },
    doctorName: { type: String, default: 'Unknown' },
    diagnosis: { type: String, required: true },
    prescriptions: [
      {
        medicine: String,
        dosage: String,
        duration: String,
        instructions: String,
      },
    ],
    allergies: [String],
    vitals: {
      temperature: { type: Number },
      bloodPressure: { type: String },
      heartRate: { type: Number },
      weight: { type: Number },
      height: { type: Number },
      oxygenSaturation: { type: Number },
    },
    labReports: [
      {
        testName: String,
        result: String,
        date: Date,
      },
    ],
    notes: { type: String, default: '' },
    followUpDate: { type: Date },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EHR', ehrSchema);