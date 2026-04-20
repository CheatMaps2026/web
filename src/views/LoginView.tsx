import { useEffect } from 'react';
import { signInWithRedirect } from 'aws-amplify/auth';

export const LoginView = () => {
    useEffect(() => {
        console.log("Trying redirect...");
        signInWithRedirect().catch(console.error);
}, []);

    return (
        <div>
            <p>Redirecting to login...</p>
        </div>
    );
};