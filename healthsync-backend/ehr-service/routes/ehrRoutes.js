// routes/ehrRoutes.js
const express = require('express');
const { createEHR, getEHRByPatient, updateEHR } = require('../controllers/ehrController');
const router = express.Router();

router.post('/', createEHR);
router.get('/patient/:patientId', getEHRByPatient);
router.put('/:id', updateEHR);

module.exports = router;