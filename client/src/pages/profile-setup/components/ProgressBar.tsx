import Icon from '@/components/AppIcon';
const steps = [
  { id: 1, step: '1', label: 'Personal info', desc: 'Basic Details' },
  { id: 2, step: '2', label: 'Skills', desc: 'Your expertise' },
  { id: 3, step: '3', label: 'Goals', desc: 'Learning objectives' },
  { id: 4, step: '4', label: 'Availability', desc: 'Schedule & time' },
  { id: 5, step: '5', label: 'Working Style', desc: 'Preferences' },
];
function ProgressBar({
  percentage,
  currentStep,
}: {
  percentage: number;
  currentStep: number;
}) {
  return (
    <>
      <div className='min-w-full h-2 bg-gray-200 dark:bg-black/25 rounded-2xl flex items-center relative'>
        <div
          className={`h-4 w-4 border-2  border-primary rounded-full flex items-center justify-center absolute`}
          style={{ left: `${99}%` }}
        >
          <div className='h-2 w-2 bg-primary rounded-full'></div>
        </div>
        <div
          className={`h-2 bg-gradient-to-r from-primary to-secondary rounded-2xl`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className='flex gap-2 justify-around pt-4 text-center text-muted-foreground'>
        {steps.map((step) => (
          <div
            key={step.id}
            className='flex flex-col items-center justify-center gap-2'
          >
            <p
              className={`text-lg w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${
                currentStep === step.id ? 'bg-primary text-white' : ''
              } ${currentStep > step.id ? 'bg-success dark:bg-success' : ''}`}
            >
              {currentStep > step.id ? (
                <Icon name='Check' size={16} className='text-white' />
              ) : (
                step.step
              )}
            </p>
            <div className='flex flex-col items-center justify-center gap-1'>
              <p
                className={`text-sm text-muted-foreground ${
                  currentStep === step.id ? 'text-primary' : ''
                } ${currentStep > step.id ? 'text-success font-semibold' : ''}`}
              >
                {step.label}
              </p>
              <p className='text-xs text-muted-foreground'>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='border mt-10'></div>
    </>
  );
}

export default ProgressBar;
