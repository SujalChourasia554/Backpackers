// routes/packageRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Package = mongoose.model("packages");
const Destination = mongoose.model("destinations");
const DestinationItem = mongoose.model("destinationitems");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// -------------------------------
// GET all packages for a destination
// Query params: minBudget, maxBudget, sortBy (price-asc, price-desc, popularity, rating)
// -------------------------------
router.get("/api/v1/packages/destination/:destinationId", async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { minBudget, maxBudget, sortBy } = req.query;

    if (!isValidObjectId(destinationId)) {
      return res.status(400).json({ message: "Invalid destination id" });
    }

    const destination = await Destination.findById(destinationId).lean();
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const filter = { destinationId, isActive: true };

    // Budget filtering
    if (minBudget || maxBudget) {
      filter.budgetPerDay = {};
      if (minBudget) filter.budgetPerDay.$gte = Number(minBudget);
      if (maxBudget) filter.budgetPerDay.$lte = Number(maxBudget);
    }

    // Sorting
    let sort = {};
    if (sortBy === "price-asc") sort = { budgetPerDay: 1 };
    else if (sortBy === "price-desc") sort = { budgetPerDay: -1 };
    else if (sortBy === "popularity") sort = { popularity: -1 };
    else if (sortBy === "rating") sort = { rating: -1 };
    else sort = { budgetPerDay: 1 }; // default: price ascending

    const packages = await Package.find(filter).sort(sort).lean();

    res.status(200).json({
      message: "OK",
      count: packages.length,
      response: packages
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// GET package details with all related items
// -------------------------------
router.get("/api/v1/packages/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid package id" });
    }

    const packageData = await Package.findById(id).lean();
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Get all related items grouped by type
    const itemIds = packageData.defaultItemIds.map(item => item.itemId);
    const allItems = await DestinationItem.find({ _id: { $in: itemIds } }).lean();
    
    // Group items by type
    const defaultItems = {
      stays: allItems.filter(item => item.itemType === "stay"),
      foodSpots: allItems.filter(item => item.itemType === "foodspot"),
      localGems: allItems.filter(item => item.itemType === "localgem"),
      activities: allItems.filter(item => item.itemType === "activity")
    };

    res.status(200).json({
      message: "OK",
      response: {
        ...packageData,
        defaultItems
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// GET alternative items for customization within budget
// Query params: budgetPerDay (required), itemType (optional: stay, foodspot, localgem, activity)
// -------------------------------
router.get("/api/v1/packages/:id/alternatives", async (req, res) => {
  try {
    const { id } = req.params;
    const { budgetPerDay, itemType } = req.query;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid package id" });
    }

    const packageData = await Package.findById(id).lean();
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    const destinationId = packageData.destinationId;
    const budget = budgetPerDay ? Number(budgetPerDay) : packageData.budgetPerDay;

    // Define budget ranges for each item type (as percentage of total budget)
    const stayBudget = budget * 0.6; // 60% for accommodation
    const foodBudget = budget * 0.3; // 30% for food
    const activityBudget = budget * 0.1; // 10% for activities

    // Build filters for each item type
    const filters = {
      stay: {
        destinationId,
        itemType: "stay",
        price: { $lte: stayBudget }
      },
      foodspot: {
        destinationId,
        itemType: "foodspot",
        price: { $lte: foodBudget }
      },
      localgem: {
        destinationId,
        itemType: "localgem"
      },
      activity: {
        destinationId,
        itemType: "activity",
        price: { $lte: activityBudget }
      }
    };

    // If specific itemType requested, return only that
    if (itemType && filters[itemType]) {
      const items = await DestinationItem.find(filters[itemType])
        .sort({ price: 1, rating: -1 })
        .lean();
      
      return res.status(200).json({
        message: "OK",
        itemType,
        budget: itemType === "stay" ? stayBudget : itemType === "foodspot" ? foodBudget : itemType === "activity" ? activityBudget : null,
        count: items.length,
        response: items
      });
    }

    // Otherwise return all alternatives grouped by type
    const [stays, foodSpots, localGems, activities] = await Promise.all([
      DestinationItem.find(filters.stay).sort({ price: 1, rating: -1 }).lean(),
      DestinationItem.find(filters.foodspot).sort({ price: 1, rating: -1 }).lean(),
      DestinationItem.find(filters.localgem).sort({ rating: -1 }).lean(),
      DestinationItem.find(filters.activity).sort({ price: 1, rating: -1 }).lean()
    ]);

    res.status(200).json({
      message: "OK",
      budgetBreakdown: {
        total: budget,
        stay: stayBudget,
        food: foodBudget,
        activity: activityBudget
      },
      alternatives: {
        stays,
        foodSpots,
        localGems,
        activities
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;