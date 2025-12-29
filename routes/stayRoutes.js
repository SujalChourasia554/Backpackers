const mongoose = require("mongoose");
const Stay = mongoose.model("stays");

module.exports = (app) => {

  app.post("/api/v1/stay/add", async (req, res) => {
    console.log("🏨 ADD NEW STAY");
    
    const { 
      name,destinationName,destinationCategory,type,heroImage,shortDescription,pricePerNight,budgetCategory,roomTypes,location,contact,rating,totalReviews
    } = req.body;

    try {
      const stay = await Stay.findOne({ name, destinationName });
      
      if (stay) {
        return res.status(400).json({ 
          message: "Stay already exists in this destination" 
        });
      }

      const stayFields = {
        name,
        destinationName,
        destinationCategory,
        type,
        heroImage,
        shortDescription,
        pricePerNight,
        budgetCategory,
        roomTypes: roomTypes || [],
        location: location || {},
        contact: contact || {},
        rating: rating || 0,
      };

      const response = await Stay.create(stayFields);

      res.status(201).json({ 
        message: "Stay added successfully", 
        response 
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });


  app.get("/api/v1/stay/all/get", async (req, res) => {
    console.log("🏨 GET ALL STAYS");

    try {
      const stays = await Stay.find({});

      res.status(200).json({
        message: "Stays fetched successfully",
        count: stays.length,
        response: stays
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });


  app.get("/api/v1/stay/destination/:destinationName/get", async (req, res) => {
    console.log("🏨 GET STAYS BY DESTINATION");
    
    const { destinationName } = req.params;

    try {
      const stays = await Stay.find({ destinationName });

      res.status(200).json({
        message: `Stays in ${destinationName} fetched successfully`,
        destination: destinationName,
        count: stays.length,
        response: stays
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
};