const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const consumptionRoutes = require('./routes/consumptionRoutes');
const statsRoutes = require("./routes/statsRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const summaryRoutes = require('./routes/summaryRoutes');
const goalRoutes = require('./routes/goalRoutes');
const mapRoutes = require("./routes/mapRoutes");


dotenv.config();

const app = express();

app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/users', userRoutes);
app.use('/goals', goalRoutes);
app.use('/consumption', consumptionRoutes);
app.use("/calculate", statsRoutes);
app.use("/recommendations", recommendationRoutes);
app.use('/summary', summaryRoutes);
app.use("/map", mapRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
