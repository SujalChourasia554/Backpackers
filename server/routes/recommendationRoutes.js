// routes/recommendationRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const User = mongoose.model("users");
const Destination = mongoose.model("destinations");
const Package = mongoose.model("packages");
const Booking = mongoose.model("bookings");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const VALID_CATEGORIES = ["Beach", "Mountains & Outdoors", "Culture & Heritage"];

// Helper function to analyze travel history and find favorite category
const analyzeTravelHistory = (travelHistory) => {
  if (!travelHistory || travelHistory.length === 0) {
    return null;
  }

  // Count occurrences of each category
  const categoryCount = {};
  travelHistory.forEach(trip => {
    if (trip.category) {
      categoryCount[trip.category] = (categoryCount[trip.category] || 0) + 1;
    }
  });

  // Find most frequent category
  let maxCount = 0;
  let favoriteCategory = null;
  
  Object.keys(categoryCount).forEach(category => {
    if (categoryCount[category] > maxCount) {
      maxCount = categoryCount[category];
      favoriteCategory = category;
    }
  });

  return favoriteCategory;
};

// Helper function to calculate recommendation score
const calculateRecommendationScore = (destination, userPreferences, favoriteCategory) => {
  let score = 0;

  // Category match (30 points)
  if (destination.category === favoriteCategory) {
    score += 30;
  }

  // Budget match (20 points)
  if (userPreferences.budgetRange) {
    const { min, max } = userPreferences.budgetRange;
    if (destination.minBudget && destination.maxBudget) {
      // Check if destination budget overlaps with user's budget range
      if (destination.minBudget <= max && destination.maxBudget >= min) {
        score += 20;
      }
    }
  }

  // Rating (10 points - normalized to 10)
  if (destination.rating) {
    score += (destination.rating / 5) * 10;
  }

  // Popularity based on reviews (10 points - normalized)
  if (destination.totalReviews) {
    // More reviews = more popular (capped at 10 points)
    score += Math.min(destination.totalReviews / 10, 10);
  }

  // Favorite categories match (10 points)
  if (userPreferences.favoriteCategories && 
      userPreferences.favoriteCategories.includes(destination.category)) {
    score += 10;
  }

  return score;
};

