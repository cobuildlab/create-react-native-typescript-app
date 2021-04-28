import React, { ReactElement } from 'react';
import { AppNavigator } from '../src/navigation/AppNavigation';
import { ApolloProvider } from '../src/apollo/ApolloProvider';

export const App = (): ReactElement => {
  return (
    <ApolloProvider>
      <AppNavigator />
    </ApolloProvider>
  );
};
