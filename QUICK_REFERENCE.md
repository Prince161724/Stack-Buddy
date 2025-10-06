# 🎯 Quick Deployment Reference Card

## ✅ COMPLETED

### Frontend Deployment
- **Status:** ✅ LIVE
- **URL:** https://stackbuddyprince.netlify.app
- **Platform:** Netlify

---

## ⏳ TO DO (Follow these steps)

### 1. MongoDB Atlas (5 min)
📍 **URL:** https://cloud.mongodb.com/

**Steps:**
1. Create free cluster (M0)
2. Create user: `stackbuddy_user` + password
3. Whitelist IP: `0.0.0.0/0`
4. Get connection string
5. **Copy this format:**
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/stackbuddy?retryWrites=true&w=majority
   ```

---

### 2. Deploy Backend on Render (10 min)
📍 **URL:** https://dashboard.render.com/create?type=web

**Configuration:**
```
Repository: Prince161724/Stack-Buddy
Root Directory: StackBuddy-backend-master/StackBuddy-backend-master
Build Command: npm install
Start Command: npm start
```

**Environment Variables:**
```
MONGO_URI = <your-mongodb-string-from-step-1>
JWT_SECRET = 6945409ba95831b0e09ad8149c07b5a85701ec91a31fb92f1d57da0ae4034e6796af3b90863dfcc601cf4d5d999141dbb01eb9bb71880339d8b4cac13e678f6e
PORT = 10000
FRONTEND_URL = https://stackbuddyprince.netlify.app
NODE_ENV = production
```

**After deployment, copy your backend URL!**

---

### 3. Update Frontend (2 min)
📍 **URL:** https://app.netlify.com/projects/stackbuddyprince/settings/env

**Add Environment Variable:**
```
Key: VITE_BACKEND_URL
Value: <your-render-backend-url>
```

**Then:** Trigger redeploy from Deploys tab

---

## 🔑 Your Credentials

### JWT Secret (for Render backend env)
```
6945409ba95831b0e09ad8149c07b5a85701ec91a31fb92f1d57da0ae4034e6796af3b90863dfcc601cf4d5d999141dbb01eb9bb71880339d8b4cac13e678f6e
```

### Frontend URL (for Render backend env)
```
https://stackbuddyprince.netlify.app
```

---

## 📱 Test Your App

Once backend is deployed and frontend is updated:

1. Open: https://stackbuddyprince.netlify.app
2. Sign up with a new account
3. Test all features!

---

## 🆘 Need Help?

See detailed guide: `LIVE_DEPLOYMENT_STATUS.md`
