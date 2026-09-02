const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/paths', authMiddleware, learningController.getUserLearningPaths);
router.post('/generate', authMiddleware, learningController.generatePersonalizedPath);
router.patch('/paths/:pathId/topic-toggle', authMiddleware, learningController.toggleTopicCompletion);
router.post('/paths/set-active', authMiddleware, learningController.setActivePath);

// Alias route for backward compatibility
router.get('/', authMiddleware, learningController.getUserLearningPaths);

module.exports = router;
