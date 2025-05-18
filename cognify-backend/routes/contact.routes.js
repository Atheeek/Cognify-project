const router = require('express').Router();
const ContactMessage = require('../models/contact.model'); // Create this model

router.route('/').post(async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide all contact details.' });
    }

    const newContactMessage = new ContactMessage({
      name,
      email,
      message,
      timestamp: new Date()
    });

    const savedMessage = await newContactMessage.save();
    res.status(201).json({ message: 'Message sent successfully!', messageId: savedMessage._id });
  } catch (err) {
    res.status(500).json({ message: 'Error saving contact message.', error: err.message });
  }
});

module.exports = router;