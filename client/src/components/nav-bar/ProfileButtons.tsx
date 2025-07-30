import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authProvider';
import { useNavigate } from 'react-router-dom';
import AppIcon from '@/components/AppIcon';

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

  const menuItems = [
    {
      icon: 'Users',
      label: 'Find Partners',
      onClick: () => navigate('/partners'),
    },
    {
      icon: 'User',
      label: 'My Profile',
      onClick: () => navigate('/profile'),
    },
    {
      icon: 'MessageCircle',
      label: 'Messages',
      onClick: () => {}, // No navigation defined for now
      hideLabelOnDesktop: true,
    },
    {
      icon: null,
      label: 'Profile',
      onClick: () => navigate('/profile'),
      isAvatar: true,
    },
  ];

  return (
    <div className={`flex gap-5 ${type === 'mobile' ? 'flex-col' : 'flex-row'}`}>
      {menuItems.map((item, index) =>
        item.isAvatar ? (
          <div
            key={index}
            className='flex gap-3 items-center text-muted-foreground cursor-pointer hover:text-primary'
            onClick={item.onClick}
          >
            <Avatar className='cursor-pointer'>
              <AvatarImage alt={user?.fullName} />
              <AvatarFallback className='bg-primary text-primary-foreground'>
                {user?.fullName?.[0]?.toUpperCase() ?? 'U'}
              </AvatarFallback>
            </Avatar>
            {type === 'mobile' && <span>{item.label}</span>}
          </div>
        ) : (
          <button
            key={index}
            onClick={item.onClick}
            className='flex gap-3 items-center text-muted-foreground cursor-pointer hover:text-primary'
          >
            <AppIcon name={item.icon} />
            {!(item.hideLabelOnDesktop && type === 'desktop') && (
              <span>{item.label}</span>
            )}
          </button>
        )
      )}

      <Button
        variant='ghost'
        onClick={handleLogout}
        className='font-bold text-lg cursor-pointer'
      >
        <LogOut size={16} className='mr-2' />
        Logout
      </Button>
    </div>
  );
};

export default ProfileButtons;
