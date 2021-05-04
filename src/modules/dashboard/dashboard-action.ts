import { Alert } from 'react-native';
import { auth0 } from '../../shared/auth0/client';
import { TokensEvent, LoginEvent } from '../auth/auth-events';

export const onLogout = (navigation): void => {
  auth0.webAuth
    .clearSession()
    .then((): void => {
      Alert.alert('Logged out!');
      const object = {
        idToken: '',
        accessToken: '',
      };
      TokensEvent.dispatch(object);
      LoginEvent.dispatch(false);
      navigation.navigate('CamelCase');
    })
    .catch((error) => {
      console.log(`Log out cancelled ${error}`);
    });
};
