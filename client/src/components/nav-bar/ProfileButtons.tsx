import { Users, User, MessageCircle, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authProvider';
import { useNavigate } from 'react-router-dom';

type ProfileButtonsProps = {
  type?: 'mobile' | 'desktop';
};

const ProfileButtons = ({ type = 'desktop' }: ProfileButtonsProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`flex gap-5 ${type === 'mobile' ? 'flex-col' : 'flex-row'}`}>
      <button
        onClick={() => navigate('/partners')}
        className='flex gap-3 items-center text-muted-foreground'
      >
        <Users />
        <span>Find Partners</span>
      </button>

      <button
        onClick={() => navigate('/profile')}
        className='flex gap-3 items-center text-muted-foreground'
      >
        <User />
        <span>My Profile</span>
      </button>

      <div className='flex gap-3 items-center text-muted-foreground'>
        <MessageCircle />
        {type === 'mobile' && <span>Messages</span>}
      </div>

      <div className='flex gap-3 items-center text-muted-foreground'>
        <Avatar className='cursor-pointer' onClick={() => navigate('/profile')}>
          <AvatarImage alt={user?.fullName} />
          <AvatarFallback className='bg-primary text-primary-foreground'>
            {user?.fullName?.[0]?.toUpperCase() ?? 'U'}
          </AvatarFallback>
        </Avatar>
        {type === 'mobile' && <span>Profile</span>}
      </div>

      <Button
        variant='ghost'
        onClick={handleLogout}
        className='font-bold text-lg'
      >
        <LogOut size={16} className='mr-2' />
        Logout
      </Button>
    </div>
  );
};

export default ProfileButtons;
