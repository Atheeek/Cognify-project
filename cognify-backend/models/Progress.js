const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  learnedItems: [String], // Can hold letters or numbers
  stars: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
