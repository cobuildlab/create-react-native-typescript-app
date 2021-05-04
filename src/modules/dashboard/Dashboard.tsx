import React, { ReactElement } from 'react';
import { Button, Text, View } from 'react-native';
import { useEvent } from '@cobuildlab/react-simple-state';
import { TokensEvent, LoginEvent } from '../auth/auth-events';
import { styles } from '../../shared/auth';
import { onLogout } from './dashboard-action';

export const Dashboard = ({ navigation }): ReactElement => {
  const loggedIn = useEvent(LoginEvent);
  const data = useEvent(TokensEvent).idToken;

  if (!loggedIn) {
    navigation.navigate('CamelCase');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Dashboard</Text>
      <Text>Welcome {data != null ? data.email : ''} . </Text>
      <Button onPress={() => onLogout(navigation)} title="Log Out" />
    </View>
  );
};
