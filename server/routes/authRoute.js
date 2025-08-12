import express from 'express';
import { signup, signin, signout, getAllUsers } from '../controllers/authController.js';

import { verifyToken } from '../middlewares/verify.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/users', verifyToken, getAllUsers);
router.get('/profile', verifyToken, (req, res) => {
  return res.json({
    id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
  });
});

export default router;
