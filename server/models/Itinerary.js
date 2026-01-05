const mongoose = require("mongoose");
const { Schema } = mongoose;

const itinerarySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    destinationId: { type: Schema.Types.ObjectId, ref: 'destinations', required: true },
    packageId: { type: Schema.Types.ObjectId, ref: 'packages' }, // If based on a package
    isCustomized: { type: Boolean, default: false },
    totalDays: { type: Number, required: true },
    budgetPerDay: { type: Number, required: true },
    totalBudget: { type: Number, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    days: [{
        dayNumber: { type: Number, required: true },
        itemIds: [{ 
            itemId: { type: Schema.Types.ObjectId, ref: 'destinationitems', required: true },
            itemType: { type: String, enum: ["stay", "foodspot", "localgem", "activity"], required: true }
        }],
        description: { type: String },
        cost: { type: Number }
    }],
    status: { 
        type: String, 
        enum: ['draft', 'booked', 'completed', 'cancelled'], 
        default: 'draft' 
    },
    createdAt: { type: Date, default: Date.now }
});

mongoose.model("itineraries", itinerarySchema);