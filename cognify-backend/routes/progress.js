const express = require('express');
const Progress = require('../models/Progress.js'); // Assuming this Mongoose model is correctly defined

const router = express.Router();

// Get progress for user
// Frontend will call GET /api/progress/:userId
router.get('/:userId', async (req, res) => {
  console.log(`[API] GET /api/progress/${req.params.userId} hit`); // Debug log
  try {
    const progress = await Progress.findOne({ userId: req.params.userId });
    if (progress) {
      console.log(`[API] Found progress for ${req.params.userId}:`, progress);
      res.json(progress);
    } else {
      console.log(`[API] No progress found for ${req.params.userId}, returning default.`);
      // If no progress, return a default structure as the frontend expects it
      res.json({ userId: req.params.userId, learnedItems: [], stars: 0, xp: 0 });
    }
  } catch (error) {
    console.error(`[API] Error fetching progress for ${req.params.userId}:`, error);
    res.status(500).json({ message: "Error fetching progress from database", error: error.message });
  }
});

// Update user progress
// Frontend will call POST /api/progress/update
router.post('/update', async (req, res) => {
  console.log("[API] POST /api/progress/update hit with body:", req.body); // Debug log
  const { userId, item, stars, xp } = req.body;

  // Basic validation
  if (!userId || item === undefined || stars === undefined || xp === undefined) {
    return res.status(400).json({ message: "Missing required fields: userId, item, stars, xp" });
  }

  try {
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      console.log(`[API] Creating new progress for ${userId}`);
      progress = new Progress({ userId, learnedItems: [item], stars: Number(stars), xp: Number(xp) });
    } else {
      console.log(`[API] Updating existing progress for ${userId}`);
      if (!progress.learnedItems.includes(item)) {
        progress.learnedItems.push(item);
      }
      progress.stars = (progress.stars || 0) + Number(stars); // Ensure existing stars/xp are numbers
      progress.xp = (progress.xp || 0) + Number(xp);
    }

    await progress.save();
    console.log(`[API] Progress saved for ${userId}:`, progress);
    res.json(progress);
  } catch (error) {
    console.error(`[API] Error updating progress for ${userId}:`, error);
    res.status(500).json({ message: "Error updating progress in database", error: error.message });
  }
});

module.exports = router;