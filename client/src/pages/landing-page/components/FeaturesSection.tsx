import Icon from '@/components/AppIcon';
function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: 'Brain',
      title: 'AI Match Suggestions',
      description:
        'Our intelligent algorithm analyzes your skills, goals, and learning style to suggest the most compatible partners for optimal collaboration.',
      color: 'text-primary',
    },
    {
      id: 2,
      icon: 'Filter',
      title: 'Advanced Skill Filtering',
      description:
        'Filter potential partners by programming languages, experience level, project type, and availability to find exactly what you need.',
      color: 'text-primary',
    },
    {
      id: 3,
      icon: 'MessageCircle',
      title: 'Real-time Chat',
      description:
        'Seamlessly communicate with your learning partners through our integrated chat system with file sharing and code snippet support.',
      color: 'text-accent',
    },
    {
      id: 4,
      icon: 'Target',
      title: 'Goal Alignment',
      description:
        'Match with partners who share similar learning objectives and timelines to ensure productive and focused collaboration sessions.',
      color: 'text-success',
    },
    {
      id: 5,
      icon: 'Calendar',
      title: 'Smart Scheduling',
      description:
        'Coordinate study sessions and project meetings with built-in calendar integration and availability matching.',
      color: 'text-warning',
    },
    {
      id: 6,
      icon: 'TrendingUp',
      title: 'Progress Tracking',
      description:
        'Monitor your learning journey with detailed analytics, milestone tracking, and partnership success metrics.',
      color: 'text-error',
    },
  ];
  return (
    <section className='h-screen py-10 px-6' id='features-section'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6'>
          Powerful Features for
          <span className='block bg-primary bg-clip-text text-transparent'>
            Better Learning
          </span>
        </h2>
        <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
          Discover how our AI-powered platform transforms the way you find and
          collaborate with learning partners, making your educational journey more
          effective and enjoyable.
        </p>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8 xl:px-27 place-items-center'>
        {features.map((feature) => (
          <div
            key={feature.id}
            className='group bg-card lg:max-w-md rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50 hover:border-primary/20'
          >
            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-subtle mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon
                name={feature.icon}
                size={28}
                className={feature.color}
                strokeWidth={2}
              />
            </div>

            {/* Content */}
            <h3 className='text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300'>
              {feature.title}
            </h3>

            <p className='text-muted-foreground leading-relaxed'>
              {feature.description}
            </p>

            {/* Hover Effect */}
            <div className='mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <div className='flex items-center text-primary font-medium'>
                <span className='text-sm'>Learn more</span>
                <Icon
                  name='ArrowRight'
                  size={16}
                  className='ml-2 transform group-hover:translate-x-1 transition-transform duration-300'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
