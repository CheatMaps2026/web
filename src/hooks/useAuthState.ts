import { useEffect, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

export type AuthState = 'loading' | 'unauthenticated' | 'unauthorized' | 'authorized';

export const useAuthState = (): AuthState => {
    const [authState, setAuthState] = useState<AuthState>('loading');

    useEffect(() => {
        fetchAuthSession()
            .then(session => {
                if (!session.tokens) { setAuthState('unauthenticated'); return; }
                const groups = session.tokens.idToken?.payload['cognito:groups'] as string[] | undefined;
                setAuthState(groups?.includes('Verifiers') ? 'authorized' : 'unauthorized');
            })
            .catch(() => setAuthState('unauthenticated'));
    }, []);

    return authState;
};