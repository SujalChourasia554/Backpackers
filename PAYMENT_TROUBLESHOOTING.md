# 🔧 Payment Integration Troubleshooting Guide

## ❌ Error: "Failed to fetch"

This error means the **frontend cannot connect to the backend server**.

---

## ✅ Step-by-Step Fix

### Step 1: Create `.env` File in Server Folder

1. Navigate to `server` folder
2. Create a new file named `.env`
3. Add the following content:

```env
MONGODB_URI=your_mongodb_uri_here
PORT=5001
RAZORPAY_KEY_ID=rzp_test_Ry8lWnzqT4LLjW
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
JWT_SECRET=your_jwt_secret_here
```

4. **Replace** `your_razorpay_secret_here` with your actual Razorpay Key Secret from dashboard

### Step 2: Start Backend Server

Open **Terminal 1**:

```bash
cd server
npm run dev
```

**Wait for this output:**
```
Server is running on port 5001
Connected to MongoDB
```

✅ If you see this, backend is ready!

### Step 3: Start Frontend Server

Open **Terminal 2** (keep Terminal 1 running):

```bash
cd client
npm run dev
```

**Wait for this output:**
```
ready - started server on 0.0.0.0:3000
```

✅ If you see this, frontend is ready!

### Step 4: Test the Payment

1. Open browser: `http://localhost:3000/itinerary/goa`
2. Click **"Book Now"** button
3. Razorpay modal should open

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to payment server"

**Cause:** Backend server not running

**Solution:**
```bash
cd server
npm run dev
```

### Issue 2: Backend server crashes immediately

**Cause:** Missing `.env` file or MongoDB connection issue

**Solution:**
1. Create `.env` file (see Step 1 above)
2. Check MongoDB URI is correct
3. Make sure MongoDB is running

### Issue 3: "Port 5001 already in use"

**Cause:** Another process is using port 5001

**Solution (Windows):**
```bash
netstat -ano | findstr :5001
taskkill /PID <PID_NUMBER> /F
```

**Or change port in `.env`:**
```env
PORT=5002
```

Then update frontend URL in `ActionButtons.jsx`:
```javascript
fetch("http://localhost:5002/api/payment/create-order", {
```

### Issue 4: CORS error in browser console

**Cause:** Backend CORS not configured properly

**Solution:** Already fixed! CORS is configured in `server/server.js`

### Issue 5: "Invalid Razorpay Key"

**Cause:** Wrong or missing Razorpay credentials

**Solution:**
1. Check `.env` file has correct keys
2. Get keys from: https://dashboard.razorpay.com/ → Settings → API Keys
3. Restart backend server after updating `.env`

---

## 🔍 How to Verify Everything is Working

### Test 1: Backend Health Check

Open browser or Postman:
```
GET http://localhost:5001/api/payment/create-order
```

**Expected:** "Cannot GET" message (this is OK - it means server is running)

### Test 2: Create Order Test

Use Postman or curl:
```bash
curl -X POST http://localhost:5001/api/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000, "currency": "INR", "itineraryId": "test"}'
```

**Expected:** JSON response with order details

### Test 3: Frontend Connection

1. Open browser console (F12)
2. Go to `http://localhost:3000/itinerary/goa`
3. Click "Book Now"
4. Check console for logs:
   - "Creating order with amount: ..."
   - "Order created: ..."

---

## 📊 Server Status Checklist

Before testing payment, ensure:

- [ ] `.env` file exists in `server` folder
- [ ] `.env` has all required variables
- [ ] Backend server running (Terminal 1)
- [ ] Frontend server running (Terminal 2)
- [ ] No errors in backend console
- [ ] No errors in frontend console
- [ ] MongoDB connected successfully
- [ ] Port 5001 accessible
- [ ] Port 3000 accessible

---

## 💡 Quick Debug Commands

**Check if backend is running:**
```bash
curl http://localhost:5001
```

**Check backend logs:**
Look at Terminal 1 where backend is running

**Check frontend logs:**
Open browser console (F12) → Console tab

**Restart both servers:**
Press `Ctrl+C` in both terminals, then start again

---

## 🎯 Expected Flow

1. User clicks "Book Now"
2. Frontend sends request to `http://localhost:5001/api/payment/create-order`
3. Backend creates Razorpay order
4. Backend sends order details back to frontend
5. Frontend opens Razorpay modal
6. User completes payment
7. Frontend verifies payment with backend
8. User redirected to success page

---

## 📞 Still Having Issues?

1. Check both terminal outputs for error messages
2. Check browser console (F12) for errors
3. Verify `.env` file has correct values
4. Make sure both servers are running simultaneously
5. Try restarting both servers

---

**Most common fix: Make sure backend server is running!** 🚀

