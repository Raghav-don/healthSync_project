// routes/ehrRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

router.get('/records', authenticate, async (req, res) => {
  const records = await EHR.find({ userId: req.user.id });
  res.json(records);
});

router.post('/records', authenticate, async (req, res) => {
  const record = new EHR({ userId: req.user.id, ...req.body });
  await record.save();
  res.status(201).json(record);
});

module.exports = router;