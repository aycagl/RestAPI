const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String, //daily or weekly
    required: true,
  },
  goalData: {
    food: Number, 
    water: Number, 
    electricity: Number, 
    transportation: Number, 
    carbonFootprint: Number, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
