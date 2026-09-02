const mongoose = require('mongoose');

const pathTopicSchema = new mongoose.Schema({
  topicId: { type: String, required: true },
  title: { type: String, required: true },
  importance: { type: String, default: 'essential' },
  estimatedHours: { type: Number, default: 4 },
  completed: { type: Boolean, default: false }
});

const weekScheduleSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  monthNumber: { type: Number, required: true },
  title: { type: String, required: true },
  topics: [pathTopicSchema]
});

const userLearningPathSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  roadmapSlug: { type: String, required: true },
  roadmapTitle: { type: String, required: true },
  durationLabel: { type: String, default: '3 Months' },
  durationWeeks: { type: Number, default: 12 },
  dailyHoursLabel: { type: String, default: '2 hours/day' },
  hoursPerWeek: { type: Number, default: 14 },
  totalCapacityHours: { type: Number, default: 168 },
  progress: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  weeks: [weekScheduleSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserLearningPath', userLearningPathSchema);
