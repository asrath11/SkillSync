// context/ProfileContext.tsx
import { createContext, useContext, useState } from 'react';
type Skill = {
  skill: string;
  level: number;
};
type ProfileData = {
  image: string;
  name: string;
  country: string;
  city: string;
  bio: string;
  skills: Skill[];
  learningGoals: string;
  learningCategories: string[];
  learningTimeFrame: string;
  successCriteria: string;
  availability: string[];
  workingStyle: string;
  preferredCommunication: string;
  learningStyle: string;
  projectPreference: string;
};

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
