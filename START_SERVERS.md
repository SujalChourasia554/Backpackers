# 🚀 How to Start Both Servers

## ❌ Current Issue: Backend Server Not Running

The error "Failed to fetch" means your **backend server is not running** on `http://localhost:5001`.

---

## ✅ Solution: Start Both Servers

You need to run **TWO terminals** simultaneously:

### Terminal 1: Backend Server (Port 5001)

```bash
cd server
npm run dev
```

**Expected output:**
```
Server is running on port 5001
Connected to MongoDB
```

### Terminal 2: Frontend Server (Port 3000)

```bash
cd client
npm run dev
```

**Expected output:**
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## 🔍 Checklist Before Testing Payment

- [ ] Backend server running on `http://localhost:5001` ✅
- [ ] Frontend server running on `http://localhost:3000` ✅
- [ ] MongoDB connected ✅
- [ ] `.env` file in `server` folder with Razorpay keys ✅
- [ ] Both servers showing no errors ✅

---

## 📝 Quick Test

1. **Check backend is running:**
   - Open browser: `http://localhost:5001/api/payment/create-order`
   - Should show: "Cannot GET /api/payment/create-order" (this is OK - it means server is running)

2. **Check frontend is running:**
   - Open browser: `http://localhost:3000`
   - Should show your homepage

3. **Test payment:**
   - Go to: `http://localhost:3000/itinerary/goa`
   - Click "Book Now"
   - Should open Razorpay modal

---

## 🐛 If Backend Won't Start

### Issue: Port 5001 already in use

**Solution:**
```bash
# Windows
netstat -ano | findstr :5001
taskkill /PID <PID_NUMBER> /F

# Or change port in server/.env
PORT=5002
```

### Issue: MongoDB connection error

**Solution:**
- Check `MONGODB_URI` in `server/.env`
- Make sure MongoDB is running

### Issue: Missing dependencies

**Solution:**
```bash
cd server
npm install
```

---

## 🎯 Current Setup

- **Backend API:** `http://localhost:5001`
- **Frontend:** `http://localhost:3000`
- **Payment Endpoint:** `http://localhost:5001/api/payment/create-order`
- **Verify Endpoint:** `http://localhost:5001/api/payment/verify`

---

## 💡 Pro Tip

Use **VS Code's Split Terminal** feature:
1. Open terminal in VS Code
2. Click the "+" icon twice to create 2 terminals
3. Run backend in terminal 1
4. Run frontend in terminal 2

Both will run simultaneously! 🎉

---

**After starting both servers, refresh your browser and try clicking "Book Now" again!**

