// routes/momentRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const Moment = mongoose.model("moments");
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Validate video URLs
const isValidVideoUrl = (url) => {
  const patterns = [
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
    /^(https?:\/\/)?(drive\.google\.com)\/.+/,
    /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|p)\/.+/
  ];
  return patterns.some(p => p.test(url));
};

// GET all moments
router.get("/api/v1/moments", async (req, res) => {
  try {
    const moments = await Moment.find()
      .populate("userId", "name email")
      .populate("destinationId", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: moments.length, moments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single moment
router.get("/api/v1/moments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid moment ID" });
    
    const moment = await Moment.findById(id)
      .populate("userId", "name email")
      .populate("destinationId", "name")
      .populate("comments.userId", "name");
    
    if (!moment) return res.status(404).json({ message: "Moment not found" });
    res.status(200).json({ success: true, moment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE moment
router.post("/api/v1/moments/create", requireLogin, async (req, res) => {
  try {
    const { videoUrl, caption, location, tags, destinationId, userName } = req.body;
    
    if (!videoUrl || !isValidVideoUrl(videoUrl)) {
      return res.status(400).json({ message: "Valid video URL required" });
    }
    if (!userName || userName.trim() === '') {
      return res.status(400).json({ message: "Name is required" });
    }
    if (destinationId && !isValidObjectId(destinationId)) {
      return res.status(400).json({ message: "Invalid destination ID" });
    }
    
    const parsedTags = typeof tags === 'string' ? tags.split(',').map(t => t.trim()).filter(t => t) : tags || [];
    
    const newMoment = await Moment.create({
      userId: req.user.id,
      userName: userName.trim(),
      destinationId: destinationId || null,
      images: [],
      video: videoUrl,
      caption: caption || "",
      location: location || "",
      tags: parsedTags
    });
    
    await newMoment.populate("userId", "name email");
    if (destinationId) await newMoment.populate("destinationId", "name");
    
    res.status(201).json({ success: true, moment: newMoment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LIKE/UNLIKE moment
router.post("/api/v1/moments/:id/like", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid moment ID" });
    
    const moment = await Moment.findById(id);
    if (!moment) return res.status(404).json({ message: "Moment not found" });
    
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    const likeIndex = moment.likes.findIndex(like => like.equals(userObjectId));
    
    likeIndex > -1 ? moment.likes.splice(likeIndex, 1) : moment.likes.push(userObjectId);
    await moment.save();
    
    res.status(200).json({ success: true, liked: likeIndex === -1, likesCount: moment.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD comment
router.post("/api/v1/moments/:id/comment", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid moment ID" });
    if (!text || !text.trim()) return res.status(400).json({ message: "Comment text required" });
    
    const moment = await Moment.findById(id);
    if (!moment) return res.status(404).json({ message: "Moment not found" });
    
    moment.comments.push({
      userId: new mongoose.Types.ObjectId(req.user.id),
      text: text.trim(),
      createdAt: new Date()
    });
    
    await moment.save();
    await moment.populate("comments.userId", "name");
    
    res.status(201).json({ 
      success: true,
      comment: moment.comments[moment.comments.length - 1],
      commentsCount: moment.comments.length 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;