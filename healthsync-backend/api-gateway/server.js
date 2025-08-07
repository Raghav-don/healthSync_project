// api-gateway/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Logging middleware (optional but helpful)
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.originalUrl}`);
  next();
});

// Gateway routes
app.use('/api/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true
}));

app.use('/api/appointments', createProxyMiddleware({
  target: process.env.APPOINTMENT_SERVICE_URL,
  changeOrigin: true
}));

app.use('/api/ehr', createProxyMiddleware({
  target: process.env.EHR_SERVICE_URL,
  changeOrigin: true
}));

app.use('/api/notifications', createProxyMiddleware({
  target: process.env.NOTIFICATION_SERVICE_URL,
  changeOrigin: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});