# Stack Buddy - Architecture & Deployment

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS                                    │
│                    (Browser/Mobile)                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ • React 18 + Redux Toolkit                                │  │
│  │ • Tailwind CSS + DaisyUI                                  │  │
│  │ • React Router v7                                         │  │
│  │ • Socket.io Client                                        │  │
│  │ • Deployed on: Vercel/Netlify                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTPS + WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                 BACKEND (Node.js + Express)                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ • Express.js REST API                                     │  │
│  │ • Socket.io Server (Real-time Chat)                       │  │
│  │ • JWT Authentication                                      │  │
│  │ • Node-cron (Daily Email Jobs)                            │  │
│  │ • Deployed on: Render                                     │  │
│  │ • URL: https://stack-buddy-backend.onrender.com          │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────┬────────────────────────────┬─────────────────────┘
               │                            │
               ▼                            ▼
    ┌──────────────────┐        ┌─────────────────────┐
    │  MongoDB Atlas   │        │     AWS SES         │
    │   (Database)     │        │  (Email Service)    │
    │                  │        │                     │
    │ • User Data      │        │ • Connection        │
    │ • Connections    │        │   Reminders         │
    │ • Chat Messages  │        │ • Notifications     │
    └──────────────────┘        └─────────────────────┘
```

---

## 🔄 Data Flow

### 1. User Authentication Flow
```
User → Frontend → Backend API → MongoDB
              ↓
         JWT Token (Cookie)
              ↓
    Stored in Browser
```

### 2. Real-time Chat Flow
```
User A → Frontend → Socket.io → Backend → Socket.io → Frontend → User B
                        ↓
                   MongoDB (Save)
```

### 3. Connection Request Flow
```
User → Send Request → Backend API → MongoDB
                         ↓
                    Notification
                         ↓
                    User Receives
```

---

## 🌐 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      GITHUB REPOSITORY                       │
│         https://github.com/Prince161724/Stack-Buddy         │
│                                                              │
│  ├── frontend/          (React App)                         │
│  └── backend/           (Express API)                       │
└────────────┬──────────────────────────┬─────────────────────┘
             │                          │
             │                          │
   Auto Deploy                    Auto Deploy
             │                          │
             ▼                          ▼
┌──────────────────────┐    ┌────────────────────────┐
│   VERCEL/NETLIFY     │    │       RENDER           │
│   (Frontend Host)    │    │    (Backend Host)      │
│                      │    │                        │
│ • Auto Build         │    │ • Auto Build           │
│ • Global CDN         │    │ • Environment Vars     │
│ • HTTPS              │    │ • Always Running*      │
│ • Custom Domain      │    │ • Logs & Monitoring    │
└──────────────────────┘    └────────────────────────┘
```

---

## 📦 Tech Stack Summary

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| Vite | Build Tool |
| Redux Toolkit | State Management |
| React Router | Routing |
| Tailwind CSS | Styling |
| DaisyUI | UI Components |
| Socket.io Client | Real-time Chat |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| Socket.io | WebSockets |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| Node-cron | Scheduled Tasks |
| AWS SES | Email Service |

---

## 🔐 Security Features

```
┌─────────────────────────────────────────┐
│          Security Layers                 │
├─────────────────────────────────────────┤
│ 1. HTTPS (SSL/TLS)         ✅           │
│ 2. JWT Authentication      ✅           │
│ 3. HTTP-only Cookies       ✅           │
│ 4. Password Hashing        ✅           │
│ 5. CORS Protection         ✅           │
│ 6. Input Validation        ✅           │
│ 7. Environment Variables   ✅           │
└─────────────────────────────────────────┘
```

---

## 📊 Current Deployment Status

| Component | Status | URL |
|-----------|--------|-----|
| **Backend** | ✅ LIVE | https://stack-buddy-backend.onrender.com |
| **Frontend** | ⏳ Ready | Deploy Now! |
| **Database** | ✅ LIVE | MongoDB Atlas |
| **GitHub** | ✅ LIVE | https://github.com/Prince161724/Stack-Buddy.git |

---

## 🎯 Features Implemented

### User Features
- ✅ User Registration & Login
- ✅ JWT-based Authentication
- ✅ Profile Management
- ✅ Avatar Upload (Cloudinary)
- ✅ Skills & Bio

### Networking Features
- ✅ User Feed/Discovery
- ✅ Send Connection Requests
- ✅ Accept/Reject Requests
- ✅ View Connections
- ✅ Remove Connections

### Chat Features
- ✅ Real-time Messaging
- ✅ Online/Offline Status
- ✅ Chat History
- ✅ Emoji Support
- ✅ Multiple Conversations

### Automation
- ✅ Daily Email Reminders (12:10 PM)
- ✅ Pending Request Notifications

---

## 🚀 Deployment Steps (Summary)

### Frontend Deployment
```bash
1. Go to Vercel.com
2. Import GitHub repo
3. Set root directory: frontend
4. Deploy! (2 minutes)
```

### Backend Deployment
```bash
✅ Already Done!
URL: https://stack-buddy-backend.onrender.com
```

### Post-Deployment
```bash
1. Get frontend URL
2. Add to backend CORS
3. Push to GitHub
4. Test application
```

---

## 📈 Scalability Notes

| Tier | Frontend | Backend | Database |
|------|----------|---------|----------|
| **Free** | Vercel Free | Render Free | MongoDB Free (512MB) |
| **Paid** | Vercel Pro ($20/mo) | Render Starter ($7/mo) | MongoDB M10 ($10/mo) |

**Current Setup:**
- Handles up to 100 users easily
- Unlimited frontend requests
- Backend sleeps on free tier (15 min inactivity)

---

## 💡 Next Steps

1. ✅ Backend Deployed
2. ⏳ Deploy Frontend (You're here!)
3. ⏳ Update CORS with frontend URL
4. ⏳ Test end-to-end
5. ⏳ Share with users!

---

For deployment instructions, see:
- Frontend: [frontend/DEPLOYMENT.md](frontend/DEPLOYMENT.md)
- Backend: [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md)
- Quick Start: [QUICKSTART.md](QUICKSTART.md)
