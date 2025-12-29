const mongoose = require("mongoose");
const { Schema } = mongoose;

const destinationsSchema = new Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        required: true
    },
    state: { type: String },
    heroImage: { type: String },
    shortDescription: { type: String },
    budgetRange: { type: Number },
    bestTimeToVisit: { type: String },
    ideaDuraiton: { type: String },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
        timezone: { type: String }
    },
    topActivities: [{ type: String }],
    mustVisitPlaces: [{ type: String }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    totalReviews: { type: Number, default: 0 },
    totalStays: { type: Number, default: 0 },
    totalFoodSpots: { type: Number, default: 0 },
    totalLocalGems: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
    howToReach: {
        byAir: { type: String },
        byTrain: { type: String },
        byRoad: { type: String }
    },
    localTransport: [{ type: String }], // ["Taxi", "Bike Rental"]
    nearestAirport: { type: String },
    nearestRailway: { type: String }
})

mongoose.model("destinations",destinationsSchema);