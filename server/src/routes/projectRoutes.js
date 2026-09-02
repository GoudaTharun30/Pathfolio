const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, projectController.getRecommendedProjects);
router.get('/recommendations', authMiddleware, projectController.getRecommendedProjects);
router.get('/:id', authMiddleware, projectController.getProjectById);
router.post('/complete', authMiddleware, projectController.completeProject);

module.exports = router;
