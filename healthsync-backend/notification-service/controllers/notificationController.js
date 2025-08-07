// controllers/notificationController.js
const sendEmail = require('../utils/sendEmail');

exports.sendNotification = async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    await sendEmail({ to, subject, text: message });
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};