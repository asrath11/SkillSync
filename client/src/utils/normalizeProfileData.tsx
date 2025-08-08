import type { ProfileData } from '@/types/profile';

export function normalizeProfileData(profile: ProfileData): ProfileData {
  return {
    ...profile,
    workingStyle: profile.workingStyle.toLowerCase(),
    preferredCommunication: profile.preferredCommunication.toLowerCase(),
    learningStyle: profile.learningStyle.toLowerCase(),
    projectPreference: profile.projectPreference.toLowerCase(),
    learningCategories: profile.learningCategories.map((c) => c.toLowerCase()),
    learningTimeFrame: profile.learningTimeFrame.toLowerCase(),
    timeCommitment: profile.timeCommitment.toLowerCase(),
    skills: profile.skills.map((s) => ({
      skill: s.skill.toLowerCase(),
      level: Number(s.level),
    })),
    availability: profile.availability.map((slot) => slot.toLowerCase()),
  };
}
