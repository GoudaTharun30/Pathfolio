const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, resumeController.getResume);
router.post('/save', authMiddleware, resumeController.saveResume);
router.post('/ai-customize', authMiddleware, resumeController.aiCustomizeResume);

module.exports = router;
