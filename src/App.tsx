import React, { ReactElement } from 'react';
import { AppNavigator } from './shared/navigation/AppNavigation';
import { ApolloProvider } from './shared/apollo/ApolloProvider';

export const App = (): ReactElement => {
  return (
    <ApolloProvider>
      <AppNavigator />
    </ApolloProvider>
  );
};
