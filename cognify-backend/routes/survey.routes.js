const router = require('express').Router();
const authenticate = require('../middleware/authenticate'); // You'll need to create this middleware
const SurveyResponse = require('../models/survey.model'); // Create this model

router.route('/').post(authenticate, async (req, res) => {
  try {
    const { responses, result } = req.body;
    const userId = req.user.userId; // User ID from the authentication middleware

    const newSurveyResponse = new SurveyResponse({
      userId,
      responses,
      result,
      submittedAt: new Date()
    });

    const savedResponse = await newSurveyResponse.save();
    res.status(201).json({ message: 'Survey response saved successfully!', surveyId: savedResponse._id });
  } catch (err) {
    res.status(500).json({ message: 'Error saving survey response.', error: err.message });
  }
});

module.exports = router;