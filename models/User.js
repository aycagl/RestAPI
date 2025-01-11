const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true, 
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 
  },
  stats: {
    food: { type: Number, default: 0 },
    trash: { type: Number, default: 0 },
    water: { type: Number, default: 0 },
    electricity: { type: Number, default: 0 },
    transportation: {
      type: [
        {
          type: { type: String, required: true },
          distance: { type: Number, required: true },
          fuel: { type: String, required: true },
          date: { type: Date, default: Date.now } 
        }
      ],
      default: [] 
    }
  }
  
});

//hashing for password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
