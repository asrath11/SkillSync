import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { asyncHandler } from '../utils/asyncHandler.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: '15d',
  });

const setTokenCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // set to true in production
    sameSite: 'lax',
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};

export const signup = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  if ( !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = await User.create({
    email,
    password,
    confirmPassword,
  });

  const token = generateToken(newUser._id);
  setTokenCookie(res, token);

  res.status(201).json({
    message: 'User created successfully',
    user: {
      id: newUser._id,
      email: newUser.email,
    },
    token,
  });
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password or email' });
  }

  const token = generateToken(user._id);
  setTokenCookie(res, token);

  res.status(200).json({
    message: 'User signed in successfully',
    user: {
      id: user._id,
      email: user.email,
    },
    token,
  });
});

export const signout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: false, // set to true in production
    sameSite: 'lax',
    maxAge: 0,
  });

  res.status(200).json({ message: 'User signed out successfully' });
});

export const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
