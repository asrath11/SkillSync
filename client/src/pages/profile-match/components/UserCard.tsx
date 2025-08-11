import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { type ProfileData } from '@/types/profile';
import {
  MessageCircle,
  UserPlus,
  MapPin,
  Goal,
  Clock,
  Calendar,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  profile: ProfileData;
  onConnect?: () => void;
  onMessage?: () => void;
}

export function UserCard({ profile, onConnect, onMessage }: UserCardProps) {
  // Function to render skill level stars
  const navigate = useNavigate();

  return (
    <div className='bg-card rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 space-y-4 p-6'>
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <Avatar className='size-16 border-2 border-primary/10'>
              <AvatarImage src={profile.profilePicture} alt={profile.fullName} />
              <AvatarFallback className='text-lg font-medium'>
                {profile.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>

            {/* Online Indicator */}
            {profile.availability.includes('Online') && (
              <div className='absolute bottom-0 right-0 w-4 h-4 rounded-full bg-success'></div>
            )}
          </div>
          <div>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              {profile.fullName}
            </h3>
            <div className='flex items-center gap-4 text-gray-500 dark:text-gray-400 mt-1'>
              <div className='flex items-center'>
                <MapPin className='size-4 mr-1' />
                <span className='text-sm'>
                  {profile.city}, {profile.country}
                </span>
              </div>

              {/* Online Status */}
              {profile.availability.includes('Online') && (
                <div className='flex items-center'>
                  <div className='w-4 h-4 rounded-full border-success border-2'></div>
                  <p className='text-lg text-success'>Online Now</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <Badge variant={'success'} className='text-md'>
            98% Match
          </Badge>
        </div>
      </div>

      {profile.bio && (
        <p className='text-gray-600 dark:text-gray-300 text-lg mb-4 line-clamp-2'>
          {profile.bio}
        </p>
      )}

      <div className='mb-4'>
        <div className='flex flex-wrap gap-2'>
          {profile.skills.slice(0, 4).map((skill, index) => (
            <div
              key={index}
              className='bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-md px-2 py-1 rounded-full flex items-center gap-2'
            >
              <span className='font-medium'>{skill.skill}</span>

              <span className='size-7 rounded-full text-primary flex items-center justify-center font-medium'>
                ({skill.level}/5)
              </span>
            </div>
          ))}
          {profile.skills.length > 4 && (
            <div className='bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-md px-2 py-1 rounded-full'>
              +{profile.skills.length - 4} more
            </div>
          )}
        </div>
      </div>

      <div>
        <p className='text-md font-semibold mb-2 flex items-center'>
          <Goal className='size-5 inline-block mr-1 text-foreground' />
          Learning Goals
        </p>
        <div className='flex flex-wrap gap-2'>
          {profile.learningCategories.slice(0, 3).map((category, index) => (
            <div
              key={index}
              className='text-primary text-sm px-2 py-1 rounded-full flex items-center gap-2'
            >
              <span>{category}</span>
            </div>
          ))}
          {profile.learningCategories.length > 3 && (
            <div className='bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs px-2 py-1 rounded-full'>
              +{profile.learningCategories.length - 3} more
            </div>
          )}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <Calendar className='size-5 inline-block mr-1 text-foreground' />
          <span className='text-md font-semibold text-foreground'>
            {profile.availability.join(', ')}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <Clock className='size-5 inline-block mr-1 text-foreground' />
          <span className='text-md text-foreground'>
            {profile.timeCommitment}
          </span>
        </div>
      </div>
      <div className='flex justify-between w-full gap-2'>
        <Button
          variant={'outline'}
          size='lg'
          className='flex-1'
          onClick={onConnect}
        >
          <UserPlus className='size-4 mr-2' />
          View profile
        </Button>

        <Button
          size='lg'
          className='flex-1'
          onClick={() => {
            navigate('/chat', { state: { userId: profile.userId } });
          }}
        >
          <MessageCircle className='size-4 mr-2' />
          Connect
        </Button>
      </div>
    </div>
  );
}
