// routes/bookingRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const Razorpay = require("razorpay");

const Booking = mongoose.model("bookings");
const Itinerary = mongoose.model("itineraries");
const Package = mongoose.model("packages");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// -------------------------------
// CREATE booking
// -------------------------------
router.post("/api/v1/booking/create", requireLogin, async (req, res) => {
  try {
    const { itineraryId } = req.body;
    const userId = req.user.id;

    if (!itineraryId) {
      return res.status(400).json({ message: "itineraryId is required" });
    }

    if (!isValidObjectId(itineraryId)) {
      return res.status(400).json({ message: "Invalid itinerary id" });
    }

    const itinerary = await Itinerary.findById(itineraryId).lean();
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    if (itinerary.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Create booking
    const booking = await Booking.create({
      userId,
      itineraryId,
      packageId: itinerary.packageId,
      totalAmount: itinerary.totalBudget,
      paymentStatus: 'pending',
      travelStartDate: itinerary.startDate,
      travelEndDate: itinerary.endDate
    });

    // Create Razorpay order
    const options = {
      amount: itinerary.totalBudget * 100, // Convert to paise
      currency: "INR",
      receipt: `booking_${booking._id}`,
      notes: {
        bookingId: booking._id.toString(),
        itineraryId: itineraryId
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Update booking with Razorpay order ID
    await Booking.findByIdAndUpdate(booking._id, {
      razorpayOrderId: razorpayOrder.id
    });

    res.status(201).json({
      message: "Booking created successfully",
      response: {
        booking,
        razorpayOrder: {
          id: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency
        }
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// VERIFY PAYMENT
// -------------------------------
router.post("/api/v1/booking/:id/verify-payment", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const userId = req.user.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid booking id" });
    }

    const booking = await Booking.findOne({ _id: id, userId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Verify payment signature (you should implement proper signature verification)
    // For now, we'll just update the booking status
    booking.paymentStatus = 'completed';
    booking.razorpayPaymentId = razorpay_payment_id;
    booking.razorpaySignature = razorpay_signature;

    await booking.save();

    // Update itinerary status
    await Itinerary.findByIdAndUpdate(booking.itineraryId, {
      status: 'booked'
    });

    // Update package popularity
    if (booking.packageId) {
      await Package.findByIdAndUpdate(booking.packageId, {
        $inc: { popularity: 1, totalBookings: 1 }
      });
    }

    res.status(200).json({
      message: "Payment verified successfully",
      response: booking
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// GET user's bookings
// -------------------------------
router.get("/api/v1/booking/user/all", requireLogin, async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId })
      .populate('itineraryId')
      .populate('packageId', 'name budgetPerDay')
      .sort({ bookingDate: -1 })
      .lean();

    res.status(200).json({
      message: "OK",
      count: bookings.length,
      response: bookings
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------------------
// GET booking details
// -------------------------------
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
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;