const { getDbState, memoryStore } = require('../config/database');
const CareerRoadmap = require('../models/CareerRoadmap');
const seedData = require('../seeds/seedData');

const getAllRoadmaps = async (req, res, next) => {
  try {
    const { branch, category, knownSkills } = req.query;
    const { useMemoryStore } = getDbState();

    let list = [];
    if (useMemoryStore) {
      if (!memoryStore.roadmaps.length) {
        memoryStore.roadmaps = seedData.roadmaps;
      }
      list = [...memoryStore.roadmaps];
    } else {
      list = await CareerRoadmap.find();
      if (!list.length) {
        await CareerRoadmap.insertMany(seedData.roadmaps);
        list = await CareerRoadmap.find();
      }
    }

    // Dynamic Combined Filtering Logic
    const cleanBranch = branch && branch !== 'Any' ? branch.trim() : null;
    const cleanCategory = category && category !== 'All' ? category.trim().toLowerCase() : null;
    const cleanSkill = knownSkills ? knownSkills.trim().toLowerCase() : null;

    const filteredList = list.filter(r => {
      // 1. Branch Match: Matches if 'Any' or if r.branches contains selected branch
      const matchesBranch = !cleanBranch || (r.branches && r.branches.includes(cleanBranch));

      // 2. Category Match: Matches if 'All' or if r.category matches
      const matchesCategory = !cleanCategory || (r.category && r.category.toLowerCase() === cleanCategory);

      // 3. Known Skill Match: Matches if skill query is contained in requiredSkills or level topics
      const matchesSkill = !cleanSkill || (
        (r.requiredSkills && r.requiredSkills.some(sk => sk.toLowerCase().includes(cleanSkill))) ||
        (r.title && r.title.toLowerCase().includes(cleanSkill))
      );

      return matchesBranch && matchesCategory && matchesSkill;
    });

    res.json(filteredList);
  } catch (error) {
    next(error);
  }
};

const getRoadmapBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { useMemoryStore } = getDbState();

    let roadmap;
    if (useMemoryStore) {
      roadmap = memoryStore.roadmaps.find(r => r.slug === slug);
      if (!roadmap) {
        roadmap = seedData.roadmaps.find(r => r.slug === slug);
      }
    } else {
      roadmap = await CareerRoadmap.findOne({ slug });
    }

    if (!roadmap) {
      return res.status(404).json({ error: 'Career roadmap not found.' });
    }

    res.json(roadmap);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRoadmaps,
  getRoadmapBySlug
};
