// api-gateway/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use('/api/users', createProxyMiddleware({ target: 'http://localhost:7001', changeOrigin: true }));
app.use('/api/auth', createProxyMiddleware({ target: 'http://localhost:7001', changeOrigin: true }));
app.use('/api/appointments', createProxyMiddleware({ target: 'http://localhost:7002', changeOrigin: true }));
app.use('/api/ehr', createProxyMiddleware({ target: 'http://localhost:7004', changeOrigin: true }));
app.use('/api/notifications', createProxyMiddleware({ target: 'http://localhost:7003', changeOrigin: true }));

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});