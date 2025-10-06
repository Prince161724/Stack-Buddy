# Stack Buddy - Quick Deployment Commands

## Generate JWT Secret
Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## MongoDB Atlas Setup
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster
3. Get your connection string

## Deploy Backend to Render
1. Go to: https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub: https://github.com/Prince161724/Stack-Buddy
4. Settings:
   - Root Directory: `StackBuddy-backend-master/StackBuddy-backend-master`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables (see DEPLOYMENT.md)

## Deploy Frontend to Netlify
1. Go to: https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub: https://github.com/Prince161724/Stack-Buddy
4. Settings:
   - Base directory: `StackBuddy-frontend-master/StackBuddy-frontend-master`
   - Build command: `npm run build`
   - Publish directory: `StackBuddy-frontend-master/StackBuddy-frontend-master/dist`
5. Add environment variable: `VITE_BACKEND_URL`

## Important URLs
- GitHub Repo: https://github.com/Prince161724/Stack-Buddy
- Render Dashboard: https://dashboard.render.com/
- Netlify Dashboard: https://app.netlify.com/
- MongoDB Atlas: https://cloud.mongodb.com/

## Quick Links for Sign Up
- Render: https://dashboard.render.com/register
- Netlify: https://app.netlify.com/signup
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register

---

For detailed step-by-step instructions, see DEPLOYMENT.md
