# Stack Buddy - Quick Deployment Guide

## 🚀 Fastest Way to Deploy Frontend

### Option 1: Vercel (RECOMMENDED - 2 Minutes)

1. **Go to Vercel:**
   ```
   https://vercel.com/new
   ```

2. **Import Git Repository:**
   - Login with GitHub
   - Select: `Prince161724/Stack-Buddy`
   - Set Root Directory: `frontend`
   - Click Deploy!

3. **Done!** You'll get a URL like:
   ```
   https://stack-buddy.vercel.app
   ```

---

### Option 2: Netlify (3 Minutes)

1. **Go to Netlify:**
   ```
   https://app.netlify.com/start
   ```

2. **Import from GitHub:**
   - Select: `Prince161724/Stack-Buddy`
   - Base Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `dist`

3. **Deploy!** Get URL like:
   ```
   https://stack-buddy.netlify.app
   ```

---

### Option 3: Render (5 Minutes)

1. **Go to Render:**
   ```
   https://dashboard.render.com/select-repo
   ```

2. **Create Static Site:**
   - Select repo
   - Root Directory: `frontend`
   - Build: `npm run build`
   - Publish: `dist`

---

## ⚠️ IMPORTANT: After Deployment

### Update Backend CORS

Once you get your frontend URL, add it to backend:

**File: `backend/src/app.js`**
```javascript
cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-url.vercel.app", // ADD THIS
    "https://stack-buddy-backend.onrender.com"
  ],
  credentials: true,
})
```

**File: `backend/src/utils/socket.js`**
```javascript
cors: {
  origin: [
    "http://localhost:5173",
    "https://your-frontend-url.vercel.app", // ADD THIS
  ],
  credentials: true,
}
```

Then push to GitHub:
```bash
git add .
git commit -m "Add frontend URL to CORS"
git push
```

Render will auto-redeploy backend!

---

## ✅ Testing After Deploy

1. **Open your frontend URL**
2. **Test Signup:**
   - Enter name, email, password
   - Click Sign Up
   - Should redirect to feed

3. **Test Chat:**
   - Click on a user
   - Send message
   - Should see real-time updates

---

## 📋 Current Setup

- ✅ Backend: `https://stack-buddy-backend.onrender.com`
- ✅ Frontend Code: Ready to deploy
- ✅ Backend URL: Already configured
- ⏳ Frontend URL: Get after deployment
- ⏳ CORS Update: After you get frontend URL

---

## 🎯 Complete Flow

```
1. Deploy Frontend (Vercel/Netlify) → Get URL
2. Add URL to Backend CORS → Push to GitHub
3. Test Application → Done! 🎉
```

---

**Choose any platform above and deploy in 2-5 minutes!** 🚀

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
