import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

function HeroSection() {
  return (
    <section className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-white py-15'>
      <div className='flex flex-col lg:flex-row w-full max-w-7xl px-6 items-center justify-between h-full gap-6'>
        {/* Left Content */}
        <div className='flex flex-col gap-5 max-w-xl items-center lg:items-start justify-center h-full w-full lg:w-1/2'>
          <h1 className='text-5xl lg:text-6xl font-bold'>Find Your Perfect</h1>
          <h1 className='text-5xl lg:text-6xl font-bold text-primary'>
            Learning Partner
          </h1>
          <p className='text-lg lg:text-xl text-muted-foreground lg:text-left text-center'>
            Connect with ideal study and project partners through AI-powered
            matching. Build skills together, achieve goals faster, and never learn
            alone again.
          </p>
          <div className='flex flex-wrap items-center gap-4'>
            <Button size='lg' className='flex items-center gap-2'>
              <span className='text-lg lg:text-xl font-semibold'>
                Get Started
              </span>
              <ArrowRight className='h-5 w-5' />
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='flex items-center gap-2'
            >
              <Play className='h-5 w-5' />
              <span className='text-lg lg:text-xl font-bold'>Learn More</span>
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className='w-full lg:w-1/2 lg:flex lg:items-center h-auto lg:h-full px-6 relative'>
          <div className='relative bg-white rounded-3xl shadow-lg w-full lg:max-w-[500px] p-4'>
            {/* Top-right badge */}
            <div className='absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow flex items-center gap-2 animate-pulse'>
              <span className='h-2 w-2 bg-green-500 rounded-full'></span>
              <span className='text-sm font-semibold text-gray-800'>
                AI Match Found!
              </span>
            </div>

            {/* Bottom-left badge */}
            <div className='absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow flex items-center gap-2 animate-pulse'>
              <div className='bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-xs font-bold w-7 h-7 p-2 flex items-center justify-center rounded-full'>
                98%
              </div>
              <span className='text-sm font-bold text-gray-800'>
                Compatibility
              </span>
            </div>

            <img
              src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
              alt='Hero'
              className='w-full h-auto object-cover rounded-3xl'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
