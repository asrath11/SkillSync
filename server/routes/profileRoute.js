import express from 'express';
import {
  getProfile,
  updateProfile,
  getAllProfiles,
  getProfileByUserId,
} from '../controllers/profileController.js';
import { verifyToken } from '../middlewares/verify.js';

const router = express.Router();

// Apply verifyToken middleware to all profile routes
router.use(verifyToken);

// Get and update user's own profile
router.route('/').get(getProfile).post(updateProfile);

// Get all profiles
router.get('/all', getAllProfiles);

// Get specific profile by ID
router.get('/:userId', getProfileByUserId);

export default router;
