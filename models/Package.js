const mongoose = require("mongoose");
const { Schema } = mongoose;

const packageSchema = new Schema({
    destinationId: { type: Schema.Types.ObjectId, ref: 'destinations', required: true },
    name: { type: String, required: true }, // e.g., "Alappuzha Beach - Budget Package"
    budgetPerDay: { type: Number, required: true }, // 1000, 1500, 2000
    minBudget: { type: Number, required: true }, // 400
    maxBudget: { type: Number, required: true }, // 20000
    defaultItemIds: [{ 
        itemId: { type: Schema.Types.ObjectId, ref: 'destinationitems', required: true },
        itemType: { type: String, enum: ["stay", "foodspot", "localgem", "activity"], required: true }
    }],
    popularity: { type: Number, default: 0 }, // count of bookings
    rating: { type: Number, min: 0, max: 5, default: 0 },
    totalBookings: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
});

mongoose.model("packages", packageSchema);