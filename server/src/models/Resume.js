const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  templateId: { type: String, default: 'software-developer' },
  customConfig: { type: Object, default: {} },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
