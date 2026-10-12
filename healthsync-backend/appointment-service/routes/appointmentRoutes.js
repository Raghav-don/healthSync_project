// appointment-service/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  getStats,
} = require('../controllers/appointmentController');

router.get('/stats', authenticate, getStats);
router.post('/', authenticate, bookAppointment);
router.get('/', authenticate, getMyAppointments);
router.get('/doctor', authenticate, getDoctorAppointments);
router.get('/:id', authenticate, getAppointmentById);
router.patch('/:id/status', authenticate, updateAppointmentStatus);
router.delete('/:id', authenticate, cancelAppointment);

module.exports = router;