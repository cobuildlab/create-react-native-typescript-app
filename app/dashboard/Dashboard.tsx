import React, { ReactElement } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useEvent } from '@cobuildlab/react-simple-state';
import { TokensEvent, LoginEvent } from '../auth/auth-events';
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

export const Dashboard = ({ navigation }): ReactElement => {
  const loggedIn = useEvent(LoginEvent);
  const data = useEvent(TokensEvent).idToken;

  const onLogout = (): void => {
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
        navigation.navigate('Auth');
      })
      .catch((error) => {
        console.log(`Log out cancelled ${error}`);
      });
  };

  if (!loggedIn) {
    navigation.navigate('Auth');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Dashboard</Text>
      <Text>Welcome {data != null ? data.email : ''} . </Text>
      <Button onPress={onLogout} title="Log Out" />
    </View>
  );
};
