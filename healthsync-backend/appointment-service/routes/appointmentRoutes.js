const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Dummy in-memory storage (replace with DB)
const appointments = [];

/**
 * @route POST /api/appointments
 * @desc Book a new appointment
 * @access Private
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;

    // Basic field validation
    if (!doctor || !date || !time || !reason) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAppointment = {
      id: appointments.length + 1,
      user: req.user.email,
      doctor,
      date,
      time,
      reason,
      createdAt: new Date(),
    };

    appointments.push(newAppointment);

    // Optional: Notify user by sending to Notification Service
    /*
    await axios.post('http://localhost:7003/api/notify', {
      to: req.user.email,
      subject: 'Appointment Confirmation',
      message: `Your appointment with Dr. ${doctor} on ${date} at ${time} has been confirmed.`
    });
    */

    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Appointment booking error:', error.message);
    res.status(500).json({ message: 'Server error while booking appointment' });
  }
});

/**
 * @route GET /api/appointments
 * @desc Get all appointments of the logged-in user
 * @access Private
 */
router.get('/', authenticateToken, (req, res) => {
  const userAppointments = appointments.filter(app => app.user === req.user.email);
  res.json(userAppointments);
});

module.exports = router;