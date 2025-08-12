import Message from '../models/messageModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
export const getMessages = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  }).sort({ timestamp: 1 });
  console.log(messages);
  res.status(200).json(messages);
});
