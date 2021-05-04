import jwt_decode from 'jwt-decode';
import { Alert } from 'react-native';
import { TokensEvent, LoginEvent } from './auth-events';
import { auth0 } from '../../shared/auth0/client';

/** Performs the login in auth0 and saves the accesstoken and decrypted data of the idToken.
 * to the "TokensEven" and changes the Boolean value of the "loginEvent" to indicate that the login was performed */

export const onLogin = async (navigation): Promise<void> => {
  try {
    const credentials = await auth0.webAuth.authorize({
      scope: 'openid profile email',
    });
    const object = {
      idToken: jwt_decode(credentials.idToken),
      accessToken: credentials.accessToken,
    };
    TokensEvent.dispatch(object);
    LoginEvent.dispatch(true);
    navigation.navigate('Dashboard');
    Alert.alert(`AccessToken: ${credentials.idToken}`);
  } catch (error) {
    console.log(error);
  }
};
