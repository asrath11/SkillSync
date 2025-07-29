import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import Icon from '@/components/AppIcon';
const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/profile-setup');
  };

  const handleLearnMore = () => {
    document.getElementById('features-section')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Content */}
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
              Find Your Perfect
              <span className='block bg-primary bg-clip-text text-transparent'>
                Learning Partner
              </span>
            </h1>

            <p className='text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0'>
              Connect with ideal study and project partners through AI-powered
              matching. Build skills together, achieve goals faster, and never
              learn alone again.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <Button
                variant='default'
                size='lg'
                onClick={handleGetStarted}
                className='px-8 py-4 text-lg font-semibold shadow-elevated hover:shadow-lg transition-all duration-300'
              >
                Get Started
                <Icon name='ArrowRight' size={16} className='mr-2' />
              </Button>

              <Button
                variant='ghost'
                size='lg'
                onClick={handleLearnMore}
                className='px-8 py-4 text-lg font-semibold'
              >
                <Icon name='Play' size={16} className='mr-2' />
                Learn More
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className='relative'>
            <div className='relative bg-card rounded-3xl p-8 shadow-elevated'>
              <img
                src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                alt='AI-powered learning collaboration illustration showing diverse students working together'
                className='w-full h-auto rounded-2xl shadow-soft'
              />

              {/* Floating Elements */}
              <div className='absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-elevated animate-pulse-soft'>
                <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-success rounded-full'></div>
                  <span className='text-sm font-bold text-foreground'>
                    AI Match Found!
                  </span>
                </div>
              </div>

              <div className='absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-elevated animate-pulse-soft'>
                <div className='flex items-center space-x-2'>
                  <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center'>
                    <span className='text-white text-xs font-bold'>98%</span>
                  </div>
                  <span className='text-sm font-bold text-foreground'>
                    Compatibility
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
