import React, { ReactElement } from 'react';
import { Button, Text, View } from 'react-native';
import { useEvent } from '@cobuildlab/react-simple-state';
import { LoginEvent } from './auth-events';
import { styles } from '../../shared/auth';
import { onLogin } from './auth-action';

export const CamelCase = ({ navigation }): ReactElement => {
  const loggedIn = useEvent(LoginEvent);

  if (loggedIn) {
    navigation.navigate('Dashboard');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Auth0Sample - Login </Text>
      <Text>You are not logged in . </Text>
      <Button onPress={() => onLogin(navigation)} title="Log In" />
    </View>
  );
};
