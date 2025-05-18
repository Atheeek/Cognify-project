// frontend/src/services/chatbotService.js
import axios from 'axios';

export const askChatbot = async (message) => {
  try {
    const response = await axios.post('/api/chatbot', { message });
    return response.data.reply;
  } catch (error) {
    console.error('Error talking to chatbot:', error);
    return "Sorry, I'm having trouble responding right now.";
  }
};
