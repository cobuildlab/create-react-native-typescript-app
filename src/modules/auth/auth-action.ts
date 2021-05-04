import jwt_decode from 'jwt-decode';
import { Alert } from 'react-native';
import { TokensEvent, LoginEvent } from './auth-events';
import { auth0 } from '../../shared/auth0/client';

export const onLogin = (navigation): void => {
  auth0.webAuth
    .authorize({
      scope: 'openid profile email',
    })
    .then((credentials): void => {
      const object = {
        idToken: jwt_decode(credentials.idToken),
        accessToken: credentials.accessToken,
      };
      TokensEvent.dispatch(object);
      LoginEvent.dispatch(true);
      navigation.navigate('Dashboard');
      Alert.alert(`AccessToken: ${credentials.idToken}`);
    })
    .catch((error) => console.log(error));
};
