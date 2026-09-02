const { getDbState, memoryStore } = require('../config/database');
const Resume = require('../models/Resume');
const Profile = require('../models/Profile');
const aiService = require('../services/ai/aiService');

const getResume = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { useMemoryStore } = getDbState();

    let userProfile, resumeData;

    if (useMemoryStore) {
      userProfile = memoryStore.profiles.find(p => p.userId === userId);
      resumeData = memoryStore.resumes.find(r => r.userId === userId);
    } else {
      userProfile = await Profile.findOne({ userId });
      resumeData = await Resume.findOne({ userId });
    }

    if (!resumeData) {
      resumeData = {
        templateId: 'software-developer',
        customConfig: {
          focusArea: 'Software Engineering',
          fontStyle: 'Inter, sans-serif',
          accentColor: '#1e293b',
          spacing: 'compact'
        }
      };
    }

    res.json({
      resumeConfig: resumeData,
      profileData: userProfile
    });
  } catch (error) {
    next(error);
  }
};

const saveResume = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { templateId, customConfig } = req.body;
    const { useMemoryStore } = getDbState();

    if (useMemoryStore) {
      let r = memoryStore.resumes.find(item => item.userId === userId);
      if (r) {
        if (templateId) r.templateId = templateId;
        if (customConfig) r.customConfig = customConfig;
        r.updatedAt = new Date();
      } else {
        r = { userId, templateId: templateId || 'software-developer', customConfig: customConfig || {}, updatedAt: new Date() };
        memoryStore.resumes.push(r);
      }
      return res.json({ message: 'Resume configuration saved!', resume: r });
    } else {
      const r = await Resume.findOneAndUpdate(
        { userId },
        { $set: { templateId, customConfig, updatedAt: new Date() } },
        { new: true, upsert: true }
      );
      return res.json({ message: 'Resume configuration saved!', resume: r });
    }
  } catch (error) {
    next(error);
  }
};

const aiCustomizeResume = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const aiConfig = await aiService.generateResumeConfig(prompt);
    res.json({
      message: 'AI Resume Configuration generated successfully!',
      aiConfig
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResume,
  saveResume,
  aiCustomizeResume
};
