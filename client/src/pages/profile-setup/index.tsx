import ProfileDetails from './components/ProfileDetails';
import ProfileView from './components/ProfileView';
import ProfileTips from './components/ProfileTips';
function ProfileSetup() {
  return (
    <section className='md:py-10 md:px-20 p-2'>
      <div className='xl:flex flex-col xl:flex-row gap-10 justify-center'>
        <ProfileDetails />
        <div className='flex flex-col gap-10 w-full'>
          <ProfileView />
          <ProfileTips />
        </div>
      </div>
    </section>
  );
}

export default ProfileSetup;
