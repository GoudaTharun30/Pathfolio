const { getDbState, memoryStore } = require('../config/database');
const UserLearningPath = require('../models/UserLearningPath');
const CareerRoadmap = require('../models/CareerRoadmap');
const seedData = require('../seeds/seedData');
const plannerAlgorithm = require('../services/plannerAlgorithm');

const generatePersonalizedPath = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { roadmapSlug, durationLabel, durationWeeks, dailyHoursLabel, hoursPerWeek } = req.body;

    if (!roadmapSlug) {
      return res.status(400).json({ error: 'Roadmap slug is required.' });
    }

    const { useMemoryStore } = getDbState();
    let roadmap;

    if (useMemoryStore) {
      roadmap = memoryStore.roadmaps.find(r => r.slug === roadmapSlug) || seedData.roadmaps.find(r => r.slug === roadmapSlug);
    } else {
      roadmap = await CareerRoadmap.findOne({ slug: roadmapSlug });
    }

    if (!roadmap) {
      return res.status(404).json({ error: 'Career roadmap not found.' });
    }

    const weeks = Number(durationWeeks) || 12;
    const hpw = Number(hoursPerWeek) || 14;

    // Run priority time-based scheduling algorithm
    const scheduleResult = plannerAlgorithm.generatePersonalizedSchedule(roadmap, weeks, hpw);

    const newPath = {
      _id: 'path_' + Date.now(),
      userId,
      roadmapSlug: roadmap.slug,
      roadmapTitle: roadmap.title,
      durationLabel: durationLabel || '3 Months',
      durationWeeks: weeks,
      dailyHoursLabel: dailyHoursLabel || '2 hours/day',
      hoursPerWeek: hpw,
      totalCapacityHours: scheduleResult.totalCapacityHours,
      progress: 0,
      isActive: true,
      weeks: scheduleResult.weeks,
      createdAt: new Date()
    };

    if (useMemoryStore) {
      if (!memoryStore.learningPlans) memoryStore.learningPlans = [];
      // Deactivate previous paths for this user
      memoryStore.learningPlans.forEach(p => { if (p.userId === userId) p.isActive = false; });
      memoryStore.learningPlans.push(newPath);
      return res.status(201).json({ message: `Personalized Learning Path for ${roadmap.title} created!`, path: newPath });
    } else {
      await UserLearningPath.updateMany({ userId }, { $set: { isActive: false } });
      const createdPath = await UserLearningPath.create(newPath);
      return res.status(201).json({ message: `Personalized Learning Path for ${roadmap.title} created!`, path: createdPath });
    }
  } catch (error) {
    next(error);
  }
};

const getUserLearningPaths = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { useMemoryStore } = getDbState();

    let paths = [];
    if (useMemoryStore) {
      if (!memoryStore.learningPlans) memoryStore.learningPlans = [];
      paths = memoryStore.learningPlans.filter(p => p.userId === userId);
    } else {
      paths = await UserLearningPath.find({ userId }).sort({ createdAt: -1 });
    }

    // If user has no path yet, generate default Full Stack path
    if (!paths.length) {
      const defaultRoadmap = seedData.roadmaps[0];
      const sched = plannerAlgorithm.generatePersonalizedSchedule(defaultRoadmap, 12, 14);
      const defaultPath = {
        _id: 'path_default_' + userId,
        userId,
        roadmapSlug: defaultRoadmap.slug,
        roadmapTitle: defaultRoadmap.title,
        durationLabel: '3 Months',
        durationWeeks: 12,
        dailyHoursLabel: '2 hours/day',
        hoursPerWeek: 14,
        totalCapacityHours: sched.totalCapacityHours,
        progress: 0,
        isActive: true,
        weeks: sched.weeks,
        createdAt: new Date()
      };

      if (useMemoryStore) {
        memoryStore.learningPlans.push(defaultPath);
      } else {
        await UserLearningPath.create(defaultPath);
      }
      paths = [defaultPath];
    }

    res.json(paths);
  } catch (error) {
    next(error);
  }
};

const toggleTopicCompletion = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { pathId } = req.params;
    const { topicId } = req.body;
    if (typeof topicId !== 'string' || !topicId.trim()) {
      return res.status(400).json({ error: 'A valid topic identifier is required.' });
    }
    const { useMemoryStore } = getDbState();

    let path;
    if (useMemoryStore) {
      path = memoryStore.learningPlans.find(p => p._id.toString() === pathId && p.userId === userId);
    } else {
      path = await UserLearningPath.findOne({ _id: pathId, userId });
    }

    if (!path) {
      return res.status(404).json({ error: 'Learning path not found.' });
    }

    let totalTopics = 0;
    let completedTopics = 0;

    let topicFound = false;
    path.weeks.forEach(w => {
      w.topics.forEach(t => {
        if (t.topicId === topicId) {
          t.completed = !t.completed;
          topicFound = true;
        }
        totalTopics++;
        if (t.completed) completedTopics++;
      });
    });

    if (!topicFound) {
      return res.status(404).json({ error: 'Topic is not part of this learning path.' });
    }

    const newProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    path.progress = newProgress;

    if (!useMemoryStore && path.save) {
      await path.save();
    }

    res.json({ message: 'Progress updated!', path });
  } catch (error) {
    next(error);
  }
};

const setActivePath = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { pathId } = req.body;
    const { useMemoryStore } = getDbState();

    if (useMemoryStore) {
      memoryStore.learningPlans.forEach(p => {
        if (p.userId === userId) {
          p.isActive = (p._id.toString() === pathId);
        }
      });
      return res.json({ message: 'Active career path updated!' });
    } else {
      await UserLearningPath.updateMany({ userId }, { $set: { isActive: false } });
      await UserLearningPath.findOneAndUpdate({ _id: pathId, userId }, { $set: { isActive: true } });
      return res.json({ message: 'Active career path updated!' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generatePersonalizedPath,
  getUserLearningPaths,
  toggleTopicCompletion,
  setActivePath
};
