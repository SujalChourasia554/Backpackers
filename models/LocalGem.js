const mongoose = require("mongoose");
const { Schema } = mongoose;

const localGemSchema = new Schema({

    name: { type: String, required: true },
    destinationId: {
        type: Schema.Types.ObjectId,
        ref: 'destinations'
    },
    destinationName: { type: String },
    destinationCategory: { type: String },
    heroImage: { type: String },
    entryFee: { type: Number, default: 0 },
    location: {
        address: { type: String },
        latitude: { type: Number },
        longitude: { type: Number }
    },
    activities: [{ type: String }],
    rating: { type: Number, min: 0, max: 5, default: 0 },
    totalReviews: { type: Number, default: 0 },
});

mongoose.model("localgems", localGemSchema);