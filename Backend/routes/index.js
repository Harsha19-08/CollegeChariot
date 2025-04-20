const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./auth');
const userRoutes = require('./user');
const busPassRoutes = require('./busPass');

// Define base paths
const routes = [
  { path: '/auth', router: authRoutes },
  { path: '/users', router: userRoutes },
  { path: '/buspass', router: busPassRoutes }
];

// Register all routes
routes.forEach(route => {
  router.use(route.path, route.router);
});

module.exports = router; 