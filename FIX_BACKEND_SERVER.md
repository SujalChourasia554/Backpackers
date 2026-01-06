# 🔧 Fix Backend Server Not Running

## Current Issue

**Error:** "Cannot connect to payment server. Please make sure the backend server is running on http://localhost:5001"

**Cause:** Backend server is not running or crashed

---

## ✅ Step-by-Step Fix

### Step 1: Check if `.env` File Has All Required Variables

Open `server/.env` and make sure it has:

```env
MONGODB_URI=mongodb://localhost:27017/backpackers
PORT=5001
RAZORPAY_KEY_ID=rzp_test_Ry8lWnzqT4LLjW
RAZORPAY_KEY_SECRET=your_actual_secret_here
JWT_SECRET=any_random_string_here
```

**Important:** Replace `your_actual_secret_here` with your actual Razorpay Key Secret from the dashboard.

### Step 2: Start Backend Server Manually

Open a **NEW terminal** (not in VS Code, use Windows Terminal or PowerShell):

```bash
cd C:\Users\ShantyXavier(G10XIND\final\Backpackers\server
npm run dev
```

**Watch for these messages:**

✅ **Success:**
```
Server is running on port 5001
✅ Razorpay initialized with Key ID: rzp_test_Ry8lWnzqT4LLjW
Connected to MongoDB
```

❌ **Error - Missing Razorpay Secret:**
```
❌ ERROR: Razorpay credentials not found in environment variables!
```
**Fix:** Add RAZORPAY_KEY_SECRET to `.env` file

❌ **Error - MongoDB Connection:**
```
Error connecting to MongoDB
```
**Fix:** Check MONGODB_URI in `.env` file or install MongoDB

❌ **Error - Port in Use:**
```
Error: listen EADDRINUSE: address already in use :::5001
```
**Fix:** Kill the process using port 5001:
```bash
netstat -ano | findstr :5001
taskkill /PID <PID_NUMBER> /F
```

### Step 3: Keep Terminal Open

**IMPORTANT:** Do NOT close this terminal! Keep it running in the background.

You should see logs like:
```
[nodemon] starting `node server.js`
Server is running on port 5001
```

### Step 4: Test Backend is Running

Open browser and go to:
```
http://localhost:5001
```

You should see some response (even an error is OK - it means server is running)

### Step 5: Test Payment Again

1. Go to: `http://localhost:3000/itinerary/goa`
2. Click "Book Now"
3. Razorpay modal should open! 🎉

---

## 🐛 Common Issues

### Issue 1: "Cannot find module 'razorpay'"

**Solution:**
```bash
cd server
npm install
```

### Issue 2: Server starts then immediately crashes

**Check the error message in terminal**

Common causes:
- Missing `.env` file
- Invalid MongoDB URI
- Missing environment variables

### Issue 3: "nodemon: command not found"

**Solution:**
```bash
cd server
npm install nodemon --save-dev
```

### Issue 4: Port 5001 already in use

**Solution (Windows):**
```bash
netstat -ano | findstr :5001
taskkill /PID <PID_NUMBER> /F
```

**Or use a different port:**

In `server/.env`:
```env
PORT=5002
```

In `client/Components/itinerary/ActionButtons.jsx`:
```javascript
fetch("http://localhost:5002/api/payment/create-order", {
```

---

## 📊 Checklist

Before testing payment:

- [ ] `.env` file exists in `server` folder
- [ ] `.env` has all 5 variables (MONGODB_URI, PORT, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, JWT_SECRET)
- [ ] Razorpay Key Secret is correct (from dashboard)
- [ ] Backend terminal is open and showing "Server is running on port 5001"
- [ ] No errors in backend terminal
- [ ] Frontend is running on port 3000

---

## 💡 Pro Tip: Use 2 Terminals

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Keep this running!

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Keep this running too!

Both must be running simultaneously for payment to work!

---

## 🎯 Quick Test Commands

**Test if backend is running:**
```bash
curl http://localhost:5001
```

**Test if frontend is running:**
```bash
curl http://localhost:3000
```

**Check what's using port 5001:**
```bash
netstat -ano | findstr :5001
```

---

**After following these steps, try clicking "Book Now" again!** 🚀

