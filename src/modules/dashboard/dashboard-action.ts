import { Alert } from 'react-native';
import { auth0 } from '../../shared/auth0/client';
import { TokensEvent, LoginEvent } from '../auth/auth-events';

/** Performs the logout in auth0 and clears accesstoken and idToken in "tokensEven" and changes the Boolean value.
 * of the "loginEvent" to indicate that the logout was performed */

export const onLogout = async (navigation): Promise<void> => {
  try {
    await auth0.webAuth.clearSession();
    const object = {
      idToken: '',
      accessToken: '',
    };
    TokensEvent.dispatch(object);
    LoginEvent.dispatch(false);
    navigation.navigate('CamelCase');
    Alert.alert('Logged out!');
  } catch (error) {
    console.log(error);
  }
};
