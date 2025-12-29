const mongoose = require("mongoose");
const Destination = mongoose.model("destinations");

module.exports = (app) => {
  app.post("/api/v1/destination/add", async (req, res) => {
    console.log("ADD NEW DESTINATION");
    
    // Get data from request body
    const { 
      name, category, state, country, heroImage, shortDescription, budgetRange, bestTimeToVisit, rating,
    } = req.body;

    try {
      const destination = await Destination.findOne({ name });
      
      if (destination) {
        return res.status(400).json({ 
          message: "Destination already exists" 
        });
      }
      const destinationFields = {
        name,
        category,
        state,
        country: country || "India",
        heroImage,
        shortDescription,
        budgetRange,
        bestTimeToVisit,
        rating: rating || 0,
      };

      const response = await Destination.create(destinationFields);

      res.status(201).json({ 
        message: "Destination added successfully", 
        response 
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

//get all destination
  app.get("/api/v1/destination/all/get", async (req, res) => {
    console.log("GET ALL DESTINATIONS");

    try {
      const destinations = await Destination.find({});

      res.status(200).json({
        message: "Destinations fetched successfully",
        count: destinations.length,
        response: destinations
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
//search by category
  app.get("/api/v1/destination/category/:category/get", async (req, res) => {
    console.log("GET DESTINATIONS BY CATEGORY");
    const { category } = req.params;

    try {
      const destinations = await Destination.find({ category });

      res.status(200).json({
        message: `${category} destinations fetched successfully`,
        category: category,
        count: destinations.length,
        response: destinations
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
};