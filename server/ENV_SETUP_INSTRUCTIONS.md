# 🔑 Environment Variables Setup

## Create `.env` file in the `server` folder

Create a file named `.env` in the `server` directory with the following content:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string_here

# Server Port
PORT=5001

# Razorpay Credentials
RAZORPAY_KEY_ID=rzp_test_Ry8lWnzqT4LLjW
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_here
```

## How to Get Razorpay Key Secret

1. Go to: https://dashboard.razorpay.com/
2. Login with your account
3. Navigate to: **Settings** → **API Keys**
4. You'll see:
   - **Key ID**: `rzp_test_Ry8lWnzqT4LLjW` (already in the code)
   - **Key Secret**: Click "Show" button to reveal it
5. Copy the **Key Secret** and paste it in your `.env` file

## Example `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/backpackers
PORT=5001
RAZORPAY_KEY_ID=rzp_test_Ry8lWnzqT4LLjW
RAZORPAY_KEY_SECRET=abcd1234efgh5678ijkl
JWT_SECRET=my_super_secret_jwt_key
```

## ⚠️ Important

- Never commit `.env` file to Git
- Keep your Razorpay Key Secret private
- The `.env` file should be in `.gitignore`

## After Creating `.env`:

1. Save the file
2. Restart your backend server
3. Try the payment again

---

**File location:** `server/.env` (create this file manually)

