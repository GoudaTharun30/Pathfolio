const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  weekNumber: { type: Number, default: 1 },
  title: { type: String, required: true },
  category: { type: String, default: 'General' }, // Skill, Practice, Mini Project, Prep
  completed: { type: Boolean, default: false },
  deadline: { type: String, default: '' },
  notes: { type: String, default: '' }
});

const learningPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  roadmapSlug: { type: String, required: true },
  roadmapTitle: { type: String, required: true },
  tasks: [taskSchema],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LearningPlan', learningPlanSchema);
