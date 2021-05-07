import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { REACT_APP_AUTH_PROFILE_ID } from '@env';
import { useEvent } from '@cobuildlab/react-simple-state';
import { Text, View } from 'react-native';
import { TokensEvent, LoginEvent } from './auth-events';
import {
  CURRENT_USER_QUERY,
  USER_SIGN_UP_MUTATION,
} from '../../shared/auth-callback/auth-callback-queries';

// TODO add loading component
/**
 * @param {object} props - Props.
 * @param {object} props.navigation - Navigation of react-navigation-stack.
 * @returns {JSX.Element} - Auth callback component.
 */
export function AuthCallback({ navigation }): JSX.Element {
  const client = useApolloClient();
  const user = useEvent(TokensEvent).idToken;
  const isAuthenticated = useEvent(LoginEvent);

  useEffect(() => {
    const handleAuthentication = async (): Promise<void> => {
      const { email } = user;

      try {
        await client.query({
          query: CURRENT_USER_QUERY,
        });
      } catch (error) {
        await client.mutate({
          mutation: USER_SIGN_UP_MUTATION,
          variables: {
            user: { email },
            authProfileId: REACT_APP_AUTH_PROFILE_ID,
          },
        });
      }
    };

    if (isAuthenticated) {
      navigation.navigate('Dashboard');
      handleAuthentication();
    }
  }, [isAuthenticated]);

  // NOT ADD LOADING COMPONENT HERE this must be a loading auth component
  return (
    <View>
      <Text>authenticated....</Text>
    </View>
  );
}
