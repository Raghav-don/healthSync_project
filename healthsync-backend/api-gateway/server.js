// api-gateway/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    gateway: 'running',
    timestamp: new Date().toISOString(),
    routes: {
      users: 'http://localhost:7001',
      appointments: 'http://localhost:7002',
      notifications: 'http://localhost:7003',
      ehr: 'http://localhost:7004'
    }
  });
});

// Proxy routes: in http-proxy-middleware v3, use createProxyMiddleware('/api/...', { target, changeOrigin })
app.use(createProxyMiddleware({
  target: 'http://localhost:7001',
  changeOrigin: true,
  pathFilter: '/api/users'
}));
app.use(createProxyMiddleware({
  target: 'http://localhost:7001',
  changeOrigin: true,
  pathFilter: '/api/auth'
}));
app.use(createProxyMiddleware({
  target: 'http://localhost:7002',
  changeOrigin: true,
  pathFilter: '/api/appointments'
}));
app.use(createProxyMiddleware({
  target: 'http://localhost:7004',
  changeOrigin: true,
  pathFilter: '/api/ehr'
}));
app.use(createProxyMiddleware({
  target: 'http://localhost:7003',
  changeOrigin: true,
  pathFilter: '/api/notifications'
}));

const PORT = process.env.PORT || 7010;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway active and routing on port ${PORT}`);
});