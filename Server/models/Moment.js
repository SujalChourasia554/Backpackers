const mongoose = require("mongoose");
const { Schema } = mongoose;

const momentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    destinationId: { type: Schema.Types.ObjectId, ref: 'destinations' },
    title: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }], // Array of image URLs
    video: { type: String }, // Video file URL (for uploaded videos)
    videoUrl: { type: String }, // YouTube or external video URL
    thumbnail: { type: String }, // Thumbnail image URL
    location: { type: String },
    tags: [{ type: String }],
    category: { type: String, enum: ['beaches', 'mountains', 'cultural'], default: 'beaches' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    comments: [{
        userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

mongoose.model("moments", momentSchema);