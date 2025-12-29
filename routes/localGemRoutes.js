const mongoose = require("mongoose");
const LocalGem = mongoose.model("localgems");

module.exports = (app) => {

  app.post("/api/v1/localgem/add", async (req, res) => {
    console.log("ADD NEW LOCAL GEM");
    
    const { 
      name,
      destinationName,
      destinationCategory,
      heroImage,
      entryFee,
      location,
      activities,
      rating,
      totalReviews
    } = req.body;

    try {
      const localGem = await LocalGem.findOne({ name, destinationName });
      
      if (localGem) {
        return res.status(400).json({ 
          message: "Local gem already exists in this destination" 
        });
      }

      const localGemFields = {
        name,
        destinationName,
        destinationCategory,
        heroImage,
        entryFee: entryFee || 0,
        location: location || {},
        activities: activities || [],
        rating: rating || 0,
        totalReviews: totalReviews || 0,
      };

      const response = await LocalGem.create(localGemFields);

      res.status(201).json({ 
        message: "Local gem added successfully", 
        response 
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });


  app.get("/api/v1/localgem/all/get", async (req, res) => {
    console.log("GET ALL LOCAL GEMS");

    try {
      const localGems = await LocalGem.find({});

      res.status(200).json({
        message: "Local gems fetched successfully",
        count: localGems.length,
        response: localGems
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });


  app.get("/api/v1/localgem/destination/:destinationName/get", async (req, res) => {
    console.log("GET LOCAL GEMS BY DESTINATION");
    
    const { destinationName } = req.params;

    try {
      const localGems = await LocalGem.find({ destinationName });

      res.status(200).json({
        message: `Local gems in ${destinationName} fetched successfully`,
        destination: destinationName,
        count: localGems.length,
        response: localGems
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
};