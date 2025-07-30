import { Users, User, MessageCircle, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authProvider';
import { useNavigate } from 'react-router-dom';

const ProfileButtons = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='flex gap-5'>
      <div
        className='flex gap-3 items-center cursor-pointer'
        onClick={() => navigate('/partners')}
      >
        <Users className='text-muted-foreground' />
        <p className='text-muted-foreground'>Find Partners</p>
      </div>
      <div
        className='flex gap-3 items-center cursor-pointer'
        onClick={() => navigate('/profile')}
      >
        <User className='text-muted-foreground' />
        <p className='text-muted-foreground'>My Profile</p>
      </div>
      <div className='flex gap-3 items-center'>
        <MessageCircle className='text-muted-foreground' />
      </div>
      <div className='flex gap-3 items-center justify-center'>
        <Avatar className='cursor-pointer' onClick={() => navigate('/profile')}>
          <AvatarImage src='' />
          <AvatarFallback className='bg-primary text-primary-foreground'>
            {user?.fullName?.[0]?.toUpperCase() ?? 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <Button
          variant='ghost'
          onClick={() => {
            logout();
            navigate('/');
          }}
          className='font-bold text-lg'
        >
          <LogOut size={16} className='mr-2' />
          logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileButtons;
