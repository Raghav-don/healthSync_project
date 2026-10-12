// appointment-service/models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId },
    doctorName: { type: String, required: true },
    specialization: { type: String, default: 'General' },
    date: { type: String, required: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // HH:MM
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    notes: { type: String, default: '' },
    consultationFee: { type: Number, default: 500 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);