const { getDbState, memoryStore } = require('../config/database');
const Profile = require('../models/Profile');
const LearningPlan = require('../models/LearningPlan');
const aiService = require('../services/ai/aiService');

const chatWithAi = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Message prompt is required.' });
    }

    const { useMemoryStore } = getDbState();
    let profileData, planData;

    if (useMemoryStore) {
      profileData = memoryStore.profiles.find(p => p.userId === userId);
      planData = memoryStore.learningPlans.find(lp => lp.userId === userId);
    } else {
      profileData = await Profile.findOne({ userId });
      planData = await LearningPlan.findOne({ userId });
    }

    const completedTasksCount = planData?.tasks?.filter(t => t.completed)?.length || 0;
    const totalTasksCount = planData?.tasks?.length || 0;

    const userContext = {
      fullName: profileData?.basicInfo?.fullName || req.user.name,
      activeRoadmapTitle: planData?.roadmapTitle || 'Full Stack Developer',
      skills: profileData?.skills || ['HTML5', 'CSS3', 'JavaScript'],
      learningProgress: `${completedTasksCount}/${totalTasksCount} tasks completed`
    };

    const reply = await aiService.chat(prompt, userContext);

    res.json({
      reply,
      userContextSummary: {
        roadmap: userContext.activeRoadmapTitle,
        skillsCount: userContext.skills.length
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chatWithAi
};
