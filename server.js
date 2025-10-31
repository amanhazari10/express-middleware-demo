// Middleware Implementation for Logging and Bearer Token Authentication
// Express.js Server

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const VALID_TOKEN = 'mysecrettoken';

// ============================================
// MIDDLEWARE 1: Logging Middleware
// ============================================
// This middleware logs the HTTP method, request URL, and timestamp for every incoming request
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next(); // Pass control to the next middleware or route handler
};

// Apply logging middleware globally to all routes
app.use(loggingMiddleware);

// ============================================
// MIDDLEWARE 2: Bearer Token Authentication Middleware
// ============================================
// This middleware checks for a valid Bearer token in the Authorization header
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      error: 'Authorization header is missing'
    });
  }
  
  // Extract the token from the Authorization header
  // Expected format: "Bearer <token>"
  const token = authHeader.split(' ')[1];
  
  // Check if token is provided
  if (!token) {
    return res.status(401).json({
      error: 'Bearer token is missing'
    });
  }
  
  // Validate the token
  if (token !== VALID_TOKEN) {
    return res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
  
  // Token is valid, proceed to the next middleware or route handler
  next();
};

// ============================================
// ROUTES
// ============================================

// Route 1: Public Route (No authentication required)
app.get('/public', (req, res) => {
  res.json({
    message: 'This is a public route, accessible to everyone'
  });
});

// Route 2: Protected Route (Requires Bearer token authentication)
app.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'You have accessed the protected route successfully!'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 Not Found handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error'
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`========================================\n`);
  console.log(`Available endpoints:\n`);
  console.log(`  Public Route:`);
  console.log(`    GET http://localhost:${PORT}/public\n`);
  console.log(`  Protected Route (requires Bearer token):`);
  console.log(`    GET http://localhost:${PORT}/protected\n`);
  console.log(`  Health Check:`);
  console.log(`    GET http://localhost:${PORT}/health\n`);
  console.log(`========================================\n`);
});

module.exports = app;
