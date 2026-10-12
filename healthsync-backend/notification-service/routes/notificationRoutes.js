// notification-service/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { sendNotification, listNotifications } = require('../controllers/notificationController');

router.post('/send', sendNotification);
router.get('/', listNotifications);

module.exports = router;