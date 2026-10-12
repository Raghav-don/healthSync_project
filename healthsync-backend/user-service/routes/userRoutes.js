// user-service/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getDoctors,
  getDoctorById,
} = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctorById);

module.exports = router;