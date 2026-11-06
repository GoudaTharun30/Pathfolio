const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String },
  type: { type: String },
  url: { type: String }
}, { _id: false });

const topicSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  importance: { 
    type: String, 
    enum: ['essential', 'important', 'advanced', 'optional'], 
    default: 'essential' 
  },
  difficulty: { type: String, default: 'beginner' }, // beginner, intermediate, advanced
  estimatedHours: { type: Number, default: 4 },
  description: { type: String, default: '' },
  whyItMatters: { type: String, default: '' },
  prerequisites: [{ type: String }],
  skills: [{ type: String }],
  concepts: [{ type: String }],
  resources: [resourceSchema],
  practiceIdeas: [{ type: String }]
});

const levelSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  topics: [topicSchema]
});

const careerRoadmapSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  branches: [{ type: String, required: true }], // CSE, IT, ECE, EEE, Mechanical, Civil
  description: { type: String, required: true },
  requiredSkills: [{ type: String }],
  levels: [levelSchema],
  projects: [{
    title: String,
    difficulty: String,
    description: String,
    skills: [String]
  }],
  interviewPreparation: [{ type: String }],
  recommendedResources: [resourceSchema]
});

module.exports = mongoose.model('CareerRoadmap', careerRoadmapSchema);

