import axios from 'axios';
import { type ProfileData } from '@/types/profile';

const API_URL = import.meta.env.VITE_API_URL;

// Get user profile
export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`, {
    withCredentials: true,
  });
  return response.data;
};
export const getUserProfileByUserId = async (userId: string) => {
  const response = await axios.get(`${API_URL}/profile/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};
export const getAllUserProfiles = async () => {
  const response = await axios.get(`${API_URL}/profile/all`, {
    withCredentials: true,
  });
  return response.data.profiles;
};

// Update user profile
export const updateUserProfile = async (profileData: ProfileData) => {
  const response = await axios.post(`${API_URL}/profile`, profileData, {
    withCredentials: true,
  });
  return response.data;
};

// Get profiles for matching
export const getMatchingProfiles = async (filters?: Record<string, any>) => {
  const response = await axios.get(`${API_URL}/profile/matches`, {
    params: filters,
    withCredentials: true,
  });
  return response.data;
};

// Get a specific profile by ID
export const getProfileById = async (profileId: string) => {
  const response = await axios.get(`${API_URL}/profile/${profileId}`, {
    withCredentials: true,
  });
  return response.data;
};

// Connect with another user
export const connectWithUser = async (profileId: string) => {
  const response = await axios.post(
    `${API_URL}/profile/connect/${profileId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
