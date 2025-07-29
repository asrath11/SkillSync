import { Button } from '@/components/ui/button';

function NavBar() {
  return (
    <nav className='sticky top-0 z-50 border-b-1'>
      <div className='flex items-center justify-between p-4  max-w-7xl mx-auto'>
        <div className='absolute top-0 left-0 inset-0 z-[-1] backdrop-blur-[3px] bg-white/5 '></div>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-bold text-primary'>SkillSync</h1>
        </div>
        <ul className='flex gap-2'>
          <Button variant='outline' size='lg'>
            login
          </Button>
          <Button size='lg'>sign up</Button>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
