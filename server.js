
const express = require("express");
const app = express();
const mongoose =require("mongoose")

require("dotenv").config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

//start server
const port = process.env.PORT || 5001;

require("./models/Destination");
require("./models/FoodSpot");
require("./models/LocalGem");
require("./models/Stay");
require("./models/User");

require("./routes/destinationRoutes")(app);
require("./routes/foodSpotRoutes")(app); // To Learn CRUD Oprations
require("./routes/stayRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/localGemRoutes")(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});