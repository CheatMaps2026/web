import { useEffect } from 'react';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

export const LogoutView = () => {
    const navigate = useNavigate();

    useEffect(() => {
        signOut({ global: true })
            .then(() => navigate('/'))
            .catch(err => console.error('Error signing out:', err));
    }, []);

    return <div>Signing out...</div>;
};