// -------------------------------
// GET landing page recommendations
// Returns recommended category and destinations for logged-in user
// -------------------------------
router.get("/api/v1/recommendations/landing/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 4 } = req.query; // Default 4 destinations

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(userId)
      .populate('travelHistory.destinationId')
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Analyze travel history to find favorite category
    const favoriteCategory = analyzeTravelHistory(user.travelHistory);

    let recommendedCategory = favoriteCategory;
    let destinations = [];

    if (favoriteCategory && user.travelHistory.length >= 2) {
      // User has travel history - show recommendations from favorite category
      const filter = { category: favoriteCategory };
      
      // Apply budget filter if user has preferences
      if (user.preferences && user.preferences.budgetRange) {
        const { min, max } = user.preferences.budgetRange;
        filter.$or = [
          { minBudget: { $lte: max } },
          { maxBudget: { $gte: min } }
        ];
      }

      destinations = await Destination.find(filter)
        .sort({ rating: -1, totalReviews: -1 })
        .limit(Number(limit))
        .lean();

      // Calculate recommendation scores
      destinations = destinations.map(dest => ({
        ...dest,
        recommendationScore: calculateRecommendationScore(
          dest,
          user.preferences || {},
          favoriteCategory
        )
      }));

      // Sort by recommendation score
      destinations.sort((a, b) => b.recommendationScore - a.recommendationScore);
    } else {
      // New user or insufficient history - show popular destinations
      recommendedCategory = null;
      
      destinations = await Destination.find({})
        .sort({ rating: -1, totalReviews: -1 })
        .limit(Number(limit))
        .lean();
    }

    res.status(200).json({
      message: "Recommendations retrieved successfully",
      response: {
        recommendedCategory,
        hasTravelHistory: user.travelHistory.length >= 2,
        destinations: destinations.map(dest => ({
          id: dest._id,
          name: dest.name,
          category: dest.category,
          images: dest.images,
          description: dest.description,
          rating: dest.rating,
          totalReviews: dest.totalReviews,
          minBudget: dest.minBudget,
          maxBudget: dest.maxBudget,
          recommendationScore: dest.recommendationScore || 0
        }))
      }
    });
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// GET personalized recommendations
// Returns destinations based on user preferences and history
// -------------------------------
router.get("/api/v1/recommendations/personalized/:userId", requireLogin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { category, limit = 10 } = req.query;

    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(userId)
      .populate('travelHistory.destinationId')
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Analyze travel history
    const favoriteCategory = analyzeTravelHistory(user.travelHistory);
    
    // Use provided category or favorite category
    const targetCategory = category || favoriteCategory;

    // Build filter
    const filter = {};
    
    if (targetCategory && VALID_CATEGORIES.includes(targetCategory)) {
      filter.category = targetCategory;
    }

    // Apply budget filter if user has preferences
    if (user.preferences && user.preferences.budgetRange) {
      const { min, max } = user.preferences.budgetRange;
      filter.$or = [
        { minBudget: { $lte: max } },
        { maxBudget: { $gte: min } }
      ];
    }

    // Get destinations
    let destinations = await Destination.find(filter)
      .sort({ rating: -1, totalReviews: -1 })
      .limit(Number(limit) * 2) // Get more to filter and sort
      .lean();

    // Calculate recommendation scores
    destinations = destinations.map(dest => ({
      ...dest,
      recommendationScore: calculateRecommendationScore(
        dest,
        user.preferences || {},
        favoriteCategory
      )
    }));

    // Sort by recommendation score and limit
    destinations.sort((a, b) => b.recommendationScore - a.recommendationScore);
    destinations = destinations.slice(0, Number(limit));

    res.status(200).json({
      message: "Personalized recommendations retrieved successfully",
      response: {
        favoriteCategory,
        userPreferences: user.preferences,
        travelHistoryCount: user.travelHistory.length,
        destinations: destinations.map(dest => ({
          id: dest._id,
          name: dest.name,
          category: dest.category,
          state: dest.state,
          images: dest.images,
          description: dest.description,
          rating: dest.rating,
          totalReviews: dest.totalReviews,
          minBudget: dest.minBudget,
          maxBudget: dest.maxBudget,
          location: dest.location,
          recommendationScore: dest.recommendationScore
        }))
      }
    });
  } catch (err) {
    console.error("Personalized recommendation error:", err);
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// GET recommendations by category
// Returns destinations in a specific category with scoring
// -------------------------------
router.get("/api/v1/recommendations/category/:category", requireLogin, async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;
    const userId = req.user.id;

    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ 
        message: `Invalid category. Allowed: ${VALID_CATEGORIES.join(", ")}` 
      });
    }

    const user = await User.findById(userId)
      .populate('travelHistory.destinationId')
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteCategory = analyzeTravelHistory(user.travelHistory);

    // Build filter
    const filter = { category };
    
    // Apply budget filter if user has preferences
    if (user.preferences && user.preferences.budgetRange) {
      const { min, max } = user.preferences.budgetRange;
      filter.$or = [
        { minBudget: { $lte: max } },
        { maxBudget: { $gte: min } }
      ];
    }

    // Get destinations
    let destinations = await Destination.find(filter)
      .sort({ rating: -1, totalReviews: -1 })
      .limit(Number(limit) * 2)
      .lean();

    // Calculate recommendation scores
    destinations = destinations.map(dest => ({
      ...dest,
      recommendationScore: calculateRecommendationScore(
        dest,
        user.preferences || {},
        favoriteCategory
      )
    }));

    // Sort by recommendation score
    destinations.sort((a, b) => b.recommendationScore - a.recommendationScore);
    destinations = destinations.slice(0, Number(limit));

    res.status(200).json({
      message: "Category recommendations retrieved successfully",
      response: {
        category,
        destinations: destinations.map(dest => ({
          id: dest._id,
          name: dest.name,
          category: dest.category,
          images: dest.images,
          description: dest.description,
          rating: dest.rating,
          totalReviews: dest.totalReviews,
          minBudget: dest.minBudget,
          maxBudget: dest.maxBudget,
          recommendationScore: dest.recommendationScore
        }))
      }
    });
  } catch (err) {
    console.error("Category recommendation error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

