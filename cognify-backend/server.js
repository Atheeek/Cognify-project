const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const chatbotRoutes = require('./routes/chatbot'); // Import your chatbot route
const progressRoutes=require('./routes/progress.js');


const app = express();
const port = process.env.PORT || 5000;

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());
app.use('/api/progress', progressRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connection established successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/user.routes');
const surveyRoutes = require('./routes/survey.routes');
const contactRoutes = require('./routes/contact.routes');

// Use the chatbot route for chatbot-related requests
app.use('/api/chatbot', chatbotRoutes);

// Use other routes for user, survey, and contact
app.use('/api/users', userRoutes);
app.use('/api/surveys', surveyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', require('./routes/auth'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
