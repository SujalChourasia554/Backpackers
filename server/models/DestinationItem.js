// models/DestinationItem.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const destinationItemSchema = new Schema({
    name: { type: String, required: true },
    itemType: { 
        type: String, 
        enum: ["stay", "foodspot", "localgem", "activity"], 
        required: true 
    },
    category: { type: String }, // For stays: "hostel", "hotel", etc.
    image: [{ type: String }],
    description: { type: String },
    price: { type: Number, default: 0 }, // Optional for localgems
    duration: { type: String }, // For activities
    rating: { 
        type: Number, 
        min: 0, 
        max: 5, 
        default: 0 
    },
    totalReviews: { type: Number, default: 0 },
    destinationId: { type: Schema.Types.ObjectId, ref: 'destinations', required: true }
});

// Index for efficient queries
destinationItemSchema.index({ destinationId: 1, itemType: 1 });

mongoose.model("destinationitems", destinationItemSchema);

