# Stack Buddy Backend - Deployment Guide

## 🎯 Overview
Stack Buddy is a developer networking platform built with Express.js, MongoDB, Socket.io for real-time chat, and AWS SES for email notifications.

## 📦 Tech Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Real-time:** Socket.io
- **Authentication:** JWT with HTTP-only cookies
- **Email Service:** AWS SES
- **Scheduled Tasks:** Node-cron (daily email reminders)

## 🚀 Deploy to Render

### Prerequisites
1. GitHub account with this repository pushed
2. MongoDB Atlas account with database set up
3. AWS account with SES configured
4. Render account (free tier works)

### Step-by-Step Deployment

#### 1. **Push to GitHub** (Already Done ✅)
Your code is already on: https://github.com/Prince161724/Stack-Buddy.git

#### 2. **Login to Render**
- Go to [render.com](https://render.com)
- Sign up/login with your GitHub account

#### 3. **Create New Web Service**
- Click **"New +"** → **"Web Service"**
- Select **"Build and deploy from a Git repository"**
- Click **"Connect account"** and authorize GitHub
- Find and select your repository: `Prince161724/Stack-Buddy`

#### 4. **Configure the Service**

Fill in these settings:

**Basic Settings:**
- **Name:** `stackbuddy-backend` (or any name you prefer)
- **Region:** Choose closest to your users (Singapore, Oregon, Frankfurt)
- **Branch:** `main`
- **Root Directory:** `backend` ⚠️ **IMPORTANT**
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **Free** (or paid if you need more resources)

#### 5. **Add Environment Variables**

Click **"Advanced"** and add these environment variables:

| Key | Value | Where to Get |
|-----|-------|--------------|
| `MONGO_URI` | Your MongoDB connection string | MongoDB Atlas → Database → Connect → Connection String |
| `JWT_SECRET` | Strong random string (min 32 chars) | Generate using: `openssl rand -base64 32` |
| `AWS_ACCESS_KEY` | Your AWS access key | AWS IAM → Users → Security Credentials |
| `AWS_SECRET_KEY` | Your AWS secret key | AWS IAM → Users → Security Credentials |
| `NODE_VERSION` | `18.17.0` | N/A |

**Example:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/Stackbuddy?retryWrites=true&w=majority
JWT_SECRET=super-secret-jwt-key-min-32-characters-long-1234567890
AWS_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

#### 6. **Deploy**
- Click **"Create Web Service"**
- Render will automatically:
  - Clone your repository
  - Install dependencies (`npm install`)
  - Start your server (`npm start`)
- Wait 5-10 minutes for the first deployment

#### 7. **Get Your Backend URL**
After deployment, you'll get a URL like:
```
https://stackbuddy-backend.onrender.com
```

---

## 🔧 Post-Deployment Configuration

### Update Frontend CORS
Your backend already has CORS configured for:
- localhost:5173 (development)
- localhost:3200 (development)
- stackbuddy.projectwork.tech (production)

**To add your Render URL:**
1. Go to `backend/src/app.js`
2. Add your Render backend URL to the CORS origins:
```javascript
cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-url.onrender.com", // Add your frontend URL
    "https://stackbuddy-backend.onrender.com" // Your backend URL
  ],
  credentials: true,
})
```

### Update Socket.io CORS
1. Go to `backend/src/utils/socket.js`
2. Add your frontend URL to Socket.io CORS:
```javascript
cors: {
  origin: [
    "http://localhost:5173",
    "https://your-frontend-url.onrender.com", // Add this
  ],
  credentials: true,
}
```

---

## 📝 Important Notes

### Free Tier Limitations
- **Cold Starts:** Free tier services spin down after 15 minutes of inactivity
- First request after spin-down will be slow (30-60 seconds)
- **Solution:** Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your API every 10 minutes

### Database
- Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
- Or add Render's IP addresses to whitelist

### AWS SES
- Make sure your AWS SES is out of sandbox mode (or verify recipient emails)
- SES region is set to `ap-south-1` (Mumbai) in the code

### Environment Variables
- NEVER commit `.env` files to GitHub
- Always use `.env.example` as a template
- Store real credentials only in Render dashboard

---

## 🧪 Testing Your Deployment

### 1. **Test Health Check**
Visit your Render URL:
```
https://your-app-name.onrender.com/
```

### 2. **Test API Endpoints**
```bash
# Test signup
curl -X POST https://your-app-name.onrender.com/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "emailId": "test@example.com",
    "password": "TestPass123"
  }'
```

### 3. **Monitor Logs**
- Go to Render dashboard
- Click on your service
- Check **"Logs"** tab for any errors

---

## 🔍 Troubleshooting

### Service Won't Start
- Check logs for errors
- Verify all environment variables are set correctly
- Ensure `Root Directory` is set to `backend`

### Database Connection Fails
- Verify MONGO_URI is correct
- Check MongoDB Atlas network access (whitelist 0.0.0.0/0)
- Ensure database user has read/write permissions

### CORS Errors
- Add your frontend URL to CORS origins in `app.js` and `socket.js`
- Ensure `credentials: true` is set

### Cold Start Issues
- Use paid tier ($7/month) for always-on service
- Or use UptimeRobot to keep free tier warm

---

## 📚 API Documentation

See [apiList.md](./apiList.md) for complete API documentation.

---

## 🔐 Security Checklist

- [x] `.env` files in `.gitignore`
- [x] JWT secret is strong and random
- [x] MongoDB connection uses authenticated user
- [x] CORS configured for specific origins
- [x] Passwords hashed with bcrypt
- [x] HTTP-only cookies for JWT tokens

---

## 💡 Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [AWS SES Setup](https://docs.aws.amazon.com/ses/latest/dg/setting-up.html)

---

## 📞 Support

If you encounter issues:
1. Check Render logs
2. Verify environment variables
3. Test MongoDB connection locally
4. Check AWS SES credentials

Good luck with your deployment! 🚀
