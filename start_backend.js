const { spawn } = require('child_process');
const path = require('path');

const services = [
  { name: 'User Service', dir: 'healthsync-backend/user-service', file: 'server.js', port: 7001 },
  { name: 'Appointment Service', dir: 'healthsync-backend/appointment-service', file: 'server.js', port: 7002 },
  { name: 'Notification Service', dir: 'healthsync-backend/notification-service', file: 'server.js', port: 7003 },
  { name: 'EHR Service', dir: 'healthsync-backend/ehr-service', file: 'server.js', port: 7004 },
  { name: 'API Gateway', dir: 'healthsync-backend/api-gateway', file: 'server.js', port: 7010 },
];

console.log('🚀 Starting HealthSync Microservices Fleet...');

services.forEach(svc => {
  const cwd = path.join(__dirname, svc.dir);
  const child = spawn('node', [svc.file], {
    cwd,
    stdio: 'inherit',
    env: { ...process.env, PORT: svc.port }
  });

  child.on('error', err => {
    console.error(`❌ Failed to start ${svc.name}:`, err.message);
  });

  child.on('exit', (code, signal) => {
    console.log(`[${svc.name}] Exited with code ${code} / signal ${signal}`);
  });
});
