// ehr-service/routes/ehrRoutes.js  — FIXED: import EHR model
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {
  createEHR,
  getEHRByPatient,
  getMyEHR,
  updateEHR,
  deleteEHR,
} = require('../controllers/ehrController');

// Patient reads own records
router.get('/my', authenticate, getMyEHR);

// Doctor/admin creates EHR for a patient
router.post('/', authenticate, createEHR);

// Get all EHR records for a specific patient (doctor/admin)
router.get('/patient/:patientId', authenticate, getEHRByPatient);

// Update a specific EHR record
router.put('/:id', authenticate, updateEHR);

// Delete a specific EHR record (admin only)
router.delete('/:id', authenticate, deleteEHR);

module.exports = router;