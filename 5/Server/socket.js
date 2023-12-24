import socket from "socket.io";
import { messageRepository } from "./model/message.model.js";

class SocketServer {
  init(httpServer) {
    const io = socket(httpServer);

    const connectedUsers = {};

    io.on("connection", (socket) => {
      const socketId = socket.id;
      socket.on("users:connect", (data) => {
        const user = { ...data, socketId, activeRoom: null };
        connectedUsers[socketId] = user;
        socket.emit("users:list", Object.values(connectedUsers));
        socket.broadcast.emit("users:add", user);
      });
      socket.on("message:add", async (data) => {
        const { roomId } = data;
        // Сохранить в бд
        const message = await messageRepository.create(data);
        socket.emit("message:add", message);
        socket.broadcast.to(roomId).emit("message:add", message);
      });
      socket.on("message:history", async (data) => {
        const messages = await messageRepository.getMessagesByUser(data);
        socket.emit("message:history", messages);
      });
      socket.on("disconnect", () => {
        delete connectedUsers[socketId];
        socket.broadcast.emit("users:leave", socketId);
      });
    });
  }
}

export const socketServer = new SocketServer();
