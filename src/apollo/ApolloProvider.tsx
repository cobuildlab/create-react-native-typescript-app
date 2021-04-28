import React from 'react';
import { ApolloProvider as Provider } from '@apollo/client';
import { apolloClient } from './client';

/**
 * Component that handle the logic of get the token.
 *
 * @param {object} props - Props.
 * @param {object} props.children - Children.
 * @returns {JSX.Element} - Component.
 */
export function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider client={apolloClient}>{children}</Provider>;
}
