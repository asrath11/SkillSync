import { UserCard } from './components/UserCard';
import { type ProfileData } from '@/types/profile';
import SideBar from './components/SideBar';
import { getAllUserProfiles } from '@/api/profile';
import { useState, useEffect } from 'react';

export default function ProfileMatchPage() {
    const [userProfiles, setUserProfiles] = useState<ProfileData[]>([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            const data = await getAllUserProfiles();
            setUserProfiles(data);
        };

        fetchProfiles();
    }, []);

    const handleConnect = (profileId: number) => {
        console.log(`Connected with profile ${profileId}`);
        // Implement connection logic
    };

    const handleMessage = (profileId: number) => {
        console.log(`Messaging profile ${profileId}`);
        // Implement messaging logic
    };

    return (
        <div className="container py-8 px-4 flex gap-6">
            <SideBar />
            <div className="grid grid-cols-1 w-full gap-6">
                {userProfiles.map((profile: ProfileData, index: number) => (
                    <UserCard
                        key={index}
                        profile={profile}
                        onConnect={() => handleConnect(index)}
                        onMessage={() => handleMessage(index)}
                    />
                ))}
            </div>
        </div>
    );
}