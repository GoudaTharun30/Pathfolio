const { getDbState, memoryStore } = require('../config/database');
const Portfolio = require('../models/Portfolio');
const Profile = require('../models/Profile');
const aiService = require('../services/ai/aiService');

const getPortfolio = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { useMemoryStore } = getDbState();

    let userProfile, portfolioData;

    if (useMemoryStore) {
      userProfile = memoryStore.profiles.find(p => p.userId === userId);
      portfolioData = memoryStore.portfolios.find(p => p.userId === userId);
    } else {
      userProfile = await Profile.findOne({ userId });
      portfolioData = await Portfolio.findOne({ userId });
    }

    if (!portfolioData) {
      portfolioData = {
        templateId: 'developer',
        customConfig: {
          theme: 'dark',
          layout: 'modern',
          accentColor: '#6366f1',
          typography: 'Outfit, sans-serif',
          showHeroSection: true,
          showSkillsSection: true,
          showProjectsSection: true,
          showExperienceSection: true,
          showEducationSection: true,
          showContactSection: true,
          customHeroHeadline: 'Building Modern Web Applications',
          customBioSnippet: 'Passionate software developer focusing on modern web standards and clean code.'
        }
      };
    }

    res.json({
      portfolioConfig: portfolioData,
      profileData: userProfile
    });
  } catch (error) {
    next(error);
  }
};

const savePortfolio = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { templateId, customConfig } = req.body;
    const { useMemoryStore } = getDbState();

    if (useMemoryStore) {
      let p = memoryStore.portfolios.find(item => item.userId === userId);
      if (p) {
        if (templateId) p.templateId = templateId;
        if (customConfig) p.customConfig = customConfig;
        p.updatedAt = new Date();
      } else {
        p = { userId, templateId: templateId || 'developer', customConfig: customConfig || {}, updatedAt: new Date() };
        memoryStore.portfolios.push(p);
      }
      return res.json({ message: 'Portfolio configuration saved!', portfolio: p });
    } else {
      const p = await Portfolio.findOneAndUpdate(
        { userId },
        { $set: { templateId, customConfig, updatedAt: new Date() } },
        { new: true, upsert: true }
      );
      return res.json({ message: 'Portfolio configuration saved!', portfolio: p });
    }
  } catch (error) {
    next(error);
  }
};

const aiCustomizePortfolio = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Description prompt is required.' });
    }

    // AI parses description into safe structured JSON schema
    const aiConfig = await aiService.generatePortfolioConfig(prompt);

    res.json({
      message: 'AI Portfolio Configuration generated successfully!',
      aiConfig
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPortfolio,
  savePortfolio,
  aiCustomizePortfolio
};
