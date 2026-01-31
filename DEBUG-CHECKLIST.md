# 🔧 Chatify Debug Checklist

## ✅ Environment Setup
- [x] Backend .env file created with all required variables
- [x] JWT_SECRET set to "myjwtsecret"
- [x] CLIENT_URL set to "http://localhost:5173"
- [x] NODE_ENV set to "development"
- [x] MongoDB URI configured
- [x] Email service (Resend) configured
- [x] Cloudinary configured
- [x] Arcjet disabled for development

## 🔍 Frontend Configuration
- [x] Axios baseURL: http://localhost:3001/api
- [x] Socket URL: http://localhost:3001
- [x] withCredentials: true for both
- [x] React Router configured
- [x] Zustand store setup

## 🛠️ Backend Configuration
- [x] Express server on port 3001
- [x] CORS configured for localhost:5173
- [x] Cookie parser middleware
- [x] Auth routes: /api/auth/*
- [x] Socket.io with authentication
- [x] MongoDB connection
- [x] JWT token generation

## 🧪 Testing Files Created
1. **test-api.js** - Node.js API testing script
2. **test-frontend.html** - Browser-based testing interface

## 🚀 How to Test

### Method 1: Browser Testing
1. Open `test-frontend.html` in your browser
2. Test each API endpoint step by step
3. Check results in real-time

### Method 2: Node.js Testing
1. Run `node test-api.js` in terminal
2. See all API responses in console

### Method 3: Manual Testing
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:5173
4. Test signup/login manually

## 🔍 Common Issues & Solutions

### Issue: "Only loading" on signup
**Solution**: Check browser console for network errors
- Open F12 → Network tab
- Look for failed requests to /api/auth/signup

### Issue: CORS errors
**Solution**: Verify CLIENT_URL in .env matches frontend URL
- Should be: http://localhost:5173

### Issue: JWT token errors
**Solution**: Check JWT_SECRET is properly set
- Should be: myjwtsecret

### Issue: Socket connection failed
**Solution**: Check socket authentication middleware
- Verify cookies are being sent

## 📋 API Endpoints to Test

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check authentication status

### Expected Responses

#### Signup Success
```json
{
  "_id": "user_id",
  "fullName": "Test User",
  "email": "test@example.com",
  "profilePic": null
}
```

#### Login Success
```json
{
  "_id": "user_id",
  "fullName": "Test User",
  "email": "test@example.com",
  "profilePic": null
}
```

#### Auth Check Success
```json
{
  "_id": "user_id",
  "fullName": "Test User",
  "email": "test@example.com",
  "profilePic": null
}
```

## 🎯 Debug Steps

1. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Test Files**
   - Browser: http://localhost:5173/test-frontend.html
   - Or run: `node test-api.js`

4. **Test in Order**
   1. Signup → Should create user
   2. Login → Should authenticate
   3. Auth Check → Should return user data
   4. Logout → Should clear cookies
   5. Socket → Should connect with authentication

## 🚨 If Still Not Working

1. Check backend console for errors
2. Check browser console for JavaScript errors
3. Check Network tab for failed requests
4. Verify .env file has all variables
5. Ensure both servers are running on correct ports

## 📞 Support

If issues persist:
1. Check this checklist
2. Run the test files
3. Examine console errors
4. Verify all configurations
