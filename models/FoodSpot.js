const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodSpotSchema = new Schema({
  name: { type: String, required: true },
  destinationId: { 
    type: Schema.Types.ObjectId, 
    ref: 'destinations' 
  },
  destinationName: { type: String, required: true },
  destinationCategory: { 
    type: String, 
    enum: ["Mountains", "Beaches", "Cities"] 
  },
  type: { 
    type: String, 
    enum: ["Café", "Restaurant", "Street Food", "Bar", "Dhaba", "Fine Dining", "Bakery", "Food Truck"],
    required: true
  },
  heroImage: { type: String },
  description: { type: String },
  averageCostForTwo: { type: Number }, // 800
  budgetCategory: { 
    type: String, 
    enum: ["Budget", "Mid-Range", "Premium"],
    default: "Mid-Range"
  },

  location: {
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    landmark: { type: String } 
  },
  rating: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 0 
  },
  totalReviews: { type: Number, default: 0 },
});
mongoose.model("foodspots", foodSpotSchema);