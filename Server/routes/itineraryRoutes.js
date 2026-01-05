// routes/itineraryRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const Itinerary = mongoose.model("itineraries");
const Package = mongoose.model("packages");
const Destination = mongoose.model("destinations");
const DestinationItem = mongoose.model("destinationitems");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// -------------------------------
// CREATE itinerary from package
// -------------------------------
router.post("/api/v1/itinerary/create", requireLogin, async (req, res) => {
  try {
    const { packageId, totalDays, startDate, endDate } = req.body;
    const userId = req.user.id;

    if (!packageId || !totalDays) {
      return res.status(400).json({ 
        message: "packageId and totalDays are required" 
      });
    }

    if (!isValidObjectId(packageId)) {
      return res.status(400).json({ message: "Invalid package id" });
    }

    const packageData = await Package.findById(packageId).lean();
    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    const destination = await Destination.findById(packageData.destinationId).lean();
    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Get default items from package
    const itemIds = packageData.defaultItemIds.map(item => item.itemId);
    const allDefaultItems = await DestinationItem.find({ _id: { $in: itemIds } }).lean();
    
    // Group items by type
    const defaultStay = allDefaultItems.find(item => item.itemType === "stay");
    const defaultFoodSpots = allDefaultItems.filter(item => item.itemType === "foodspot");
    const defaultLocalGems = allDefaultItems.filter(item => item.itemType === "localgem");
    const defaultActivities = allDefaultItems.filter(item => item.itemType === "activity");

    // Create days array
    const days = [];
    for (let i = 1; i <= totalDays; i++) {
      const dayCost = (defaultStay?.price || 0) + 
                     (defaultFoodSpots.reduce((sum, f) => sum + (f.price || 0), 0) * 3); // 3 meals per day

      // Create itemIds array with itemType
      const dayItemIds = [
        ...(defaultStay ? [{ itemId: defaultStay._id, itemType: "stay" }] : []),
        ...defaultFoodSpots.map(f => ({ itemId: f._id, itemType: "foodspot" })),
        ...defaultLocalGems.map(l => ({ itemId: l._id, itemType: "localgem" })),
        ...defaultActivities.map(a => ({ itemId: a._id, itemType: "activity" }))
      ];

      days.push({
        dayNumber: i,
        itemIds: dayItemIds,
        description: `Day ${i} activities`,
        cost: dayCost
      });
    }

    const totalBudget = days.reduce((sum, day) => sum + day.cost, 0);

    const itinerary = await Itinerary.create({
      userId,
      destinationId: packageData.destinationId,
      packageId,
      isCustomized: false,
      totalDays,
      budgetPerDay: packageData.budgetPerDay,
      totalBudget,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      days,
      status: 'draft'
    });

    res.status(201).json({
      message: "Itinerary created successfully",
      response: itinerary
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// GET user's itineraries
// -------------------------------
router.get("/api/v1/itinerary/user/all", requireLogin, async (req, res) => {
  try {
    const userId = req.user.id;

    const itineraries = await Itinerary.find({ userId })
      .populate('destinationId', 'name category images')
      .populate('packageId', 'name budgetPerDay')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: "OK",
      count: itineraries.length,
      response: itineraries
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// GET itinerary details
// -------------------------------
router.get("/api/v1/itinerary/:id", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid itinerary id" });
    }

    const itinerary = await Itinerary.findOne({ _id: id, userId })
      .populate('destinationId')
      .populate('packageId')
      .populate('days.itemIds.itemId')
      .lean();

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.status(200).json({
      message: "OK",
      response: itinerary
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// UPDATE/CUSTOMIZE itinerary
// -------------------------------
router.put("/api/v1/itinerary/:id/customize", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { days } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid itinerary id" });
    }

    const itinerary = await Itinerary.findOne({ _id: id, userId });
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // If days array is provided, update it
    if (days && Array.isArray(days)) {
      // Recalculate costs for each day
      for (const day of days) {
        if (day.itemIds && day.itemIds.length > 0) {
          const itemIds = day.itemIds.map(item => item.itemId);
          const items = await DestinationItem.find({ _id: { $in: itemIds } }).lean();
          
          // Calculate cost: stay price + food prices * 3 meals
          const stay = items.find(item => item.itemType === "stay");
          const foodSpots = items.filter(item => item.itemType === "foodspot");
          
          day.cost = (stay?.price || 0) + 
                    (foodSpots.reduce((sum, f) => sum + (f.price || 0), 0) * 3);
        }
      }

      itinerary.days = days;
      itinerary.totalDays = days.length;
      itinerary.totalBudget = days.reduce((sum, day) => sum + (day.cost || 0), 0);
      itinerary.isCustomized = true;
    }

    await itinerary.save();

    res.status(200).json({
      message: "Itinerary updated successfully",
      response: itinerary
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// DELETE day from itinerary
// -------------------------------
router.delete("/api/v1/itinerary/:id/day/:dayNumber", requireLogin, async (req, res) => {
  try {
    const { id, dayNumber } = req.params;
    const userId = req.user.id;
    const dayNum = Number(dayNumber);

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid itinerary id" });
    }

    const itinerary = await Itinerary.findOne({ _id: id, userId });
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Remove the day
    itinerary.days = itinerary.days.filter(d => d.dayNumber !== dayNum);
    
    // Renumber remaining days
    itinerary.days.forEach((day, index) => {
      day.dayNumber = index + 1;
    });

    itinerary.totalDays = itinerary.days.length;
    itinerary.totalBudget = itinerary.days.reduce((sum, day) => sum + (day.cost || 0), 0);
    itinerary.isCustomized = true;

    await itinerary.save();

    res.status(200).json({
      message: "Day deleted successfully",
      response: itinerary
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;