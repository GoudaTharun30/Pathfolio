const { getDbState, memoryStore } = require('../config/database');
const ProjectRecommendation = require('../models/ProjectRecommendation');
const Profile = require('../models/Profile');
const seedData = require('../seeds/seedData');

const getRecommendedProjects = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    let { roadmapSlug } = req.query;
    const { useMemoryStore } = getDbState();

    // If no roadmapSlug provided in query, check user's active roadmap from profile
    if (!roadmapSlug && userId) {
      let userProfile;
      if (useMemoryStore) {
        userProfile = memoryStore.profiles?.find(p => p.userId === userId);
      } else {
        userProfile = await Profile.findOne({ userId });
      }
      roadmapSlug = userProfile?.activeRoadmapId || 'frontend-developer';
    }

    if (!roadmapSlug) {
      roadmapSlug = 'frontend-developer';
    }

    let matchedProjects = [];
    if (useMemoryStore) {
      if (!memoryStore.projectRecommendations || memoryStore.projectRecommendations.length < seedData.projects.length) {
        memoryStore.projectRecommendations = [...seedData.projects];
      }
      matchedProjects = memoryStore.projectRecommendations.filter(p => p.roadmapSlug === roadmapSlug);
    } else {
      // 1. Query DB for the requested roadmapSlug
      matchedProjects = await ProjectRecommendation.find({ roadmapSlug });

      // 2. If DB doesn't have projects for this roadmap yet, populate from seedData.projects
      if (!matchedProjects.length) {
        const seedMatches = (seedData.projects || []).filter(p => p.roadmapSlug === roadmapSlug);
        if (seedMatches.length) {
          try {
            await ProjectRecommendation.insertMany(seedMatches, { ordered: false });
            matchedProjects = await ProjectRecommendation.find({ roadmapSlug });
          } catch (insertErr) {
            matchedProjects = seedMatches;
          }
        }
      }
    }

    // 3. If still no projects in DB, use seedData directly
    if (!matchedProjects || !matchedProjects.length) {
      matchedProjects = (seedData.projects || []).filter(p => p.roadmapSlug === roadmapSlug);
    }

    // Sort by recommendedOrder (1 to 5)
    matchedProjects.sort((a, b) => (a.recommendedOrder || 1) - (b.recommendedOrder || 1));

    res.json(matchedProjects);
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { useMemoryStore } = getDbState();

    let project;
    if (useMemoryStore) {
      project = (memoryStore.projectRecommendations || seedData.projects).find(p => p.slug === id || p._id === id);
    } else {
      project = await ProjectRecommendation.findOne({ $or: [{ slug: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }].filter(Boolean) });
    }

    if (!project) {
      project = (seedData.projects || []).find(p => p.slug === id);
    }

    if (!project) {
      return res.status(404).json({ error: 'Project recommendation not found.' });
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

const completeProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { projectSlug } = req.body;
    const { useMemoryStore } = getDbState();

    let proj;
    if (useMemoryStore) {
      proj = (memoryStore.projectRecommendations || seedData.projects).find(p => p.slug === projectSlug);
    } else {
      proj = await ProjectRecommendation.findOne({ slug: projectSlug });
    }

    if (!proj) {
      proj = seedData.projects.find(p => p.slug === projectSlug);
    }

    if (!proj) {
      return res.status(404).json({ error: 'Project recommendation not found.' });
    }

    const newProfileProject = {
      name: proj.title || proj.name,
      description: proj.description,
      technologies: proj.technologies || proj.requiredSkills || [],
      githubUrl: 'https://github.com/my-username/' + proj.slug,
      liveUrl: 'https://' + proj.slug + '.demo.app',
      role: 'Lead Developer'
    };

    if (useMemoryStore) {
      const prof = memoryStore.profiles.find(p => p.userId === userId);
      if (prof) {
        if (!prof.projects) prof.projects = [];
        const exists = prof.projects.some(p => p.name === newProfileProject.name);
        if (!exists) {
          prof.projects.push(newProfileProject);
        }
      }
      return res.json({ message: `Project "${newProfileProject.name}" completed and auto-synced to your Profile!`, project: newProfileProject });
    } else {
      const prof = await Profile.findOne({ userId });
      if (prof) {
        if (!prof.projects) prof.projects = [];
        const exists = prof.projects.some(p => p.name === newProfileProject.name);
        if (!exists) {
          prof.projects.push(newProfileProject);
          await prof.save();
        }
      }
      return res.json({ message: `Project "${newProfileProject.name}" completed and auto-synced to your Profile!`, project: newProfileProject });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendedProjects,
  getProjectById,
  completeProject
};
