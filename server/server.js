const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/routes');  
const app = express();
app.use(cors());
app.use(express.json());
const url = "mongodb+srv://dhanuskumar18:5oUyxhBnuLoiLX71@learnhub.py5qs.mongodb.net/feedapp?retryWrites=true&w=majority&appName=LearnHub";
mongoose.connect(url)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));
app.use('/api', postRoutes);
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
