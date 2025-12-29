const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/v1/user/add", async (req, res) => {

    const { name, email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const userFields = { name, email };

      const response = await User.create(userFields);
      res.status(201).json({ message: "User added successfully", response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  })
  app.get("/api/v1/user/all/get", async (req, res) => {
    console.log("GET ALL USERS");

    try {
      const users = await User.find({});

      res.status(200).json({
        message: "Users fetched successfully",
        count: users.length,
        response: users
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });


  app.get("/api/v1/user/email/:email/get", async (req, res) => {
    console.log("GET USER BY EMAIL");

    const { email } = req.params;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        message: "User fetched successfully",
        response: user
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });


  app.get("/api/v1/user/:id/get", async (req, res) => {
    console.log(" GET SINGLE USER");

    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        message: "User fetched successfully",
        response: user
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

};


