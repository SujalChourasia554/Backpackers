// routes/bookingRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

// Razorpay - Commented out until payment integration is ready
// const Razorpay = require("razorpay");

const Booking = mongoose.model("bookings");
const Itinerary = mongoose.model("itineraries");
const Package = mongoose.model("packages");
const User = mongoose.model("users");
const Destination = mongoose.model("destinations");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// ============================================
// RAZORPAY INITIALIZATION (Commented out - uncomment when ready)
// ============================================
// Initialize Razorpay only if keys are available
// let razorpay = null;
// if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
//   razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
//   });
// }

// ============================================
// CREATE BOOKING
// ============================================
// Creates a booking for an itinerary
// Currently creates booking without payment (payment integration pending)
router.post("/api/v1/booking/create", requireLogin, async (req, res) => {
  try {
    const { itineraryId } = req.body;
    const userId = req.user.id;

    // Validate itineraryId is provided
    if (!itineraryId) {
      return res.status(400).json({ message: "itineraryId is required" });
    }

    // Validate itineraryId format
    if (!isValidObjectId(itineraryId)) {
      return res.status(400).json({ message: "Invalid itinerary id" });
    }

    // Find the itinerary
    const itinerary = await Itinerary.findById(itineraryId).lean();
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    // Verify user owns this itinerary
    if (itinerary.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Check if booking already exists for this itinerary
    const existingBooking = await Booking.findOne({ 
      itineraryId, 
      paymentStatus: { $in: ['pending', 'completed'] } 
    });
    
    if (existingBooking) {
      return res.status(400).json({ 
        message: "Booking already exists for this itinerary" 
      });
    }

    // Create booking record
    const booking = await Booking.create({
      userId,
      itineraryId,
      packageId: itinerary.packageId,
      totalAmount: itinerary.totalBudget,
      paymentStatus: 'pending', // Will be updated when payment is completed
      travelStartDate: itinerary.startDate,
      travelEndDate: itinerary.endDate
    });

    // ============================================
    // RAZORPAY ORDER CREATION (Commented out - uncomment when ready)
    // ============================================
    // Create Razorpay order only if Razorpay is configured
    // if (razorpay) {
    //   const options = {
    //     amount: Math.round(itinerary.totalBudget * 100), // Convert to paise (smallest currency unit)
    //     currency: "INR",
    //     receipt: `booking_${booking._id}`,
    //     notes: {
    //       bookingId: booking._id.toString(),
    //       itineraryId: itineraryId.toString(),
    //       userId: userId.toString()
    //     }
    //   };

    //   const razorpayOrder = await razorpay.orders.create(options);

    //   // Update booking with Razorpay order ID
    //   await Booking.findByIdAndUpdate(booking._id, {
    //     razorpayOrderId: razorpayOrder.id
    //   });

    //   res.status(201).json({
    //     message: "Booking created successfully",
    //     response: {
    //       booking: {
    //         id: booking._id,
    //         totalAmount: booking.totalAmount,
    //         paymentStatus: booking.paymentStatus
    //       },
    //       razorpayOrder: {
    //         id: razorpayOrder.id,
    //         amount: razorpayOrder.amount,
    //         currency: razorpayOrder.currency,
    //         key: process.env.RAZORPAY_KEY_ID // Frontend needs this
    //       }
    //     }
    //   });
    // } else {
    //   // Razorpay not configured
    //   res.status(503).json({ 
    //     message: "Payment gateway not configured" 
    //   });
    // }

    // Return booking without payment order (for now)
    res.status(201).json({
      message: "Booking created successfully (Payment integration pending)",
      response: {
        booking: {
          id: booking._id,
          totalAmount: booking.totalAmount,
          paymentStatus: booking.paymentStatus,
          itineraryId: booking.itineraryId
        }
      }
    });
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ============================================
// VERIFY PAYMENT (Commented out - uncomment when Razorpay is ready)
// ============================================
// This endpoint is called by frontend after payment is completed
// It verifies the payment signature and updates booking status
// router.post("/api/v1/booking/:id/verify-payment", requireLogin, async (req, res) => {
//   try {
//     // Check if Razorpay is configured
//     if (!razorpay) {
//       return res.status(503).json({ 
//         message: "Payment gateway not configured" 
//       });
//     }

//     const { id } = req.params;
//     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
//     const userId = req.user.id;

//     // Validate payment details are provided
//     if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
//       return res.status(400).json({ 
//         message: "Payment details are required" 
//       });
//     }

//     if (!isValidObjectId(id)) {
//       return res.status(400).json({ message: "Invalid booking id" });
//     }

//     const booking = await Booking.findOne({ _id: id, userId });
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // Check if already verified
//     if (booking.paymentStatus === 'completed') {
//       return res.status(400).json({ 
//         message: "Payment already verified" 
//       });
//     }

//     // ============================================
//     // PAYMENT SIGNATURE VERIFICATION (Implement when ready)
//     // ============================================
//     // const crypto = require("crypto");
//     // const verifyPaymentSignature = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
//     //   const secret = process.env.RAZORPAY_KEY_SECRET;
//     //   const text = `${razorpay_order_id}|${razorpay_payment_id}`;
//     //   const generated_signature = crypto
//     //     .createHmac('sha256', secret)
//     //     .update(text)
//     //     .digest('hex');
//     //   return generated_signature === razorpay_signature;
//     // };

//     // const isSignatureValid = verifyPaymentSignature(
//     //   razorpay_order_id,
//     //   razorpay_payment_id,
//     //   razorpay_signature
//     // );

//     // if (!isSignatureValid) {
//     //   booking.paymentStatus = 'failed';
//     //   await booking.save();
//     //   return res.status(400).json({ 
//     //     message: "Invalid payment signature" 
//     //   });
//     // }

//     // Verify order ID matches
//     // if (booking.razorpayOrderId !== razorpay_order_id) {
//     //   return res.status(400).json({ 
//     //     message: "Order ID mismatch" 
//     //   });
//     // }

//     // Payment is valid - update booking
//     booking.paymentStatus = 'completed';
//     booking.razorpayPaymentId = razorpay_payment_id;
//     booking.razorpaySignature = razorpay_signature;
//     await booking.save();

//     // Get itinerary and destination for travel history
//     const itinerary = await Itinerary.findById(booking.itineraryId)
//       .populate('destinationId')
//       .lean();

//     // Update itinerary status
//     await Itinerary.findByIdAndUpdate(booking.itineraryId, {
//       status: 'booked'
//     });

//     // Update package popularity
//     if (booking.packageId) {
//       await Package.findByIdAndUpdate(booking.packageId, {
//         $inc: { popularity: 1, totalBookings: 1 }
//       });
//     }

//     // Update user's travel history
//     if (itinerary && itinerary.destinationId) {
//       await User.findByIdAndUpdate(userId, {
//         $push: {
//           travelHistory: {
//             destinationId: itinerary.destinationId._id,
//             category: itinerary.destinationId.category,
//             bookingId: booking._id,
//             visitedDate: booking.travelStartDate || new Date()
//           }
//         }
//       });
//     }

//     res.status(200).json({
//       message: "Payment verified successfully",
//       response: {
//         booking: {
//           id: booking._id,
//           paymentStatus: booking.paymentStatus,
//           totalAmount: booking.totalAmount
//         }
//       }
//     });
//   } catch (err) {
//     console.error("Payment verification error:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// ============================================
// GET USER'S BOOKINGS
// ============================================
// Returns all bookings for the logged-in user
router.get("/api/v1/booking/user/all", requireLogin, async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId })
      .populate('itineraryId')
      .populate('packageId', 'name budgetPerDay')
      .sort({ bookingDate: -1 }) // Most recent first
      .lean();

    res.status(200).json({
      message: "OK",
      count: bookings.length,
      response: bookings
    });
  } catch (err) {
    console.error("Get bookings error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ============================================
// GET BOOKING DETAILS
// ============================================
// Returns details of a specific booking
router.get("/api/v1/booking/:id", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findOne({ _id: id, userId })
      .populate('itineraryId')
      .populate('packageId')
      .lean();

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "OK",
      response: booking
    });
  } catch (err) {
    console.error("Get booking error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ============================================
// EXPORT ROUTER
// ============================================
module.exports = router;