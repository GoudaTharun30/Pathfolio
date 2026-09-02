const { getDbState, memoryStore } = require('../config/database');
const Profile = require('../models/Profile');

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { useMemoryStore } = getDbState();

    if (useMemoryStore) {
      let prof = memoryStore.profiles.find(p => p.userId === userId);
      if (!prof) {
        prof = {
          _id: 'prof_' + userId,
          userId: userId,
          basicInfo: { fullName: req.user.name, email: req.user.email },
          education: [],
          skills: ['HTML5', 'CSS3', 'JavaScript'],
          experience: [],
          projects: [],
          certifications: [],
          achievements: [],
          links: {},
          careerPreferences: {},
          activeRoadmapId: 'fullstack-developer'
        };
        memoryStore.profiles.push(prof);
      }
      return res.json(prof);
    } else {
      let prof = await Profile.findOne({ userId });
      if (!prof) {
        prof = await Profile.create({
          userId,
          basicInfo: { fullName: req.user.name, email: req.user.email },
          skills: ['HTML5', 'CSS3', 'JavaScript'],
          activeRoadmapId: 'fullstack-developer'
        });
      }
      return res.json(prof);
    }
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;
    const { useMemoryStore } = getDbState();

    if (useMemoryStore) {
      let prof = memoryStore.profiles.find(p => p.userId === userId);
      if (prof) {
        Object.assign(prof, updateData);
        prof.updatedAt = new Date();
      } else {
        prof = { ...updateData, userId, updatedAt: new Date() };
        memoryStore.profiles.push(prof);
      }
      return res.json({ message: 'Profile updated successfully!', profile: prof });
    } else {
      const prof = await Profile.findOneAndUpdate(
        { userId },
        { $set: { ...updateData, updatedAt: new Date() } },
        { new: true, upsert: true }
      );
      return res.json({ message: 'Profile updated successfully!', profile: prof });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile
};
