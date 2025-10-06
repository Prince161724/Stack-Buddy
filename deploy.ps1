# Automated Deployment Helper for Stack Buddy

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "   Stack Buddy Deployment Assistant   " -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: MongoDB Setup
Write-Host "STEP 1: MongoDB Atlas Setup" -ForegroundColor Yellow
Write-Host "Please follow these steps:" -ForegroundColor White
Write-Host "1. Go to: https://cloud.mongodb.com/" -ForegroundColor Green
Write-Host "2. Create a free cluster (M0 tier)" -ForegroundColor Green
Write-Host "3. Create a database user" -ForegroundColor Green
Write-Host "4. Whitelist IP: 0.0.0.0/0" -ForegroundColor Green
Write-Host "5. Get your connection string" -ForegroundColor Green
Write-Host ""

$mongoUri = Read-Host "Enter your MongoDB connection string (or press Enter to skip for now)"

if ($mongoUri) {
    $envContent = @"
MONGO_URI=$mongoUri
JWT_SECRET=6945409ba95831b0e09ad8149c07b5a85701ec91a31fb92f1d57da0ae4034e6796af3b90863dfcc601cf4d5d999141dbb01eb9bb71880339d8b4cac13e678f6e
PORT=8000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
"@
    Set-Content -Path "StackBuddy-backend-master\StackBuddy-backend-master\.env" -Value $envContent
    Write-Host "✓ Backend .env file updated!" -ForegroundColor Green
} else {
    Write-Host "⚠ Skipped MongoDB setup. You'll need to configure this before backend deployment." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "STEP 2: Deploy Frontend to Netlify" -ForegroundColor Yellow
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

$deployFrontend = Read-Host "Deploy frontend now? (y/n)"

if ($deployFrontend -eq "y") {
    Write-Host "Building frontend..." -ForegroundColor Green
    Set-Location "StackBuddy-frontend-master\StackBuddy-frontend-master"
    
    # Install dependencies
    Write-Host "Installing dependencies..." -ForegroundColor Cyan
    npm install
    
    # Build
    Write-Host "Building project..." -ForegroundColor Cyan
    npm run build
    
    # Deploy to Netlify
    Write-Host "Deploying to Netlify..." -ForegroundColor Cyan
    Write-Host "This will create a draft deploy first. Review it, then deploy to production." -ForegroundColor Yellow
    netlify deploy
    
    Set-Location "..\..\"
    
    Write-Host ""
    Write-Host "✓ Frontend deployed!" -ForegroundColor Green
    Write-Host "Run 'netlify deploy --prod' from the frontend directory to deploy to production" -ForegroundColor Yellow
} else {
    Write-Host "Skipped frontend deployment" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "STEP 3: Deploy Backend to Render" -ForegroundColor Yellow
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend deployment requires manual setup on Render:" -ForegroundColor White
Write-Host "1. Go to: https://dashboard.render.com/" -ForegroundColor Green
Write-Host "2. Click 'New +' → 'Web Service'" -ForegroundColor Green
Write-Host "3. Connect your GitHub repo: Prince161724/Stack-Buddy" -ForegroundColor Green
Write-Host "4. Use these settings:" -ForegroundColor Green
Write-Host "   - Root Directory: StackBuddy-backend-master/StackBuddy-backend-master" -ForegroundColor Cyan
Write-Host "   - Build Command: npm install" -ForegroundColor Cyan
Write-Host "   - Start Command: npm start" -ForegroundColor Cyan
Write-Host "5. Add environment variables:" -ForegroundColor Green
Write-Host "   - MONGO_URI: <your MongoDB connection string>" -ForegroundColor Cyan
Write-Host "   - JWT_SECRET: 6945409ba95831b0e09ad8149c07b5a85701ec91a31fb92f1d57da0ae4034e6796af3b90863dfcc601cf4d5d999141dbb01eb9bb71880339d8b4cac13e678f6e" -ForegroundColor Cyan
Write-Host "   - PORT: 10000" -ForegroundColor Cyan
Write-Host "   - FRONTEND_URL: <your Netlify URL>" -ForegroundColor Cyan
Write-Host "   - NODE_ENV: production" -ForegroundColor Cyan
Write-Host ""

$openRender = Read-Host "Open Render dashboard in browser? (y/n)"
if ($openRender -eq "y") {
    Start-Process "https://dashboard.render.com/"
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "        Deployment Summary            " -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Complete MongoDB Atlas setup if not done" -ForegroundColor White
Write-Host "2. Deploy backend on Render" -ForegroundColor White
Write-Host "3. Get your backend URL from Render" -ForegroundColor White
Write-Host "4. Update frontend .env with backend URL" -ForegroundColor White
Write-Host "5. Redeploy frontend with: netlify deploy --prod" -ForegroundColor White
Write-Host "6. Update backend FRONTEND_URL on Render" -ForegroundColor White
Write-Host ""
Write-Host "For detailed instructions, see DEPLOYMENT_SUMMARY.md" -ForegroundColor Cyan
Write-Host ""
