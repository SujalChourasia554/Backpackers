const mongoose = require("mongoose");
const { Schema } = mongoose;

const momentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    destinationId: { type: Schema.Types.ObjectId, ref: 'destinations' },
    images: [{ type: String, required: true }], // Array of image URLs
    video: { type: String }, // Optional video URL
    caption: { type: String },
    location: { type: String },
    tags: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    comments: [{
        userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

mongoose.model("moments", momentSchema);