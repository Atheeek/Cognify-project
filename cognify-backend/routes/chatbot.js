const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Function to send message to OpenRouter and get response
async function getOpenAIResponse(message, model) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model, // use dynamic model name
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',  // your frontend URL
          'X-Title': 'MyMERNChatbot',
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    return 'Sorry, I could not process your request.';
  }
}

// Define chatbot route
router.post('/chat', async (req, res) => {
  const { message, sessionId, model } = req.body;

  if (!message || !model) {
    return res.status(400).json({ error: 'Message or model is missing' });
  }

  try {
    const aiResponse = await getOpenAIResponse(message, model);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to get response from OpenRouter' });
  }
});

module.exports = router;
