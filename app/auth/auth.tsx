import React, { ReactElement } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useEvent } from '@cobuildlab/react-simple-state';
import jwt_decode from 'jwt-decode';
import { TokensEvent, LoginEvent } from './auth-events';
import { auth0 } from '../../src/auth0/client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export const Auth = ({ navigation }): ReactElement => {
  const loggedIn = useEvent(LoginEvent);

  const onLogin = (): void => {
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
  if (loggedIn) {
    navigation.navigate('Dashboard');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0Sample - Login </Text>
      <Text>You are not logged in . </Text>
      <Button onPress={onLogin} title="Log In" />
    </View>
  );
};
