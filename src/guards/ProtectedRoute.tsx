import { useEffect, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Navigate } from 'react-router-dom';

export const VerifierRoute = ({ children }: { children: React.ReactNode }) => {
    const [isVerifier, setIsVerifier] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAuthSession()
            .then(session => {
                const groups = session.tokens?.idToken?.payload['cognito:groups'] as string[];
                setIsVerifier(groups?.includes('Verifiers') ?? false);
            })
            .catch(() => setIsVerifier(false))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (!isVerifier) return <Navigate to="/"/>;
    return <>{children}</>;
};