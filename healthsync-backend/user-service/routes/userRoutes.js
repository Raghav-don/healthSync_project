// user-service/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// ❌ One of these might be undefined if not exported properly
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;