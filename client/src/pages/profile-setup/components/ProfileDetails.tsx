import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProgressBar from './ProgressBar';
import PersonalInfo from './PersonalInfo';
import SkillsSection from './SkillsSection';
import GoalsSection from './GoalsSection';
import WorkingStyleSection from './WorkingStyle';
import Availability from './Availability';
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

  const percentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted');
    // Add your submit logic here
  };

  const current = steps[currentStep - 1];
  const CurrentComponent = current.component;

  return (
    <section className='xl:min-w-5xl p-6 mb-10 bg-card rounded-2xl shadow-lg space-y-5'>
      <ProgressBar percentage={percentage} currentStep={currentStep} />

      <section>
        <CurrentComponent />
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
