const mongoose = require('mongoose');

const projectRecommendationSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  roadmapSlug: { type: String, required: true, index: true },
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  recommendedOrder: { type: Number, required: true }, // 1 to 5
  description: { type: String, required: true },
  whyBuildIt: { type: String, default: '' },
  estimatedTime: { type: String, default: '1-2 weeks' },
  technologies: [{ type: String }],
  skillsLearned: [{ type: String }],
  features: [{ type: String }],
  prerequisites: [{ type: String }],
  resumeValue: { type: String, default: 'High' },
  portfolioValue: { type: String, default: 'High' },
  developmentSteps: [{ type: String }]
});

module.exports = mongoose.model('ProjectRecommendation', projectRecommendationSchema);
