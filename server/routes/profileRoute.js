import express from 'express';
import { 
  getProfile, 
  updateProfile, 
  getMatchingProfiles,
  getProfileById,
  connectWithUser 
} from '../controllers/profileController.js';
import { verifyToken } from '../middlewares/verify.js';

const router = express.Router();

// Apply verifyToken middleware to all profile routes
router.use(verifyToken);

// Get and update user's own profile
router.get('/', getProfile);
router.post('/', updateProfile);

// Get matching profiles
router.get('/matches', getMatchingProfiles);

// Get specific profile by ID
router.get('/:profileId', getProfileById);

// Connect with another user
router.post('/connect/:profileId', connectWithUser);

export default router;