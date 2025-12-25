import { Server } from "socket.io";
import crypto from "crypto";
import Chat from "../models/chat.js";

const getSecretRoomId = (userId, targetId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3200",
        "http://localhost:5173",
        "https://starfish-app-admwy.ondigitalocean.app/",
        "https://stackbuddy.projectwork.tech",
        "https://stack-buddy-backend.onrender.com",
      ],
      credentials: true,
    },
  });

  // Track online users
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    // Handle user coming online
    socket.on("userOnline", ({ userId }) => {
      onlineUsers.set(userId, socket.id);
      // Broadcast to all clients that this user is online
      io.emit("userStatusChanged", { userId, status: "online" });
    });

    socket.on("joinChat", ({ userId, targetId }) => {
      const roomId = getSecretRoomId(userId, targetId);
      socket.join(roomId);

      // Send current online status of target user
      const isTargetOnline = onlineUsers.has(targetId);
      socket.emit("userStatusChanged", {
        userId: targetId,
        status: isTargetOnline ? "online" : "offline",
      });
    });

    socket.on(
      "sendMessage",
      async ({ userId, targetId, firstName, lastName, text, createdAt }) => {
        try {
          const roomId = getSecretRoomId(userId, targetId);
          console.log(`${firstName} says: ${text}`);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetId],
              messages: [],
            });
          }

          const messageCreatedAt = createdAt || new Date().toISOString();

          chat.messages.push({
            senderId: userId,
            text,
            createdAt: messageCreatedAt,
          });
          await chat.save();

          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
            createdAt: messageCreatedAt,
          });
        } catch (err) {
          console.log(err.message);
        }
      }
    );

    socket.on("disconnect", () => {
      // Find and remove the disconnected user
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          // Broadcast to all clients that this user is offline
          io.emit("userStatusChanged", { userId, status: "offline" });
          break;
        }
      }
    });
  });
};

export default initializeSocket;