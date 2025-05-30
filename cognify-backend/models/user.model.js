const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
  learnedItems: [{ type: String }],
}, {
  timestamps: true,
});


const User = mongoose.model('User', userSchema);

module.exports = User;
