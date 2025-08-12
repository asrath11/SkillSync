import { Server } from 'socket.io';
import Message from '../models/messageModel.js';
export const socketSetup = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  const userSocketMap = {};

  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    // Join a personal room when frontend sends the userId
    socket.on('join', (userId) => {
      userSocketMap[userId] = socket.id;
      console.log(`User ${userId} joined their private room`);
    });

    // Handle private message
    socket.on('private-message', async (data) => {
      try {
        const receiverSocketId = userSocketMap[data.receiverId];
        const message = await Message.create({
          content: data.content,
          senderId: data.senderId,
          receiverId: data.receiverId,
          timestamp: data.timestamp || new Date(),
        });
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('private-message', data);
        }
      } catch (error) {
        console.error('Failed to save message', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
    });
  });
};
