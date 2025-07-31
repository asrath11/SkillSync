import ProfileDetails from './components/ProfileDetails';
import ProfileView from './components/ProfileView';
import ProfileTips from './components/ProfileTips';
function ProfileSetup() {
  return (
    <section className='py-10 px-20'>
      <div className='flex gap-10 justify-center'>
        <ProfileDetails />
        <div className='flex flex-col gap-10'>
          <ProfileView />
          <ProfileTips />
        </div>
      </div>
    </section>
  );
}

export default ProfileSetup;
