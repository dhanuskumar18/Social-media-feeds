const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/routes');  // Importing routes

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialMediaFeed')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Use routes
app.use('/api', postRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
