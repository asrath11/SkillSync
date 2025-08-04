import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProgressBar from './ProgressBar';
import PersonalInfo from './PersonalInfo';
import SkillsSection from './SkillsSection';
import GoalsSection from './GoalsSection';
import WorkingStyleSection from './WorkingStyle';
import Availability from './Availability';
import { useProfile } from '@/context/profileProvider';
import type { ProfileData } from '@/types/profile';

const steps = [
  {
    id: 1,
    step: '1',
    label: 'Personal info',
    desc: 'Basic Details',
    component: PersonalInfo,
  },
  {
    id: 2,
    step: '2',
    label: 'Skills',
    desc: 'Your expertise',
    component: SkillsSection,
  },
  {
    id: 3,
    step: '3',
    label: 'Goals',
    desc: 'Learning objectives',
    component: GoalsSection,
  },
  {
    id: 4,
    step: '4',
    label: 'Availability',
    desc: 'Schedule & time',
    component: Availability,
  },
  {
    id: 5,
    step: '5',
    label: 'Working Style',
    desc: 'Preferences',
    component: WorkingStyleSection,
  },
];

function ProfileDetails() {
  const { profile, setProfile } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const percentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  // Field validation function
  const isFieldValid = (field: string, value: any): boolean => {
    switch (field) {
      case 'name':
        return value && value.trim().length >= 4;
      case 'bio':
        return !value || (value.length >= 10 && value.length <= 300);
      case 'skills':
        return Array.isArray(value) && value.length > 0;
      case 'learningGoals':
        return value && value.trim().length >= 50;
      case 'learningCategories':
        return Array.isArray(value) && value.length > 0;
      case 'learningTimeFrame':
        return value && value.trim().length > 0;
      case 'availability':
        return Array.isArray(value) && value.length > 0;
      case 'workingStyle':
        return value && value.trim().length > 0;
      case 'preferredCommunication':
        return value && value.trim().length > 0;
      case 'learningStyle':
        return value && value.trim().length > 0;
      case 'projectPreference':
        return value && value.trim().length > 0;
      default:
        return true;
    }
  };

  // Handle data updates and clear errors for valid fields
  const handleDataUpdate = (data: ProfileData) => {
    // Update profile data using the context
    setProfile((prev) => ({ ...prev, ...data }));

    // Clear errors for updated fields that are now valid
    const updatedFields = Object.keys(data);
    setErrors((prev) => {
      const newErrors = { ...prev };
      updatedFields.forEach((field) => {
        if (isFieldValid(field, data[field])) {
          delete newErrors[field];
        }
      });

      return newErrors;
    });
  };

  // Step validation function
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Personal Info
        if (!profile.name?.trim()) {
          newErrors.name = 'Full name is required';
        } else if (profile.name.trim().length < 4) {
          newErrors.name = 'Full name must be at least 4 characters';
        }
        if (profile.bio && profile.bio.length < 10) {
          newErrors.bio = 'Bio must be at least 10 characters';
        }
        break;

      case 2: // Skills
        if (!profile.skills || profile.skills.length === 0) {
          newErrors.skills = 'At least one skill is required';
        }
        break;

      case 3: // Goals
        if (!profile.learningGoals?.trim()) {
          newErrors.learningGoals = 'Learning goals are required';
        } else if (profile.learningGoals.trim().length < 50) {
          newErrors.learningGoals =
            'Learning goals must be at least 50 characters';
        }
        if (
          !profile.learningCategories ||
          profile.learningCategories.length === 0
        ) {
          newErrors.learningCategories =
            'At least one learning category is required';
        }
        if (!profile.learningTimeFrame) {
          newErrors.learningTimeFrame = 'Learning timeframe is required';
        }
        break;

      case 4: // Availability
        if (!profile.availability || profile.availability.length === 0) {
          newErrors.availability = 'At least one availability option is required';
        }
        break;

      case 5: // Working Style
        if (!profile.workingStyle) {
          newErrors.workingStyle = 'Working style preference is required';
        }
        if (!profile.preferredCommunication) {
          newErrors.preferredCommunication =
            'Communication preference is required';
        }
        if (!profile.learningStyle) {
          newErrors.learningStyle = 'Learning style is required';
        }
        if (!profile.projectPreference) {
          newErrors.projectPreference = 'Project preference is required';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!validateStep(currentStep)) return;

    console.log('Form submitted', profile);
    // Add your submit logic here
  };

  const current = steps[currentStep - 1];
  const CurrentComponent = current.component;

  return (
    <section className='xl:min-w-5xl p-6 mb-10 bg-card rounded-2xl shadow-lg space-y-5'>
      <ProgressBar percentage={percentage} currentStep={currentStep} />

      <section>
        <CurrentComponent
          data={profile}
          errors={errors}
          onUpdate={handleDataUpdate}
        />
      </section>
      <div className='border border-t-1'></div>
      <div className='flex justify-between'>
        {currentStep > 1 ? (
          <Button onClick={handleBack}>Back</Button>
        ) : (
          <span /> // empty span keeps spacing consistent
        )}
        {currentStep < steps.length ? (
          <div className='flex items-center gap-x-2'>
            <div className='flex items-center gap-x-2'>
              <div className='w-2 h-2 rounded-full bg-success'></div>
              <h1 className='text-sm text-muted-foreground'>Auto-saved</h1>
            </div>
            <Button onClick={handleNext}>Next</Button>
          </div>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </section>
  );
}

export default ProfileDetails;
