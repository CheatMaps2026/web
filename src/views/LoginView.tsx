import { useEffect } from 'react';
import { signInWithRedirect } from 'aws-amplify/auth';

export const LoginView = () => {
    useEffect(() => {
        signInWithRedirect();
    }, []);

    return (
        <div>
            <p>Redirecting to login...</p>
        </div>
    );
};