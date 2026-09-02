const express = require('express');
const cors = require('cors');
const path = require('path');
const env = require('./config/environment');
const { connectDB } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

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

// Single Page Application Fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPublicPath, 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Connect DB and launch server
const startServer = async () => {
  await connectDB();
  
  app.listen(env.PORT, () => {
    console.log(`🚀 Pathfolio Server running at http://localhost:${env.PORT}`);
    console.log(`📱 Frontend accessible at http://localhost:${env.PORT}`);
  });
};

startServer();
