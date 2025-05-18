const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveyResponseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  responses: { type: Object, required: true },
  result: { type: [String] },
  submittedAt: { type: Date, default: Date.now }
});

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);

module.exports = SurveyResponse;