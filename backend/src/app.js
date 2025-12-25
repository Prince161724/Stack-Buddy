import express from "express";
import http from "http";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.routes.js";
import { profileRouter } from "./routes/profile.routes.js";
import { requestsRouter } from "./routes/requests.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { chatRouter } from "./routes/chat.routes.js";
import { startCronJob } from "./utils/cronjob.js";
import initializeSocket from "./utils/socket.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:3200",
      "http://localhost:5173",
      "https://king-prawn-app-colmw.ondigitalocean.app",
      "https://stackbuddy.projectwork.tech",
      "https://stack-buddy-backend.onrender.com",
      "https://stack-buddy-frontend-08iy.onrender.com"
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();
startCronJob();

//routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
