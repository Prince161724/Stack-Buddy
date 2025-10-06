# Stack Buddy Deployment Guide

## Overview
This guide will help you deploy Stack Buddy's frontend and backend.

**Frontend**: Netlify  
**Backend**: Render (or Railway as alternative)  
**Database**: MongoDB Atlas

---

## Prerequisites

1. **GitHub Account** ✅ (Already set up: https://github.com/Prince161724/Stack-Buddy.git)
2. **MongoDB Atlas Account** (Free tier available at https://www.mongodb.com/cloud/atlas)
3. **Netlify Account** (Sign up at https://www.netlify.com/)
4. **Render Account** (Sign up at https://render.com/)

---

## Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new cluster (choose the FREE tier)
4. Click "Connect" on your cluster
5. Add your IP address (or allow access from anywhere: 0.0.0.0/0)
6. Create a database user with username and password
7. Copy your connection string (it looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/stackbuddy?retryWrites=true&w=majority
   ```
8. Replace `<password>` with your actual password
9. Replace the database name if needed (default: `stackbuddy`)

---

## Step 2: Deploy Backend to Render

### Option A: Using Render Dashboard

1. Go to https://render.com/ and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select the repository: `Stack-Buddy`
5. Configure the service:
   - **Name**: `stackbuddy-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `StackBuddy-backend-master/StackBuddy-backend-master`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   MONGO_URI = <your-mongodb-connection-string>
   JWT_SECRET = <generate-a-random-secret-key>
   PORT = 10000
   FRONTEND_URL = https://<your-app-name>.netlify.app
   NODE_ENV = production
   ```

   **To generate JWT_SECRET**, run this in terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy your backend URL (e.g., `https://stackbuddy-backend.onrender.com`)

### Option B: Using Railway (Alternative)

1. Go to https://railway.app/ and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `Stack-Buddy` repository
4. Add environment variables in Settings → Variables:
   ```
   MONGO_URI = <your-mongodb-connection-string>
   JWT_SECRET = <your-jwt-secret>
   PORT = 8000
   FRONTEND_URL = https://<your-app-name>.netlify.app
   NODE_ENV = production
   ```
5. In Settings → General:
   - **Root Directory**: `StackBuddy-backend-master/StackBuddy-backend-master`
   - **Start Command**: `npm start`
6. Copy your Railway app URL

---

## Step 3: Deploy Frontend to Netlify

1. Go to https://www.netlify.com/ and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select the repository: `Stack-Buddy`
5. Configure the build settings:
   - **Branch**: `main`
   - **Base directory**: `StackBuddy-frontend-master/StackBuddy-frontend-master`
   - **Build command**: `npm run build`
   - **Publish directory**: `StackBuddy-frontend-master/StackBuddy-frontend-master/dist`

6. Add Environment Variables (before deploying):
   - Click "Show advanced" → "New variable"
   - Add:
     ```
     VITE_BACKEND_URL = <your-backend-url-from-render>
     ```
     Example: `https://stackbuddy-backend.onrender.com`

7. Click "Deploy site"
8. Wait for deployment (3-5 minutes)
9. Copy your Netlify URL (e.g., `https://yourapp.netlify.app`)

---

## Step 4: Update Backend with Frontend URL

1. Go back to Render dashboard
2. Navigate to your backend service
3. Go to "Environment" tab
4. Update the `FRONTEND_URL` variable with your Netlify URL
5. Click "Save Changes"
6. The service will automatically redeploy

---

## Step 5: Verify Deployment

1. Open your Netlify URL in a browser
2. Try signing up/logging in
3. Test the features:
   - User profile
   - Connections
   - Chat (real-time messaging)
   - Feed

---

## Environment Variables Summary

### Backend (.env on Render/Railway)
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/stackbuddy
JWT_SECRET=your_generated_secret_key_here
PORT=10000
FRONTEND_URL=https://yourapp.netlify.app
NODE_ENV=production
```

### Frontend (Environment Variables on Netlify)
```env
VITE_BACKEND_URL=https://stackbuddy-backend.onrender.com
```

---

## Troubleshooting

### Backend Issues

1. **502 Bad Gateway**: Check Render logs, ensure MongoDB connection string is correct
2. **CORS Errors**: Verify `FRONTEND_URL` is set correctly in backend
3. **Database Connection**: Check MongoDB Atlas IP whitelist and credentials

### Frontend Issues

1. **API Connection Failed**: Verify `VITE_BACKEND_URL` is set correctly
2. **Build Errors**: Check build logs on Netlify
3. **404 on Refresh**: The `netlify.toml` file should handle this (already included)

### General Tips

- Check logs in Render/Netlify dashboards
- Ensure all environment variables are set
- Free tier services may sleep after inactivity (first request might be slow)
- MongoDB Atlas free tier has connection limits (consider upgrading if needed)

---

## Custom Domain (Optional)

### For Frontend (Netlify)
1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions

### For Backend (Render)
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

---

## Cost Breakdown

- **MongoDB Atlas**: Free (512MB storage)
- **Render**: Free (750 hours/month, sleeps after 15 min inactivity)
- **Netlify**: Free (100GB bandwidth/month)
- **Total**: $0/month 🎉

---

## Monitoring

- **Render**: https://dashboard.render.com/ (check logs, metrics)
- **Netlify**: https://app.netlify.com/ (check deploys, analytics)
- **MongoDB Atlas**: https://cloud.mongodb.com/ (check database metrics)

---

## Next Steps

1. Set up custom domain
2. Configure email service (AWS SES for production)
3. Set up monitoring/alerts
4. Add CI/CD pipeline
5. Enable HTTPS (automatic on Render & Netlify)

---

## Support

For issues or questions:
- Check the GitHub repository: https://github.com/Prince161724/Stack-Buddy
- Review platform documentation:
  - Render: https://render.com/docs
  - Netlify: https://docs.netlify.com
  - MongoDB Atlas: https://docs.atlas.mongodb.com

---

**Deployment Checklist**:
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string obtained
- [ ] Backend deployed on Render
- [ ] Backend environment variables set
- [ ] Backend URL copied
- [ ] Frontend deployed on Netlify
- [ ] Frontend environment variable set
- [ ] Backend FRONTEND_URL updated
- [ ] Application tested end-to-end
- [ ] Custom domain configured (optional)

Good luck with your deployment! 🚀
