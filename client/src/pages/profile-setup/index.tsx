import ProfileDetails from './components/ProfileDetails';
import ProfileView from './components/ProfileView';
import ProfileTips from './components/ProfileTips';

function ProfileSetup() {
  return (
    <section className='w-full max-w-[2000px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-20 py-4 sm:py-6 md:py-10'>
      <div className='flex flex-col xl:flex-row gap-6 xl:gap-8 2xl:gap-10 w-full'>
        {/* Main Content - Profile Form */}
        <div className='w-full xl:max-w-5xl 2xl:max-w-7xl'>
          <ProfileDetails />
        </div>

        {/* Sidebar - Preview & Tips */}
        <div className='flex flex-col gap-6 xl:gap-8 w-full xl:max-w-md 2xl:max-w-lg'>
          <div className='sticky top-4'>
            <ProfileView />
            <div className='mt-6 xl:mt-8'>
              <ProfileTips />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSetup;
