import OptionSelector from '@/components/OptionSelector';
const workingStyles = [
  {
    id: 'collaborative',
    title: 'Collaborative',
    description:
      'I prefer working closely with others, sharing ideas and solving problems together',
    icon: 'Users',
  },
  {
    id: 'independent',
    title: 'Independent',
    description:
      'I like to work on my own tasks but coordinate regularly with my partner',
    icon: 'User',
  },
  {
    id: 'mixed',
    title: 'Mixed Approach',
    description: 'I enjoy both collaborative sessions and independent work time',
    icon: 'Shuffle',
  },
];

const communicationStyles = [
  {
    id: 'frequent',
    title: 'Frequent Check-ins',
    description: 'Daily or multiple times per week communication',
    icon: 'MessageCircle',
  },
  {
    id: 'regular',
    title: 'Regular Updates',
    description: 'Weekly scheduled meetings and updates',
    icon: 'Calendar',
  },
  {
    id: 'flexible',
    title: 'Flexible Communication',
    description: 'As-needed basis with no fixed schedule',
    icon: 'Clock',
  },
];

const learningStyles = [
  {
    id: 'visual',
    title: 'Visual Learner',
    description: 'I learn best through diagrams, charts, and visual aids',
    icon: 'Eye',
  },
  {
    id: 'hands-on',
    title: 'Hands-on Learner',
    description: 'I prefer learning by doing and practical exercises',
    icon: 'Wrench',
  },
  {
    id: 'discussion',
    title: 'Discussion-based',
    description: 'I learn through talking, explaining, and group discussions',
    icon: 'MessageSquare',
  },
  {
    id: 'reading',
    title: 'Reading & Research',
    description: 'I prefer learning through documentation and written materials',
    icon: 'BookOpen',
  },
];

const projectPreferences = [
  {
    id: 'real-world',
    title: 'Real-world Projects',
    description: 'Work on actual projects that solve real problems',
    icon: 'Briefcase',
  },
  {
    id: 'learning-exercises',
    title: 'Learning Exercises',
    description: 'Focus on structured tutorials and practice problems',
    icon: 'GraduationCap',
  },
  {
    id: 'open-source',
    title: 'Open Source Contribution',
    description: 'Contribute to existing open source projects',
    icon: 'GitBranch',
  },
  {
    id: 'personal-projects',
    title: 'Personal Projects',
    description: 'Build individual projects while supporting each other',
    icon: 'Lightbulb',
  },
];

interface WorkingStyleSectionProps {
  data: any;
  errors: Record<string, string>;
  onUpdate: (stepData: Record<string, any>) => void;
}

function WorkingStyleSection({
  data,
  errors,
  onUpdate,
}: WorkingStyleSectionProps) {
  return (
    <section className='space-y-4'>
      <h1 className='text-2xl font-semibold text-center'>
        What's your working style?
      </h1>
      <p className='text-center text-muted-foreground'>
        Help us match you with partners who complement your preferred way of
        learning and working
      </p>
      <h1 className='text-md font-semibold'>
        Preferred Working Style <span className='text-red-500'>*</span>
      </h1>
      <OptionSelector
        options={workingStyles}
        selectedOptions={data.workingStyle}
        toggleOption={(label) => onUpdate({ workingStyle: label })}
        type='radio'
        className='flex flex-col gap-4'
        error={errors.workingStyle}
      />
      <h1 className='text-md font-semibold'>Communication Preferences</h1>
      <OptionSelector
        options={communicationStyles}
        selectedOptions={data.preferredCommunication}
        toggleOption={(label) => onUpdate({ preferredCommunication: label })}
        type='radio'
        className='flex flex-col gap-4'
        error={errors.preferredCommunication}
      />
      <h1 className='text-md font-semibold'>Learning Styles</h1>
      <OptionSelector
        options={learningStyles}
        selectedOptions={data.learningStyle}
        toggleOption={(label) => onUpdate({ learningStyle: label })}
        type='radio'
        className='flex flex-col gap-4'
        error={errors.learningStyle}
      />
      <h1 className='text-md font-semibold'>Project Preferences</h1>
      <OptionSelector
        options={projectPreferences}
        selectedOptions={data.projectPreference}
        toggleOption={(label) => onUpdate({ projectPreference: label })}
        type='radio'
        className='flex flex-col gap-4'
        error={errors.projectPreference}
      />
    </section>
  );
}

export default WorkingStyleSection;
