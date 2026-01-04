// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Plain text for now 
    tempPassword: { type: String }, // Temporary storage before OTP verification
    otp: { type: String },
    otpExpiry: { type: Date },
    isEmailVerified: { type: Boolean, default: false },
    preferences: {
        favoriteCategories: [{ 
            type: String, 
            enum: ["Beach", "Mountains & Outdoors", "Culture & Heritage"] 
        }],
        budgetRange: {
            min: { type: Number },
            max: { type: Number }
        },
        interests: [{ type: String }] // ["Adventure", "Food", "Culture", etc.]
    },
    travelHistory: [{
        destinationId: { type: Schema.Types.ObjectId, ref: 'destinations' },
        category: { type: String },
        bookingId: { type: Schema.Types.ObjectId, ref: 'bookings' },
        visitedDate: { type: Date }
    }],
    createdAt: { type: Date, default: Date.now }
});

mongoose.model("users", userSchema);