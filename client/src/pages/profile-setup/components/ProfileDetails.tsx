import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProgressBar from './ProgressBar';
import PersonalInfo from './PersonalInfo';
import SkillsSection from './SkillsSection';
import GoalsSection from './GoalsSection';
import WorkingStyleSection from './WorkingStyle';
import Availability from './Availability';
import { useProfile } from '@/context/profileProvider';
import { validateStep } from '@/lib/validation';
import type { ValidationError } from '@/types/profile';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const { profile } = useProfile();

  const percentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    // Validate current step before proceeding
    const validation = validateStep(currentStep, profile);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    // Clear validation errors if validation passes
    setValidationErrors([]);

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    // Clear validation errors when going back
    setValidationErrors([]);

    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Validate the final step before submitting
    const validation = validateStep(currentStep, profile);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    console.log('Form submitted', profile);
    // Add your submit logic here
  };

  const current = steps[currentStep - 1];
  const CurrentComponent = current.component;

  return (
    <section className='xl:min-w-5xl p-6 mb-10 bg-card rounded-2xl shadow-lg space-y-5'>
      <ProgressBar percentage={percentage} currentStep={currentStep} />

      <section>
        <CurrentComponent validationErrors={validationErrors} />
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
