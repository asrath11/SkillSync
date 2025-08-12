import UserProfile from '../models/userProfileModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

// Get user's own profile
export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  let profile = await UserProfile.findOne({ userId });

  if (!profile) {
    // Create an empty profile if it doesn't exist
    profile = await UserProfile.create({ userId });
  }

  res.status(200).json(profile);
});

export const getAllProfiles = asyncHandler(async (req, res) => {
  const profiles = await UserProfile.find({
    userId: { $ne: req.user._id },
  });
  res.status(200).json({
    message: 'Profiles fetched successfully',
    results: profiles.length,
    profiles,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.body.userId || req.user._id;
  const profileData = req.body;

  const profile = await UserProfile.findOneAndUpdate(
    {
      userId,
    },
    profileData,
    {
      runValidators: true,
      upsert: true,
      new: true,
    }
  );

  res.status(200).json(profile);
});

// Get a specific profile by ID
export const getProfileByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const profile = await UserProfile.findOne({
    userId: new mongoose.Types.ObjectId(userId),
  });

  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  res.status(200).json(profile);
});
