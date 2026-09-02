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

    let allProjects = [];
    if (useMemoryStore) {
      if (!memoryStore.projectRecommendations || !memoryStore.projectRecommendations.length) {
        memoryStore.projectRecommendations = seedData.projects;
      }
      allProjects = [...memoryStore.projectRecommendations];
    } else {
      allProjects = await ProjectRecommendation.find();
      if (!allProjects.length) {
        await ProjectRecommendation.insertMany(seedData.projects);
        allProjects = await ProjectRecommendation.find();
      }
    }

    // Filter projects matching requested roadmapSlug
    let matchedProjects = allProjects.filter(p => p.roadmapSlug === roadmapSlug);

    // Fallback if requested slug has no projects: fetch default frontend-developer projects
    if (!matchedProjects.length) {
      matchedProjects = allProjects.filter(p => p.roadmapSlug === 'frontend-developer');
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
      project = await ProjectRecommendation.findOne({ $or: [{ slug: id }, { _id: id }] });
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
