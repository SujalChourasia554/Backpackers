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

module.exports = router;