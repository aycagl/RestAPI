const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String, // 'daily' or 'weekly'
    required: true,
  },
  goalData: {
    food: Number, // hedeflenen yemek atığı (kg)
    water: Number, // hedeflenen su tüketimi (litre)
    electricity: Number, // hedeflenen elektrik tüketimi (kWh)
    transportation: Number, // hedeflenen ulaşım mesafesi (km)
    carbonFootprint: Number, // hedeflenen karbon ayak izi (kg CO2)
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
