//const morgan = require('morgan');
//app.use(morgan('dev')); // Gelen istekleri loglar


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const goalRoutes = require('./routes/goalRoutes');
const consumptionRoutes = require('./routes/consumptionRoutes');

// Çevresel değişkenleri yükle
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Veritabanı bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Rotayı bağla
app.use('/users', userRoutes);

app.use('/goals', goalRoutes);

app.use('/consumption', consumptionRoutes);

// Sunucuyu çalıştır
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
