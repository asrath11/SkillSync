import UserProfile from '../models/userProfileModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';

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

// Update user's profile
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const profileData = req.body;
  
  // Find and update profile, create if it doesn't exist
  const profile = await UserProfile.findOneAndUpdate(
    { userId },
    profileData,
    { new: true, upsert: true, runValidators: true }
  );
  
  res.status(200).json(profile);
});

// Get profiles for matching
export const getMatchingProfiles = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const filters = req.query;
  
  // Build query based on filters
  const query = { userId: { $ne: userId } };
  
  // Add additional filters based on req.query
  if (filters.skills) {
    query['skills.skill'] = { $in: filters.skills.split(',') };
  }
  
  if (filters.learningCategories) {
    query.learningCategories = { $in: filters.learningCategories.split(',') };
  }
  
  if (filters.availability) {
    query.availability = { $in: filters.availability.split(',') };
  }
  
  // Find matching profiles
  const profiles = await UserProfile.find(query);
  
  res.status(200).json(profiles);
});

// Get a specific profile by ID
export const getProfileById = asyncHandler(async (req, res) => {
  const { profileId } = req.params;
  
  const profile = await UserProfile.findById(profileId);
  
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  
  res.status(200).json(profile);
});

// Connect with another user
export const connectWithUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { profileId } = req.params;
  
  // Here you would implement the connection logic
  // This could involve creating a connection record in a separate collection
  
  res.status(200).json({ message: 'Connection request sent successfully' });
});