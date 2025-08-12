import express from 'express';
import { getMessages } from '../controllers/messageController.js';
import { verifyToken } from '../middlewares/verify.js';

const router = express.Router();

// Apply verifyToken middleware to all message routes
router.use(verifyToken);

// Get messages for a specific user
router.get('/:senderId/:receiverId', getMessages);

export default router;
