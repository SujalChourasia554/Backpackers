const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors");
 
require("dotenv").config();
 
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow your Next.js app
    credentials: true
  }));
 
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
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
require("./models/DestinationItem");
require("./models/User");
require("./models/Package");
require("./models/Itinerary");
require("./models/Booking");
require("./models/Moment");
require("./models/Review");
 
// Routes
app.use(require("./routes/destinationRoutes"));
app.use(require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
require("./routes/authRoutes")(app);
app.use(require("./routes/packageRoutes"));
app.use(require("./routes/itineraryRoutes"));
app.use(require("./routes/bookingRoutes"));
<<<<<<< Updated upstream
// app.use(require("./routes/momentRoutes")); 
//app.use(require("./routes/recommendationRoutes"));
=======
// app.use(require("./routes/momentRoutes"));
app.use(require("./routes/recommendationRoutes"));
>>>>>>> Stashed changes
// reviewRoutes can be added later
 
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});