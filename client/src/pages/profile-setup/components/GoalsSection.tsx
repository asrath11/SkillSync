import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import OptionSelector from '@/components/OptionSelector';
import type { ProfileData } from '@/types/profile';

const categories = [
  {
    id: 'career-change',
    title: 'Career Change',
    description: 'Transitioning to a new field or role',
    icon: 'TrendingUp',
  },
  {
    id: 'skill-development',
    title: 'Skill Development',
    description: 'Learning new technical or soft skills',
    icon: 'BookOpen',
  },
  {
    id: 'project-collaboration',
    title: 'Project Collaboration',
    description: 'Working on real-world projects together',
    icon: 'Users',
  },
  {
    id: 'certification-prep',
    title: 'Certification Prep',
    description: 'Preparing for professional certifications',
    icon: 'Award',
  },
  {
    id: 'personal-project',
    title: 'Personal Project',
    description: 'Help with coursework or studies',
    icon: 'GraduationCap',
  },
  {
    id: 'academic-support',
    title: 'Mentorship',
    description: 'Seeking guidance from experienced professionals',
    icon: 'UserCheck',
  },
];

const learningTimeFrame = [
  {
    id: '1-3 months',
    title: '1-3 months',
  },
  {
    id: '3-6 months',
    title: '3-6 months',
  },
  {
    id: '6-12 months',
    title: '6-12 months',
  },
  {
    id: '1+ years',
    title: '1+ years',
  },
  {
    id: 'on-going-learning',
    title: 'On going Learning',
  },
];

interface GoalsSectionProps {
  data: ProfileData;
  errors: Record<string, string>;
  onUpdate: (stepData: ProfileData) => void;
}

function GoalsSection({ data, errors, onUpdate }: GoalsSectionProps) {
  const toggleCategory = (category: string) => {
    const newCategories = data.learningCategories?.includes(category)
      ? data.learningCategories.filter((item: string) => item !== category)
      : [...(data.learningCategories || []), category];
    onUpdate({ ...data, learningCategories: newCategories });
  };

  const handleTimeFrameChange = (timeFrame: string) => {
    onUpdate({ ...data, learningTimeFrame: timeFrame });
  };

  return (
    <section className='space-y-6'>
      <div className='text-center space-y-2'>
        <h2 className='text-2xl font-bold'>What are your learning goals?</h2>
        <p className='text-muted-foreground'>
          Help us understand what you want to achieve so we can find the right
          partner
        </p>
      </div>

      <div className='flex flex-col space-y-4'>
        <Label htmlFor='short-term-goals' className='font-semibold'>
          Describe your learning goals <span className='text-red-500'>*</span>
        </Label>
        <Textarea
          id='short-term-goals'
          value={data.learningGoals || ''}
          maxLength={300}
          onChange={(e) => onUpdate({ ...data, learningGoals: e.target.value })}
          className='min-h-[120px]'
        />
        <p className='text-right text-sm text-muted-foreground'>
          {(data.learningGoals || '').length}/300
        </p>
      </div>

      <div className='space-y-2'>
        <h1 className='font-semibold'>
          Select your learning categories <span className='text-red-500'>*</span>
        </h1>
        <p className='text-muted-foreground text-sm'>
          Choose all that apply to help us match you with like-minded learners
        </p>
      </div>

      <OptionSelector
        options={categories}
        selectedOptions={data.learningCategories || []}
        toggleOption={toggleCategory}
        className='grid lg:grid-cols-2 gap-4'
        type='checkbox'
      />
      <div className='space-y-2'>
        <h1 className='font-semibold'>
          Select your learning time frame <span className='text-red-500'>*</span>
        </h1>
        <p className='text-muted-foreground text-sm'>
          Choose the time frame you want to learn
        </p>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6'>
        {learningTimeFrame.map((timeFrame) => (
          <label
            key={timeFrame.id}
            htmlFor={timeFrame.id}
            className={`flex items-center justify-between gap-2 cursor-pointer transition-all h-12 p-4 rounded-md border ${
              data.learningTimeFrame === timeFrame.id
                ? 'border-primary bg-primary/10'
                : 'border-gray-100 dark:border-black/25'
            }`}
          >
            <span className='text-md font-semibold'>{timeFrame.title}</span>
            <div className='relative'>
              <input
                type='radio'
                id={timeFrame.id}
                name='time-frame'
                value={timeFrame.id}
                checked={data.learningTimeFrame === timeFrame.id}
                onChange={() => handleTimeFrameChange(timeFrame.id)}
                className='peer hidden'
              />
              <div className='w-5 h-5 rounded-full border border-primary peer-checked:bg-primary transition-all' />
            </div>
          </label>
        ))}
      </div>
      <div className='flex flex-col space-y-4'>
        <Label htmlFor='short-term-goals' className='font-semibold'>
          How will you measure success? (Optional)
        </Label>
        <Textarea
          id='short-term-goals'
          value={data.successCriteria || ''}
          maxLength={300}
          onChange={(e) => onUpdate({ ...data, successCriteria: e.target.value })}
          className='min-h-[120px]'
        />
        <p className='text-right text-sm text-muted-foreground'>
          {(data.successCriteria || '').length}/300
        </p>
      </div>
      {Object.keys(errors).length > 0 && (
        <div className='space-y-1'>
          {Object.entries(errors).map(([field, message]) => (
            <p key={field} className='text-sm text-destructive'>
              {message}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

export default GoalsSection;
