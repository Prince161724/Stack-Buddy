# Stack Buddy

A full-stack social networking platform for developers to connect, chat, and collaborate.

## Features

- User authentication and profiles
- Real-time chat functionality
- Connection requests
- Feed/Posts
- User matching based on tech stack

## Tech Stack

### Frontend
- React + Vite
- Redux Toolkit
- Tailwind CSS
- Socket.io Client

### Backend
- Node.js + Express
- MongoDB
- Socket.io
- JWT Authentication

## Deployment

### Frontend
Deployed on Netlify

### Backend
Deployed on Render/Railway

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Frontend (.env)
```
VITE_API_URL=your_backend_url
```

## Local Development

### Backend
```bash
cd StackBuddy-backend-master/StackBuddy-backend-master
npm install
npm start
```

### Frontend
```bash
cd StackBuddy-frontend-master/StackBuddy-frontend-master
npm install
npm run dev
```

## License

MIT
