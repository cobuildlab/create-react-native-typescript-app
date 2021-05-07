import Auth0 from 'react-native-auth0';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '@env';

const env = {
  clientId: AUTH0_CLIENT_ID,
  domain: AUTH0_DOMAIN,
};

export const auth0 = new Auth0(env);
