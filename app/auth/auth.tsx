import React, { ReactElement, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Auth0 from 'react-native-auth0';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '@env';

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

export const Auth = (): ReactElement => {
  const env = {
    clientId: AUTH0_CLIENT_ID,
    domain: AUTH0_DOMAIN,
  };
  const auth0 = new Auth0(env);
  const [accessToken, setAccessToken] = useState('');

  /**
   *
   */
  function onLogin(): void {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
      })
      .then((credentials) => {
        Alert.alert(`AccessToken: ${credentials.accessToken}`);
        setAccessToken(credentials.accessToken);
      })
      .catch((error) => console.log(error));
  }

  /**
   *
   */
  function onLogout(): void {
    auth0.webAuth
      .clearSession()
      .then(() => {
        Alert.alert('Logged out!');
        setAccessToken('');
      })
      .catch((error) => {
        console.log(`Log out cancelled ${error}`);
      });
  }

  const loggedIn = accessToken !== '';
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0Sample - Login </Text>
      <Text>You are{loggedIn ? ' ' : ' not '}logged in . </Text>
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
  );
};
