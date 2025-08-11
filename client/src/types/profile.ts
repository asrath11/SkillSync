export type Skill = {
  skill: string;
  level: number;
};

export type ProfileData = {
  userId?: string;
  profilePicture: string;
  fullName: string;
  country: string;
  city: string;
  bio: string;
  skills: Skill[];
  learningGoals: string;
  learningCategories: string[];
  learningTimeFrame: string;
  successCriteria: string;
  availability: string[];
  timeCommitment: string;
  workingStyle: string;
  preferredCommunication: string;
  learningStyle: string;
  projectPreference: string;
};
