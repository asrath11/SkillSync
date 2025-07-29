import express from 'express';
import { signup, signin } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verify.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', verifyToken, (req, res) => {
  return res.json(req.user);
});

export default router;
