import { useLocation } from 'react-router-dom';
import ChatSideBar from './components/ChatSideBar';
import ChatWindow from './components/ChatWindow';
import { getUserProfileByUserId } from '@/api/profile';
import { useState, useEffect } from 'react';
function Chat() {
  const location = useLocation();
  const { userId } = location.state || {};
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfileByUserId(userId);
        setUserProfile(profile);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className='flex h-screen w-full'>
      <ChatSideBar />
      <ChatWindow userProfile={userProfile} />
    </div>
  );
}

export default Chat;
