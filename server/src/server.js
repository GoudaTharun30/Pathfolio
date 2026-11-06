const express = require('express');
const cors = require('cors');
const path = require('path');
const env = require('./config/environment');
const { connectDB } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const { clerkMiddleware } = require('@clerk/express');

// Route imports
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const learningRoutes = require('./routes/learningRoutes');
const projectRoutes = require('./routes/projectRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk middleware — must come before any route that uses getAuth()
app.use(clerkMiddleware({
  publishableKey: env.CLERK_PUBLISHABLE_KEY,
  secretKey: env.CLERK_SECRET_KEY
}));

// Serve the Clerk JS browser bundle locally (avoids CDN dependency)
const clerkJsPath = path.join(__dirname, '../../node_modules/@clerk/clerk-js/dist');
app.use('/clerk-js', express.static(clerkJsPath));

// Serve static frontend files
const clientPublicPath = path.join(__dirname, '../../client/public');
app.use(express.static(clientPublicPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/learning-plan', learningRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/ai', aiRoutes);

// Healthcheck API
app.get('/api/healthcheck', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Pathfolio',
    aiProvider: env.AI_PROVIDER,
    timestamp: new Date()
  });
});

// Public Config API for Clerk publishable key
app.get('/api/config', (req, res) => {
  res.json({
    clerkPublishableKey: env.CLERK_PUBLISHABLE_KEY || ''
  });
});

// Single Page Application Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPublicPath, 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Connect DB and launch server
let server;
const startServer = async () => {
  await connectDB();
  
  server = app.listen(env.PORT, () => {
    console.log(`🚀 Pathfolio Server running at http://localhost:${env.PORT}`);
    console.log(`📱 Frontend accessible at http://localhost:${env.PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${env.PORT} is already in use by another running process.`);
      console.error(`   👉 Please close the existing process running on port ${env.PORT} or change PORT in .env.`);
    } else {
      console.error(`❌ Server listener error:`, err.message);
    }
    process.exit(1);
  });
};

const gracefulShutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}. Gracefully closing Pathfolio server...`);
  if (server) {
    server.close(async () => {
      try {
        const mongoose = require('mongoose');
        if (mongoose.connection && mongoose.connection.readyState !== 0) {
          await mongoose.connection.close(false);
          console.log('📦 MongoDB connection closed cleanly.');
        }
      } catch (err) {
        console.error('Error closing MongoDB connection:', err.message);
      }
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

startServer();

