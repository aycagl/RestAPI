const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name alanını zorunlu yapabilirsiniz
  },
  email: {
    type: String,
    required: true,
    unique: true, // Her email eşsiz olmalı
    lowercase: true, // Email'leri küçük harfe çevir
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Şifre için minimum uzunluk
  },
  goals: {
    type: Map,
    of: String, // Örneğin: { "food": "Recycle", "water": "Save water" }
    default: {}
  },
  stats: {
    food: { type: Number, default: 0 },
    trash: { type: Number, default: 0 },
    water: { type: Number, default: 0 },
    electricity: { type: Number, default: 0 },
    transportation: { type: Number, default: 0 }
  }
});

// Şifreyi hashleyerek kaydet
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);

