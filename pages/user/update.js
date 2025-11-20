import Private from '../../components/auth/Private';
import ProfileUpdate from '../../components/auth/ProfileUpdate';
import UserDashLayout from '@/components/UserDashLayout';
import dynamic from 'next/dynamic';

const UserProfileUpdate = () => {
    return (
        <UserDashLayout>
            <Private>
                
                <ProfileUpdate />
                  
            </Private>
        </UserDashLayout>
    );
};

// export default UserProfileUpdate;

export default dynamic(() => Promise.resolve(UserProfileUpdate), { ssr: false })