import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/AppIcon';
import { useProfile } from '@/context/profileProvider';
import SkillBadge from '@/components/SkillBadge';
import { BookOpen } from 'lucide-react';
function ProfileView() {
  const { profile } = useProfile();
  console.log(profile);
  return (
    <div className='w-full bg-card rounded-2xl p-8 space-y-3'>
      <h1 className='text-xl font-semibold text-center'>Profile Preview</h1>
      <p className='text-center text-muted-foreground'>
        This is how your profile will appear to potential partners
      </p>
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
      <div>
        {profile.skills.length > 0 && (
          <div className='space-y-3 overflow-y-auto max-h-65'>
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
    </div>
  );
}

export default ProfileView;
