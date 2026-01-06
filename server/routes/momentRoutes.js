// routes/momentRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const Moment = mongoose.model("moments");
const User = mongoose.model("users");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Helper function to validate and extract video URLs
const validateVideoUrl = (url) => {
  if (!url) return { valid: false, error: "URL is required" };
  
  // YouTube URL patterns
  const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  // Google Drive URL patterns
  const drivePattern = /^(https?:\/\/)?(drive\.google\.com)\/.+/;
  // Instagram Reel URL patterns
  const instagramPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|p)\/.+/;
  
  if (youtubePattern.test(url) || drivePattern.test(url) || instagramPattern.test(url)) {
    return { valid: true };
  }
  
  return { valid: false, error: "Invalid URL. Please provide a YouTube, Google Drive, or Instagram Reel URL" };
};

// ============================================
// GET ALL MOMENTS
// ============================================
router.get("/api/v1/moments", async (req, res) => {
  try {
    const moments = await Moment.find()
      .populate("userId", "name email")
      .populate("destinationId", "name")
      .sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true,
      count: moments.length,
      moments 
    });
  } catch (error) {
    console.error("Error fetching moments:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching moments",
      error: error.message 
    });
  }
});

// ============================================
// GET SINGLE MOMENT BY ID
// ============================================
router.get("/api/v1/moments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid moment ID" 
      });
    }
    
    const moment = await Moment.findById(id)
      .populate("userId", "name email")
      .populate("destinationId", "name")
      .populate("comments.userId", "name");
    
    if (!moment) {
      return res.status(404).json({ 
        success: false,
        message: "Moment not found" 
      });
    }
    
    res.status(200).json({ 
      success: true,
      moment 
    });
  } catch (error) {
    console.error("Error fetching moment:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching moment",
      error: error.message 
    });
  }
});

// ============================================
// CREATE MOMENT
// ============================================
router.post("/api/v1/moments/create", requireLogin, async (req, res) => {
  try {
    const { videoUrl, caption, location, tags, destinationId } = req.body;
    const userId = req.user.id;
    
    // Validate video URL
    const urlValidation = validateVideoUrl(videoUrl);
    if (!urlValidation.valid) {
      return res.status(400).json({ 
        success: false,
        message: urlValidation.error 
      });
    }
    
    // Validate destinationId if provided
    if (destinationId && !isValidObjectId(destinationId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid destination ID" 
      });
    }
    
    // Parse tags if it's a string
    let parsedTags = tags;
    if (typeof tags === 'string') {
      parsedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    
    // Create new moment
    const newMoment = new Moment({
      userId,
      destinationId: destinationId || null,
      images: [], // No images for URL-based moments
      video: videoUrl,
      caption: caption || "",
      location: location || "",
      tags: parsedTags || [],
      likes: [],
      comments: []
    });
    
    await newMoment.save();
    
    // Populate user info before sending response
    await newMoment.populate("userId", "name email");
    if (destinationId) {
      await newMoment.populate("destinationId", "name");
    }
    
    res.status(201).json({ 
      success: true,
      message: "Moment created successfully",
      moment: newMoment 
    });
  } catch (error) {
    console.error("Error creating moment:", error);
    res.status(500).json({ 
      success: false,
      message: "Error creating moment",
      error: error.message 
    });
  }
});

// ============================================
// LIKE/UNLIKE MOMENT
// ============================================
router.post("/api/v1/moments/:id/like", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid moment ID" 
      });
    }
    
    const moment = await Moment.findById(id);
    
    if (!moment) {
      return res.status(404).json({ 
        success: false,
        message: "Moment not found" 
      });
    }
    
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const likeIndex = moment.likes.findIndex(like => like.equals(userObjectId));
    
    if (likeIndex > -1) {
      // Unlike
      moment.likes.splice(likeIndex, 1);
      await moment.save();
      return res.status(200).json({ 
        success: true,
        message: "Moment unliked",
        liked: false,
        likesCount: moment.likes.length 
      });
    } else {
      // Like
      moment.likes.push(userObjectId);
      await moment.save();
      return res.status(200).json({ 
        success: true,
        message: "Moment liked",
        liked: true,
        likesCount: moment.likes.length 
      });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ 
      success: false,
      message: "Error toggling like",
      error: error.message 
    });
  }
});

// ============================================
// ADD COMMENT
// ============================================
router.post("/api/v1/moments/:id/comment", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid moment ID" 
      });
    }
    
    if (!text || text.trim() === "") {
      return res.status(400).json({ 
        success: false,
        message: "Comment text is required" 
      });
    }
    
    const moment = await Moment.findById(id);
    
    if (!moment) {
      return res.status(404).json({ 
        success: false,
        message: "Moment not found" 
      });
    }
    
    const newComment = {
      userId: new mongoose.Types.ObjectId(userId),
      text: text.trim(),
      createdAt: new Date()
    };
    
    moment.comments.push(newComment);
    await moment.save();
    
    // Populate the new comment's user info
    await moment.populate("comments.userId", "name");
    
    res.status(201).json({ 
      success: true,
      message: "Comment added successfully",
      comment: moment.comments[moment.comments.length - 1],
      commentsCount: moment.comments.length 
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ 
      success: false,
      message: "Error adding comment",
      error: error.message 
    });
  }
});

module.exports = router;

