const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  templateId: { type: String, default: 'developer' },
  customConfig: { type: Object, default: {} },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
