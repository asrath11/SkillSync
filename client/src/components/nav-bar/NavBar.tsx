import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authProvider';
import ProfileButtons from './ProfileButtons';
import { MenuIcon, X } from 'lucide-react';
import { useState } from 'react';

function NavBar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const MenuIconComponent = isMenuOpen ? X : MenuIcon;

  const handleLogin = () => navigate('/sign-in');
  const handleSignUp = () => navigate('/sign-up');

  const AuthButtons = ({ type = 'desktop' }: { type: 'desktop' | 'mobile' }) => (
    <div className={`flex gap-2 ${type === 'mobile' ? 'flex-col' : 'flex-row'}`}>
      <Button
        variant='outline'
        size='lg'
        onClick={handleLogin}
        className={type === 'mobile' ? 'w-full' : ''}
      >
        Login
      </Button>
      <Button
        size='lg'
        onClick={handleSignUp}
        className={type === 'mobile' ? 'w-full' : ''}
      >
        Sign Up
      </Button>
    </div>
  );

  return (
    <nav className='sticky top-0 z-50 border-b'>
      <div className='absolute inset-0 z-[-1] backdrop-blur-sm'></div>
      <div className='flex items-center justify-between p-4 max-w-7xl mx-auto relative'>
        {/* Brand */}
        <h1 className='text-2xl font-bold text-primary'>SkillSync</h1>

        {/* Desktop Buttons */}
        <div className='hidden md:flex md:items-center md:gap-4'>
          {user ? (
            <ProfileButtons type='desktop' />
          ) : (
            <AuthButtons type='desktop' />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className='md:hidden cursor-pointer'
          aria-label='Toggle Menu'
        >
          <MenuIconComponent size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden p-4 bg-background border-t'>
          {user ? (
            <ProfileButtons type='mobile' />
          ) : (
            <AuthButtons type='mobile' />
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
