// notification-service/controllers/notificationController.js
const Notification = require('../models/Notification');
const sendEmail = require('../utils/sendEmail');

// POST /api/notifications/send
exports.sendNotification = async (req, res) => {
  const { to, subject, message, type, referenceId } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ message: 'to, subject, and message are required.' });
  }

  // Save to DB immediately
  const notification = new Notification({
    to,
    subject,
    message,
    type: type || 'general',
    referenceId,
    status: 'pending',
  });

  try {
    await notification.save();

    // Try sending email (non-blocking for caller, but we update status)
    try {
      await sendEmail({ to, subject, text: message });
      notification.status = 'sent';
      notification.emailSent = true;
    } catch (emailErr) {
      console.warn('[Email Send Failed]', emailErr.message);
      notification.status = 'failed';
      notification.error = emailErr.message;
    }
    await notification.save();

    res.status(200).json({
      message: 'Notification processed.',
      emailSent: notification.emailSent,
      notificationId: notification._id,
    });
  } catch (err) {
    console.error('[Notification Error]', err);
    res.status(500).json({ message: 'Failed to process notification.', error: err.message });
  }
};

// GET /api/notifications — list notifications (for admin)
exports.listNotifications = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    const total = await Notification.countDocuments();
    res.json({ notifications, total, page: parseInt(page) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notifications.', error: err.message });
  }
};