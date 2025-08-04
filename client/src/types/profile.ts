export type Skill = {
  skill: string;
  level: number;
};

export type ProfileData = {
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

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
} 