import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/AppIcon';
import { useProfile } from '@/context/profileProvider';
function ProfileView() {
  const { profile } = useProfile();
  return (
    <div className='w-full bg-white p-8 space-y-2'>
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
    </div>
  );
}

export default ProfileView;
