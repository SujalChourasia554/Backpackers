# ⚡ Quick Start - Payment Integration

## 🚨 Current Issue

**Error:** "Failed to fetch"  
**Cause:** Backend server is not running

---

## ✅ 3-Step Fix

### Step 1: Create `.env` File (2 minutes)

In the `server` folder, create a file named `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/backpackers
PORT=5001
RAZORPAY_KEY_ID=rzp_test_Ry8lWnzqT4LLjW
RAZORPAY_KEY_SECRET=GET_THIS_FROM_RAZORPAY_DASHBOARD
JWT_SECRET=any_random_secret_string_here
```

**Get Razorpay Key Secret:**
- Go to: https://dashboard.razorpay.com/
- Settings → API Keys → Click "Show"

### Step 2: Start Backend (30 seconds)

Open **Terminal 1**:
```bash
cd server
npm run dev
```

Wait for: `Server is running on port 5001` ✅

### Step 3: Start Frontend (30 seconds)

Open **Terminal 2**:
```bash
cd client
npm run dev
```

Wait for: `ready - started server on 0.0.0.0:3000` ✅

---

## 🎯 Test It!

1. Go to: `http://localhost:3000/itinerary/goa`
2. Click **"Book Now"**
3. Razorpay modal opens! 🎉

**Test Card:** `4111 1111 1111 1111`  
**Expiry:** Any future date  
**CVV:** Any 3 digits

---

## 💡 Important

- Keep **BOTH terminals running**
- Backend = Port 5001
- Frontend = Port 3000
- Don't close the terminals!

---

## 🐛 Still Not Working?

Check `PAYMENT_TROUBLESHOOTING.md` for detailed solutions.

---

**That's it! Your payment integration is ready! 🚀**

