const mongoose = require("mongoose");
const FoodSpot = mongoose.model("foodspots");

module.exports = (app) => {
  app.post("/api/v1/foodspot/add", async (req, res) => {
    console.log("ADD NEW FOOD SPOT");
    
    // Get data from request body
    const { 
      name, destinationName, destinationCategory, type, heroImage, description, averageCostForTwo, budgetCategory, location, rating, totalReviews
    } = req.body;

    try {
      const foodSpot = await FoodSpot.findOne({ name });
      
      if (foodSpot) {
        return res.status(400).json({ 
          message: "Food Spot already exists" 
        });
      }
      const foodSpotFields = {
        name,
        destinationName,
        destinationCategory,
        type,
        heroImage,
        description,
        averageCostForTwo,
        budgetCategory,
        location,
        totalReviews,
        rating: rating || 0,
      };

      const response = await FoodSpot.create(foodSpotFields);

      res.status(201).json({ 
        message: "Food Spot added successfully", 
        response 
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

//get all destination
  app.get("/api/v1/foodspot/all/get", async (req, res) => {
    console.log("GET ALL FOOD SPOTS");

    try {
      const foodspots = await FoodSpot.find({});

      res.status(200).json({
        message: "Food Spots fetched successfully",
        count: foodspots.length,
        response: foodspots
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
//search by category
  app.get("/api/v1/foodspot/category/:category/get", async (req, res) => {
    console.log("GET FOOD SPOTS BY CATEGORY");
    const { category } = req.params;

    try {
      const foodspots = await FoodSpot.find({ category });

      res.status(200).json({
        message: `${category} food spots fetched successfully`,
        category: category,
        count: foodspots.length,
        response: foodspots
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
};