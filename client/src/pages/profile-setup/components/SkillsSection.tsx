import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/AppIcon';
import SkillBadge from '@/components/SkillBadge';
import { useProfile } from '@/context/profileProvider';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ValidationErrorDisplay } from '@/components/ui/validation-error';
import type { ValidationError } from '@/types/profile';
const skillsList = [
  'React',
  'Node.js',
  'Python',
  'JavaScript',
  'HTML',
  'CSS',
  'Java',
  'C#',
  'C++',
  'C',
];
const skillButtonList = ['JavaScript', 'Python', 'React'];
type Skill = {
  skill: string;
  level: number;
};

interface SkillsSectionProps {
  validationErrors?: ValidationError[];
}

function SkillsSection({ validationErrors = [] }: SkillsSectionProps) {
  const [search, setSearch] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const { profile, setProfile } = useProfile();

  const filteredSkills = skillsList.filter(
    (skill) =>
      skill.toLowerCase().includes(search.toLowerCase()) &&
      !selectedSkills.some((s) => s.skill === skill)
  );

  const handleAddSkill = (skill: string) => {
    const newSkills = [...selectedSkills, { skill, level: 1 }];
    setSelectedSkills(newSkills);
    setProfile((prev) => ({
      ...prev,
      skills: newSkills,
    }));
    setSearch('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = selectedSkills.filter((s) => s.skill !== skillToRemove);
    setSelectedSkills(newSkills);
    setProfile((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const handleSetLevel = (skillName: string, level: number) => {
    const newSkills = selectedSkills.map((s) =>
      s.skill === skillName ? { ...s, level } : s
    );
    setSelectedSkills(newSkills);
    setProfile((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };
  return (
    <section className='space-y-5'>
      <h1 className='text-center text-2xl font-semibold'>
        What are your skills?
      </h1>
      <p className='text-center text-muted-foreground'>
        Add your skills and rate your proficiency level to help us match you
        better
      </p>
      <div className='space-y-2'>
        <Label htmlFor='skills'>Search and add skills</Label>
        <Input
          id='skills'
          placeholder='Type to search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Skills List */}
        {search && filteredSkills.length > 0 && (
          <div className='max-h-48 overflow-y-auto bg-card rounded-xl shadow-md divide-y'>
            {filteredSkills.map((skill) => (
              <div
                key={skill}
                className='px-3 py-2 hover:bg-card cursor-pointer'
                onClick={() => handleAddSkill(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Added skills by button if selectedSkills empty */}
      {profile.skills.length === 0 && (
        <div className='space-y-3 h-60 p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center'>
          <BookOpen size={40} className='mx-auto text-muted-foreground' />
          <p className='text-center font-semibold text-lg'>No skills added yet</p>
          <p className='text-center text-muted-foreground'>
            Start typing in the search box above to add your skills
          </p>
          <div className='flex gap-2'>
            {skillButtonList.map((skill) => (
              <Button
                key={skill}
                variant='ghost'
                size='lg'
                onClick={() => handleAddSkill(skill)}
              >
                <Icon name='Plus' size={16} />
                <p className='font-semibold'>{skill}</p>
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Selected Skills List */}

      {selectedSkills.length > 0 && (
        <>
          <h1 className='font-semibold'>Your Skills ({selectedSkills.length})</h1>
          <div className='space-y-3 overflow-y-auto max-h-65'>
            {selectedSkills.map((skillObj) => (
              <div
                key={skillObj.skill}
                className='flex flex-col justify-between gap-2 bg-card rounded-2xl shadow-md p-4 w-full'
              >
                <div className='flex items-center justify-between'>
                  <h2 className='font-semibold'>{skillObj.skill}</h2>
                  <Icon
                    name='X'
                    size={16}
                    className='cursor-pointer'
                    onClick={() => handleRemoveSkill(skillObj.skill)}
                  />
                </div>
                <div className='flex items-center justify-between gap-2'>
                  <p className='text-muted-foreground text-md'>
                    Proficiency Level
                  </p>
                  <SkillBadge level={skillObj.level} />
                </div>
                <div className='flex items-center gap-2'>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`w-9 h-9 flex items-center justify-center rounded-full
                    cursor-pointer transition-colors
                    ${skillObj.level >= level
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                        }`}
                      onClick={() => handleSetLevel(skillObj.skill, level)}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <ValidationErrorDisplay errors={validationErrors} field='skills' />
    </section>
  );
}

export default SkillsSection;
