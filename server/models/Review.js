const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    destinationId: { type: Schema.Types.ObjectId, ref: 'destinations' },
    itemId: { type: Schema.Types.ObjectId, ref: 'destinationitems' }, // Unified reference
    itemType: { type: String, enum: ["stay", "foodspot", "localgem", "activity"] }, // Type of item being reviewed
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

mongoose.model("reviews", reviewSchema);