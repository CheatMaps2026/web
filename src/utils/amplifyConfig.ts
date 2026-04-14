import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_COGNITO_USERPOOL_ID,
        userPoolClientId: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
        loginWith: {
          oauth: {
            domain: import.meta.env.VITE_COGNITO_DOMAIN_URL,
            scopes: ['email', 'openid'],
            redirectSignIn: [import.meta.env.VITE_COGNITO_REDIRECT_URL],
            redirectSignOut: [import.meta.env.VITE_COGNITO_REDIRECT_URL],
            responseType: 'code'
          }
        }
      }
    }
  });
};