import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/AppIcon';
function ProfileView() {
  return (
    <div className='w-md bg-white p-8 space-y-2'>
      <h1 className='text-xl font-semibold text-center'>Profile Preview</h1>
      <p className='text-center text-muted-foreground'>
        This is how your profile will appear to potential partners
      </p>
      <div className='flex items-center gap-4 py-4'>
        <Avatar className='w-16 h-16'>
          <AvatarImage src='' />
          <AvatarFallback className='bg-gradient-to-br from-primary to-secondary text-primary-foreground'>
            <Icon name='User' size={24} />
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1'>
          <h1 className='font-semibold'>Your Name</h1>
          <p className='text-muted-foreground'>Location not specified</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
