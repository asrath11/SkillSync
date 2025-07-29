import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export async function signup(req, res) {
  const { fullName, email, password, confirmPassword } = req.body;
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = await User.create({
    fullName,
    email,
    password,
    confirmPassword,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: '15d',
  });
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  return res
    .status(201)
    .json({ message: 'User created successfully', newUser, token });
}

export async function signin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: '15d',
  });
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  return res
    .status(200)
    .json({ message: 'User signed in successfully', user, token });
}
