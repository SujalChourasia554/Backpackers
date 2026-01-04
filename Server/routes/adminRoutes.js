
// routes/admin.routes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Destination = mongoose.model("destinations");
const DestinationItem = mongoose.model("destinationitems");

const VALID_CATEGORIES = ["Beach", "Mountains & Outdoors", "Culture & Heritage"];
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/* ------------------------------------------
   DESTINATION (CRUD)
   ------------------------------------------ */

// CREATE Destination
router.post("/destination", async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: `Invalid category. Allowed: ${VALID_CATEGORIES.join(", ")}` });
    }
    const existing = await Destination.findOne({ name }).lean();
    if (existing) return res.status(409).json({ message: "Destination already exists" });

    const created = await Destination.create({
      ...req.body,
      country: req.body.country || "India",
      rating: req.body.rating ?? 0
    });

    res.status(201).json({ message: "Destination created", response: created });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE Destination
router.put("/destination/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid destination id" });
    if (req.body.category && !VALID_CATEGORIES.includes(req.body.category)) {
      return res.status(400).json({ message: `Invalid category. Allowed: ${VALID_CATEGORIES.join(", ")}` });
    }

    const updated = await Destination.findByIdAndUpdate(id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ message: "Destination not found" });

    res.status(200).json({ message: "Destination updated", response: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE Destination (optional: cascade children)
router.delete("/destination/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid destination id" });

    const deleted = await Destination.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ message: "Destination not found" });

    // Optional cascade:
    // await Promise.all([
    //   FoodSpot.deleteMany({ destinationId: id }),
    //   LocalGem.deleteMany({ destinationId: id }),
    //   Stay.deleteMany({ destinationId: id }),
    // ]);

    res.status(200).json({ message: "Destination deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ------------------------------------------
   DESTINATION ITEM (CRUD) - Unified model for Stay, FoodSpot, LocalGem, Activity
   ------------------------------------------ */

const VALID_ITEM_TYPES = ["stay", "foodspot", "localgem", "activity"];

// CREATE Destination Item
router.post("/destinationitem", async (req, res) => {
  try {
    const { name, itemType, destinationId } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!itemType || !VALID_ITEM_TYPES.includes(itemType)) {
      return res.status(400).json({ message: `Valid itemType is required. Allowed: ${VALID_ITEM_TYPES.join(", ")}` });
    }
    if (!destinationId || !isValidObjectId(destinationId)) {
      return res.status(400).json({ message: "Valid destinationId is required" });
    }

    const created = await DestinationItem.create({
      ...req.body,
      price: req.body.price ?? 0
    });

    res.status(201).json({ message: "Destination item created", response: created });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE Destination Item
router.put("/destinationitem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid destination item id" });
    if (req.body.itemType && !VALID_ITEM_TYPES.includes(req.body.itemType)) {
      return res.status(400).json({ message: `Invalid itemType. Allowed: ${VALID_ITEM_TYPES.join(", ")}` });
    }
    if (req.body.destinationId && !isValidObjectId(req.body.destinationId)) {
      return res.status(400).json({ message: "Invalid destinationId" });
    }

    const updated = await DestinationItem.findByIdAndUpdate(id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ message: "Destination item not found" });

    res.status(200).json({ message: "Destination item updated", response: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE Destination Item
router.delete("/destinationitem/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid destination item id" });

    const deleted = await DestinationItem.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ message: "Destination item not found" });

    res.status(200).json({ message: "Destination item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
