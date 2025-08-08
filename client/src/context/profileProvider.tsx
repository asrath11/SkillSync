// context/ProfileContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ProfileData } from '../types/profile';
import { getUserProfile } from '../api/profile';

type ProfileContextType = {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    userId: '',
    profilePicture: '',
    fullName: '',
    country: '',
    city: '',
    bio: '',
    skills: [],
    learningGoals: '',
    learningCategories: [],
    learningTimeFrame: '',
    successCriteria: '',
    availability: [],
    timeCommitment: '',
    workingStyle: '',
    preferredCommunication: '',
    learningStyle: '',
    projectPreference: '',
  });

  const fetchProfile = async () => {
    try {
      const profile = await getUserProfile();
      setLoading(true);
      setProfile(profile);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within ProfileProvider');
  return context;
};
