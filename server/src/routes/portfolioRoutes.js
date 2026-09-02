const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, portfolioController.getPortfolio);
router.post('/save', authMiddleware, portfolioController.savePortfolio);
router.post('/ai-customize', authMiddleware, portfolioController.aiCustomizePortfolio);

module.exports = router;
