import type { ProfileData, ValidationError, ValidationResult } from '../types/profile';

// Step 1: Personal Info Validation
export const validatePersonalInfo = (profile: ProfileData): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!profile.name.trim()) {
    errors.push({ field: 'name', message: 'Full name is required' });
  } else if (profile.name.trim().length < 4) {
    errors.push({ field: 'name', message: 'Full name must be at least 4 characters' });
  }

  if (profile.bio && profile.bio.length > 300) {
    errors.push({ field: 'bio', message: 'Bio must be 300 characters or less' });
  } else if (profile.bio && profile.bio.length < 10 && profile.bio.length > 0) {
    errors.push({ field: 'bio', message: 'Bio must be at least 10 characters' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Step 2: Skills Validation
export const validateSkills = (profile: ProfileData): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!profile.skills || profile.skills.length === 0) {
    errors.push({ field: 'skills', message: 'At least one skill is required' });
  } else if (profile.skills.length > 10) {
    errors.push({ field: 'skills', message: 'Maximum 10 skills allowed' });
  }

  // Validate each skill has a valid level
  profile.skills?.forEach((skill, index) => {
    if (!skill.skill.trim()) {
      errors.push({ field: `skill-${index}`, message: 'Skill name cannot be empty' });
    }
    if (skill.level < 1 || skill.level > 5) {
      errors.push({ field: `skill-level-${index}`, message: 'Skill level must be between 1 and 5' });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Step 3: Goals Validation
export const validateGoals = (profile: ProfileData): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!profile.learningGoals.trim()) {
    errors.push({ field: 'learningGoals', message: 'Learning goals are required' });
  } else if (profile.learningGoals.trim().length < 50) {
    errors.push({ field: 'learningGoals', message: 'Learning goals must be at least 50 characters' });
  }

  if (!profile.learningCategories || profile.learningCategories.length === 0) {
    errors.push({ field: 'learningCategories', message: 'At least one learning category is required' });
  }

  if (!profile.learningTimeFrame) {
    errors.push({ field: 'learningTimeFrame', message: 'Learning timeframe is required' });
  }
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Step 4: Availability Validation
export const validateAvailability = (profile: ProfileData): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!profile.availability || profile.availability.length === 0) {
    errors.push({ field: 'availability', message: 'At least one availability option is required' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Step 5: Working Style Validation
export const validateWorkingStyle = (profile: ProfileData): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!profile.workingStyle) {
    errors.push({ field: 'workingStyle', message: 'Working style preference is required' });
  }

  if (!profile.preferredCommunication) {
    errors.push({ field: 'preferredCommunication', message: 'Communication preference is required' });
  }

  if (!profile.learningStyle) {
    errors.push({ field: 'learningStyle', message: 'Learning style is required' });
  }

  if (!profile.projectPreference) {
    errors.push({ field: 'projectPreference', message: 'Project preference is required' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Overall form validation
export const validateStep = (step: number, profile: ProfileData): ValidationResult => {
  switch (step) {
    case 1:
      return validatePersonalInfo(profile);
    case 2:
      return validateSkills(profile);
    case 3:
      return validateGoals(profile);
    case 4:
      return validateAvailability(profile);
    case 5:
      return validateWorkingStyle(profile);
    default:
      return { isValid: false, errors: [{ field: 'unknown', message: 'Invalid step' }] };
  }
};

// Validate entire form
export const validateEntireForm = (profile: ProfileData): ValidationResult => {
  const allErrors: ValidationError[] = [];

  const step1Validation = validatePersonalInfo(profile);
  const step2Validation = validateSkills(profile);
  const step3Validation = validateGoals(profile);
  const step4Validation = validateAvailability(profile);
  const step5Validation = validateWorkingStyle(profile);

  allErrors.push(...step1Validation.errors);
  allErrors.push(...step2Validation.errors);
  allErrors.push(...step3Validation.errors);
  allErrors.push(...step4Validation.errors);
  allErrors.push(...step5Validation.errors);

  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
}; 