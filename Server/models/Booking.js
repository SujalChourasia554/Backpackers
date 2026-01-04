const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    itineraryId: { type: Schema.Types.ObjectId, ref: 'itineraries', required: true },
    packageId: { type: Schema.Types.ObjectId, ref: 'packages' },
    totalAmount: { type: Number, required: true },
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'failed', 'refunded'], 
        default: 'pending' 
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    bookingDate: { type: Date, default: Date.now },
    travelStartDate: { type: Date },
    travelEndDate: { type: Date }
});

mongoose.model("bookings", bookingSchema);