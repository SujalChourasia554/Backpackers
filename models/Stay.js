const mongoose = require("mongoose");
const { Schema } = mongoose;

const staySchema = new Schema({
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
        enum: ["Hostel", "Hotel", "Homestay", "Resort", "Camping", "Guest House"],
        required: true
    },
    heroImage: { type: String },
    shortDescription: { type: String },
    pricePerNight: { type: Number, required: true }, // Starting price
    budgetCategory: { type: Number },
    roomTypes: [{
        name: { type: String },        // "Dorm Bed", "Private Room", "Deluxe Room"
        price: { type: Number },       // 600, 2000, 3500
        capacity: { type: Number },    // 1, 2, 4 (number of people)
        available: { type: Boolean, default: true }
    }],
    location: {
        address: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
    },
    contact: { type: String },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    totalReviews: { type: Number, default: 0 }
});
mongoose.model("stays",staySchema);