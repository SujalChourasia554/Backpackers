const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Check if Razorpay credentials are configured
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ ERROR: Razorpay credentials not found in environment variables!");
  console.error("Please create a .env file in the server folder with:");
  console.error("RAZORPAY_KEY_ID=your_key_id");
  console.error("RAZORPAY_KEY_SECRET=your_key_secret");
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log("✅ Razorpay initialized with Key ID:", process.env.RAZORPAY_KEY_ID);

// ============================================
// CREATE RAZORPAY ORDER
// ============================================
router.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount, currency, itineraryId, packageName, customizations } = req.body;

    console.log("📝 Creating order request:", { amount, currency, itineraryId, packageName });

    // Check if Razorpay is configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(503).json({ 
        success: false,
        error: "Payment gateway not configured. Please add Razorpay credentials to .env file" 
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false,
        error: "Invalid amount" 
      });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        itinerary_id: itineraryId,
        package_name: packageName,
        customizations: JSON.stringify(customizations),
      },
    };

    console.log("🔄 Creating Razorpay order with options:", options);

    const order = await razorpay.orders.create(options);

    console.log("✅ Order created successfully:", order.id);

    res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: process.env.RAZORPAY_KEY_ID, // Send key to frontend
      },
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to create order",
      message: error.message,
      details: error.error ? error.error.description : undefined
    });
  }
});

// ============================================
// VERIFY PAYMENT
// ============================================
router.post("/api/payment/verify", async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = req.body;

    console.log("🔍 Verifying payment:", { razorpay_order_id, razorpay_payment_id });

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing payment details" 
      });
    }

    // Create signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      console.log("✅ Payment verified successfully:", razorpay_payment_id);
      
      // You can save payment details to database here
      
      res.status(200).json({ 
        success: true, 
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });
    } else {
      console.log("❌ Payment verification failed: Invalid signature");
      res.status(400).json({ 
        success: false, 
        error: "Invalid signature",
        message: "Payment verification failed" 
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to verify payment",
      message: error.message 
    });
  }
});

// ============================================
// GET PAYMENT DETAILS
// ============================================
router.get("/api/payment/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const payment = await razorpay.payments.fetch(paymentId);
    
    res.status(200).json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount / 100, // Convert back to rupees
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        email: payment.email,
        contact: payment.contact,
        created_at: payment.created_at,
      }
    });
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch payment details" 
    });
  }
});

// ============================================
// TEST ENDPOINT - Check if payment routes are working
// ============================================
router.get("/api/payment/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Payment routes are working!",
    razorpay_configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
    key_id: process.env.RAZORPAY_KEY_ID ? `${process.env.RAZORPAY_KEY_ID.substring(0, 15)}...` : "NOT SET"
  });
});

module.exports = router;

