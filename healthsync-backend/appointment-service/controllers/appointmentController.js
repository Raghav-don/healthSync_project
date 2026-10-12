// appointment-service/controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const axios = require('axios');

const NOTIFICATION_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:7003';

// POST /api/appointments — book a new appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, doctorName, specialization, date, time, reason, patientName, patientEmail, consultationFee } = req.body;

    if (!doctorName || !date || !time || !reason) {
      return res.status(400).json({ message: 'Doctor name, date, time, and reason are required.' });
    }

    const appointment = new Appointment({
      patientId: req.user.userId,
      patientName: patientName || req.user.email,
      patientEmail: patientEmail || req.user.email,
      doctorId,
      doctorName,
      specialization: specialization || 'General',
      date,
      time,
      reason,
      consultationFee: consultationFee || 500,
      status: 'pending',
    });

    await appointment.save();

    // Trigger notification (non-blocking)
    axios
      .post(`${NOTIFICATION_URL}/api/notifications/send`, {
        to: appointment.patientEmail,
        subject: 'Appointment Booking Confirmation – HealthSync',
        message: `Dear ${appointment.patientName},\n\nYour appointment with ${doctorName} (${specialization}) has been booked successfully.\n\nDate: ${date}\nTime: ${time}\nStatus: Pending Confirmation\n\nThank you for choosing HealthSync.\n\nRegards,\nHealthSync Team`,
        type: 'appointment_booked',
        referenceId: appointment._id,
      })
      .catch((err) => console.warn('[Notification skipped]', err.message));

    res.status(201).json({
      message: 'Appointment booked successfully.',
      appointment,
    });
  } catch (err) {
    console.error('[Book Appointment Error]', err);
    res.status(500).json({ message: 'Failed to book appointment.', error: err.message });
  }
};

// GET /api/appointments — get appointments for logged-in patient
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments.', error: err.message });
  }
};

// GET /api/appointments/doctor — get appointments for logged-in doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.userId }).sort({ date: 1, time: 1 });
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments.', error: err.message });
  }
};

// GET /api/appointments/:id — get a single appointment
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });
    // Allow patient or doctor to view
    if (
      appointment.patientId.toString() !== req.user.userId &&
      appointment.doctorId?.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    res.json({ appointment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointment.', error: err.message });
  }
};

// PATCH /api/appointments/:id/status — update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });

    appointment.status = status;
    if (notes) appointment.notes = notes;
    await appointment.save();

    res.json({ message: 'Status updated successfully.', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status.', error: err.message });
  }
};

// DELETE /api/appointments/:id — cancel/delete appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found.' });
    if (appointment.patientId.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }
    appointment.status = 'cancelled';
    await appointment.save();
    res.json({ message: 'Appointment cancelled successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel appointment.', error: err.message });
  }
};

// GET /api/appointments/stats — dashboard stats for admin/doctor
const getStats = async (req, res) => {
  try {
    const total = await Appointment.countDocuments();
    const pending = await Appointment.countDocuments({ status: 'pending' });
    const confirmed = await Appointment.countDocuments({ status: 'confirmed' });
    const completed = await Appointment.countDocuments({ status: 'completed' });
    const cancelled = await Appointment.countDocuments({ status: 'cancelled' });
    res.json({ total, pending, confirmed, completed, cancelled });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats.', error: err.message });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  getStats,
};