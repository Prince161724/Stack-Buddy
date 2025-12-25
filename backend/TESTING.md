# Backend API Testing Guide

## 🔗 Backend URL
```
https://stack-buddy-backend.onrender.com
```

## ✅ How to Test Your Backend

### Method 1: Using Browser
Just open these URLs in your browser:

1. **Test if server is running:**
   ```
   https://stack-buddy-backend.onrender.com/user/feed
   ```
   (This will return 401 because you're not logged in - that's good! Server is working!)

### Method 2: Using PowerShell (curl)

#### 1. Test Signup API
```powershell
$headers = @{
    "Content-Type" = "application/json"
}
$body = @{
    firstName = "Test"
    lastName = "User"
    emailId = "test@example.com"
    password = "Test@123"
    age = 25
    gender = "male"
    skills = @("JavaScript", "React")
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://stack-buddy-backend.onrender.com/signup" -Method POST -Headers $headers -Body $body
```

#### 2. Test Login API
```powershell
$headers = @{
    "Content-Type" = "application/json"
}
$body = @{
    emailId = "test@example.com"
    password = "Test@123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://stack-buddy-backend.onrender.com/login" -Method POST -Headers $headers -Body $body
```

### Method 3: Using Postman/Thunder Client

**Test Signup:**
- Method: `POST`
- URL: `https://stack-buddy-backend.onrender.com/signup`
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
{
  "firstName": "Test",
  "lastName": "User", 
  "emailId": "test@example.com",
  "password": "Test@123",
  "age": 25,
  "gender": "male",
  "skills": ["JavaScript", "React"]
}
```

## 📋 All API Endpoints

### Authentication APIs
- `POST /signup` - Create new account
- `POST /login` - Login
- `POST /logout` - Logout

### Profile APIs
- `GET /profile` - Get your profile
- `PATCH /profile/edit` - Update profile
- `PATCH /profile/password` - Change password

### Connection APIs
- `POST /request/send/:status/:userId` - Send connection request
- `POST /request/review/:status/:requestId` - Accept/Reject request

### User APIs
- `GET /user/requests/received` - Get pending requests
- `GET /user/connections` - Get your connections
- `GET /user/feed` - Get user feed

### Chat APIs
- `GET /chat/:targetId` - Get chat history
- Socket.io for real-time messaging

## ⚠️ Expected Responses

### Success Response (Signup):
```json
{
  "message": "User created successfully",
  "data": {
    "_id": "...",
    "firstName": "Test",
    "emailId": "test@example.com"
  }
}
```

### Error Response (Unauthorized):
```json
{
  "message": "Please login to access this resource"
}
```

### Error Response (Server Error):
```json
{
  "message": "ERROR : <error message>"
}
```

## 🚨 Common Issues

### 1. Backend Not Responding (Cold Start)
**Problem:** Free tier sleeps after 15 minutes
**Solution:** First request takes 30-60 seconds to wake up. Just wait and retry.

### 2. CORS Errors
**Problem:** Frontend URL not allowed
**Solution:** Already added to CORS. If you deploy frontend, add that URL too.

### 3. 404 on Root URL
**Problem:** No route defined for `/`
**Solution:** Normal behavior! Use actual API endpoints like `/user/feed`

## ✅ What's Updated

### Frontend:
- ✅ Updated `config.js` to use Render URL
- ✅ All components now point to production backend

### Backend:
- ✅ Added backend URL to CORS (app.js)
- ✅ Added backend URL to Socket.io CORS (socket.js)
- ✅ Ready to accept requests from any origin

## 🔄 Next Steps

1. **Test Backend:** Use any method above to test APIs
2. **Deploy Frontend:** Deploy to Vercel/Netlify/Render
3. **Update CORS:** Add frontend URL to backend CORS
4. **Test Full Flow:** Signup → Login → Chat

## 📝 Notes

- Backend URL: `https://stack-buddy-backend.onrender.com`
- MongoDB: Already configured
- Socket.io: Will work once frontend connects
- Cron Job: Runs daily at 12:10 PM IST

---

**Your backend is LIVE! 🎉**
