// notification-service/models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['appointment_booked', 'appointment_confirmed', 'appointment_cancelled', 'general'],
      default: 'general',
    },
    referenceId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, enum: ['sent', 'failed', 'pending'], default: 'pending' },
    emailSent: { type: Boolean, default: false },
    error: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
