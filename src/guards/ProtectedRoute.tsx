import { useEffect, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Navigate } from 'react-router-dom';
import { useAuthState } from '../hooks/useAuthState';

export const VerifierRoute = ({ children }: { children: React.ReactNode }) => {
    const authState = useAuthState();

    if (authState === 'loading') return <div>Loading...</div>;
    if (authState !== 'authorized') return <Navigate to="/" />;
    return <>{children}</>;
};