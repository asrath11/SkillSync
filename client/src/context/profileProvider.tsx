// context/ProfileContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ProfileData } from '../types/profile';

type ProfileContextType = {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>({
    image: '',
    name: '',
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
