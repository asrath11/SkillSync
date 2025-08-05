import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/AppIcon';
import { useProfile } from '@/context/profileProvider';
import SkillBadge from '@/components/SkillBadge';
import { BookOpen, Target, Tag, Clock } from 'lucide-react';
function ProfileView() {
  const { profile } = useProfile();
  const formatAvailability = (availability: string[]) => {
    if (!availability || availability.length === 0) return 'Not specified';

    const dayMap = {
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun',
    };

    const slotMap = {
      'early-morning': 'Early AM',
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
      night: 'Night',
    };

    const grouped: Record<string, string[]> = {};
    availability.forEach((slot: string) => {
      const [day, time] = slot.split(' ');
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(slotMap[time] || time);
    });

    return Object.entries(grouped)
      .map(([day, times]) => `${dayMap[day]}: ${times.join(', ')}`)
      .join(' • ');
  };
  console.log(formatAvailability(profile.availability));
  return (
    <div className='w-full xl:max-w-lg bg-card rounded-2xl p-8 space-y-3'>
      <h1 className='text-xl font-semibold text-center'>Profile Preview</h1>
      <p className='text-center text-muted-foreground'>
        This is how your profile will appear to potential partners
      </p>
      {/* Personal Info */}
      <div className='flex items-center gap-4 py-4'>
        <Avatar className='w-16 h-16'>
          <AvatarImage src={profile.image} />
          <AvatarFallback className='bg-gradient-to-br from-primary to-secondary text-primary-foreground'>
            <Icon name='User' size={24} />
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1'>
          {profile.name ? (
            <h1 className='font-semibold'>{profile.name}</h1>
          ) : (
            <h1 className='font-semibold'>Your Name</h1>
          )}
          {profile.city && profile.country ? (
            <p className='text-muted-foreground'>
              {profile.city}, {profile.country}
            </p>
          ) : (
            <p className='text-muted-foreground'>Location not specified</p>
          )}
          {profile.bio && <p className='text-muted-foreground'>{profile.bio}</p>}
        </div>
      </div>
      {/* Skills */}
      <div>
        {profile.skills.length > 0 && (
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <BookOpen size={24} className='text-muted-foreground' />
              <h1 className='font-semibold'>Skills ({profile.skills.length})</h1>
            </div>
            {profile.skills.map((skillObj) => (
              <div
                key={skillObj.skill}
                className='flex flex-col justify-between gap-2 bg-card p-3'
              >
                <div className='flex items-center justify-between'>
                  <h2 className='font-semibold'>{skillObj.skill}</h2>
                  <SkillBadge level={skillObj.level} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='space-y-3 xl:max-w-lg'>
        {/* Goals */}
        {profile.learningGoals && (
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Target size={24} className='text-muted-foreground' />
              <h1 className='font-semibold'>Learning Goals</h1>
            </div>
            <p className='text-muted-foreground text-wrap overflow-hidden'>
              {profile.learningGoals}
            </p>
          </div>
        )}
        {/* Categories */}
        {profile.learningCategories.length > 0 && (
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Tag size={24} className='text-muted-foreground' />
              <h1 className='font-semibold'>Focus Areas</h1>
            </div>
            <p className='text-primary'>
              {profile.learningCategories.join(' | ')}
            </p>
          </div>
        )}

        {profile.availability.length > 0 && (
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Clock size={24} className='text-muted-foreground' />
              <h1 className='font-semibold'>Availability</h1>
            </div>
            <p className='text-primary text-wrap'>
              {formatAvailability(profile.availability)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileView;
