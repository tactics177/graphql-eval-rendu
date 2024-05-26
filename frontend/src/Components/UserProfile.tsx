import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/UserProfile.css';
import user from '../assets/user.png';

interface UserProfileProps {
    username: string | null;
    userEmail: string | null;
    userId: string | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, userEmail, userId }) => {
    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body text-center">
                    <img 
                        src={`https://www.gravatar.com/avatar/${userId}?d=identicon`}
                        alt={`${username}'s avatar`}
                        className="rounded-circle mb-3"
                        width="150" 
                        height="150" 
                    />
                    <h3 className="card-title">{username}</h3>
                    <p className="card-text text-muted">{userEmail}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
