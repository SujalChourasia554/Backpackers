# 🔒 Backend Payment Integration - Complete Setup Guide

## ✅ Implementation Complete!

All payment processing is now handled securely on the backend with Razorpay API keys stored in environment variables.

---

## 📋 What Was Implemented

### Backend (Server)

1. **`server/routes/paymentRoutes.js`** ✅
   - Create Razorpay order endpoint
   - Verify payment signature endpoint
   - Get payment details endpoint

2. **`server/server.js`** ✅
   - Added CORS middleware for frontend communication
   - Registered payment routes

### Frontend (Client)

3. **`client/Components/itinerary/ActionButtons.jsx`** ✅
   - Calls backend API to create order
   - Opens Razorpay checkout with order from backend
   - Verifies payment through backend
   - Shows processing state

---

## 🔑 Setup Instructions

### Step 1: Add Environment Variables

Create or update `server/.env` file with your Razorpay credentials:

```env
# MongoDB
MONGODB_URI=your_mongodb_uri

# Server
PORT=5001

# Razorpay Credentials
RAZORPAY_KEY_ID=rzp_test_Ry8lWnzqT4LLjW
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

**Important:** Replace `your_razorpay_key_secret_here` with your actual Razorpay Key Secret from the dashboard.

### Step 2: Get Your Razorpay Key Secret

1. Login to Razorpay Dashboard: https://dashboard.razorpay.com/
2. Go to **Settings** → **API Keys**
3. You'll see both:
   - **Key ID**: `rzp_test_Ry8lWnzqT4LLjW` (already in code)
   - **Key Secret**: Click "Show" to reveal it
4. Copy the **Key Secret** and add it to your `.env` file

### Step 3: Start Both Servers

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend Server:**
```bash
cd client
npm run dev
```

### Step 4: Test the Payment Flow

1. Navigate to: `http://localhost:3000/itinerary/goa`
2. Click **"Book Now"** button
3. Razorpay checkout modal will open with all payment options
4. Use test credentials to complete payment
5. You'll be redirected to the success page

---

## 🧪 Test Credentials

### 💳 Credit/Debit Cards

**✅ Successful Payment:**
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., `12/25`)
- CVV: Any 3 digits (e.g., `123`)
- Name: Any name

**❌ Failed Payment:**
- Card Number: `4000 0000 0000 0002`

### 📱 UPI

**✅ Successful Payment:**
- UPI ID: `success@razorpay`

**❌ Failed Payment:**
- UPI ID: `failure@razorpay`

### 🏦 Net Banking

- Select any bank
- Use test credentials on the test bank page

---

## 🔐 Security Features

✅ **API Keys stored in backend** - Never exposed to frontend  
✅ **Payment signature verification** - Prevents tampering  
✅ **CORS enabled** - Only your frontend can access the API  
✅ **Server-side order creation** - Full control over payment amounts  
✅ **Secure payment verification** - Using HMAC SHA256  

---

## 📊 Payment Flow

```
User clicks "Book Now"
    ↓
Frontend → Backend: Create Order Request
    ↓
Backend → Razorpay: Create Order
    ↓
Backend → Frontend: Order ID + Key ID
    ↓
Frontend: Open Razorpay Modal
    ↓
User: Complete Payment
    ↓
Frontend → Backend: Verify Payment
    ↓
Backend: Verify Signature
    ↓
Backend → Frontend: Success/Failure
    ↓
Frontend: Redirect to Success Page
```

---

## 🎯 API Endpoints

### 1. Create Order
**POST** `http://localhost:5001/api/payment/create-order`

**Request Body:**
```json
{
  "amount": 25000,
  "currency": "INR",
  "itineraryId": "goa",
  "packageName": "Goa Beach Paradise",
  "customizations": {
    "hotel": "Luxury Beach Resort",
    "restaurant": "Seafood Paradise"
  }
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_xxxxxxxxxxxxx",
    "amount": 2500000,
    "currency": "INR",
    "key_id": "rzp_test_Ry8lWnzqT4LLjW"
  }
}
```

### 2. Verify Payment
**POST** `http://localhost:5001/api/payment/verify`

**Request Body:**
```json
{
  "razorpay_order_id": "order_xxxxxxxxxxxxx",
  "razorpay_payment_id": "pay_xxxxxxxxxxxxx",
  "razorpay_signature": "signature_string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "payment_id": "pay_xxxxxxxxxxxxx",
  "order_id": "order_xxxxxxxxxxxxx"
}
```

### 3. Get Payment Details
**GET** `http://localhost:5001/api/payment/:paymentId`

**Response:**
```json
{
  "success": true,
  "payment": {
    "id": "pay_xxxxxxxxxxxxx",
    "amount": 25000,
    "currency": "INR",
    "status": "captured",
    "method": "card",
    "email": "customer@example.com",
    "contact": "+919999999999",
    "created_at": 1234567890
  }
}
```

---

## 💳 Available Payment Methods

When users click "Book Now", Razorpay automatically shows:

1. **📱 UPI** - Google Pay, PhonePe, Paytm, BHIM
2. **💳 Cards** - Visa, Mastercard, RuPay, Amex
3. **🏦 Net Banking** - All major banks
4. **👛 Wallets** - Paytm, PhonePe, Mobikwik
5. **💰 EMI** - Credit/Debit card EMI
6. **🏪 Pay Later** - LazyPay, Simpl, ZestMoney
7. **🏧 NEFT/RTGS** - Bank transfer

All methods are automatically enabled based on your Razorpay dashboard settings!

---

## 🐛 Troubleshooting

### Issue: "Failed to create order"
**Solution:** 
- Check if backend server is running on port 5001
- Verify RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in `.env`
- Check server console for error messages

### Issue: "CORS error"
**Solution:** 
- Ensure backend server.js has CORS middleware
- Frontend must be on `http://localhost:3000`
- Backend must be on `http://localhost:5001`

### Issue: "Payment verification failed"
**Solution:** 
- Check RAZORPAY_KEY_SECRET is correct in `.env`
- Ensure you're using the same key pair (test/live)

### Issue: UPI not showing
**Solution:**
- Enable UPI in Razorpay Dashboard → Settings → Payment Methods
- Ensure contact number is provided in prefill

---

## 🚀 Going to Production

### 1. Get Live Credentials
- Complete KYC on Razorpay
- Generate Live Keys (starts with `rzp_live_`)

### 2. Update Environment Variables
```env
RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY
RAZORPAY_KEY_SECRET=your_live_secret
```

### 3. Update Frontend API URL
Change in `ActionButtons.jsx`:
```javascript
// From
const response = await fetch("http://localhost:5001/api/payment/create-order", {

// To
const response = await fetch("https://your-domain.com/api/payment/create-order", {
```

### 4. Deploy Backend
- Deploy to Heroku, AWS, DigitalOcean, etc.
- Set environment variables in hosting platform
- Update CORS origin to your production domain

---

## 📞 Support

- **Razorpay Docs**: https://razorpay.com/docs/
- **API Reference**: https://razorpay.com/docs/api/
- **Test Cards**: https://razorpay.com/docs/payments/payments/test-card-details/
- **Support**: support@razorpay.com

---

## ✨ Features Included

✅ Secure backend payment processing  
✅ API key protection  
✅ Payment signature verification  
✅ All payment methods (UPI, Cards, etc.)  
✅ Error handling  
✅ Loading states  
✅ Success page redirect  
✅ CORS protection  
✅ Test mode support  
✅ Production ready  

---

**Your payment integration is now complete and secure! 🎉**

