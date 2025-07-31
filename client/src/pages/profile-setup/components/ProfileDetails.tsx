import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProgressBar from './ProgressBar';
import PersonalInfo from './PersonalInfo';

const steps = [
  {
    id: 1,
    step: '1',
    label: 'Personal info',
    desc: 'Basic Details',
    component: <PersonalInfo />,
  },
  { id: 2, step: '2', label: 'Skills', desc: 'Your expertise' },
  { id: 3, step: '3', label: 'Goals', desc: 'Learning objectives' },
  { id: 4, step: '4', label: 'Availability', desc: 'Schedule & time' },
  { id: 5, step: '5', label: 'Working Style', desc: 'Preferences' },
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

  return (
    <section className='w-5xl p-6 bg-white rounded-2xl shadow-lg space-y-5'>
      <ProgressBar percentage={percentage} currentStep={currentStep} />

      <section>{current.component}</section>

      <div className='flex justify-between'>
        {currentStep > 1 ? (
          <Button onClick={handleBack}>Back</Button>
        ) : (
          <span /> // empty span keeps spacing consistent
        )}

        {currentStep < steps.length ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </section>
  );
}

export default ProfileDetails;
