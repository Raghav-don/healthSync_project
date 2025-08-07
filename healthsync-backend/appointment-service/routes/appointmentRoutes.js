// routes/appointmentRoutes.js
const express = require('express');
const {
  createAppointment,
  getAppointmentsByUser,
  updateStatus
} = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', createAppointment);
router.get('/user/:userId', getAppointmentsByUser);
router.put('/:id/status', updateStatus);

module.exports = router;