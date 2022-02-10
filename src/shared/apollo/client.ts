import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { REACT_APP_WORKSPACE_ID, REACT_APP_ENVIRONMENT_NAME } from '@env';
import { OnTokenEvent } from '../events/token-event';

/**
 * @param {Function} getToken - Function to get the token.
 * @param {object} headers - Extra header to the client.
 * @returns {object} Apollo client.
 */
export function createApolloClient(
  getToken: () => string,
  headers = {},
): ApolloClient<NormalizedCacheObject> {
  const environmentName =
    REACT_APP_ENVIRONMENT_NAME &&
    REACT_APP_ENVIRONMENT_NAME.length > 0 &&
    REACT_APP_ENVIRONMENT_NAME.toLowerCase() !== 'master'
      ? REACT_APP_ENVIRONMENT_NAME
      : undefined;
  const httpLink = new HttpLink({
    uri: `https://api.8base.com/${REACT_APP_WORKSPACE_ID}${
      REACT_APP_ENVIRONMENT_NAME.toLowerCase() === 'master' ||
      REACT_APP_ENVIRONMENT_NAME === ''
        ? ''
        : `_${REACT_APP_ENVIRONMENT_NAME}`
    }`,
  });

  const authLink = setContext((_, { headers: _headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        ..._headers,
        authorization: `Bearer ${token}`,
      },
    };
  });
  const wsLink = new WebSocketLink({
    uri: 'wss://ws.8base.com',
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: () => {
        const token = getToken();
        return {
          token,
          environmentName,
          workspaceId: REACT_APP_WORKSPACE_ID,
        };
      },
    },
    webSocketImpl: class WebSocketWithoutProtocol extends WebSocket {
      // eslint-disable-next-line @typescript-eslint/no-useless-constructor
      constructor(url: string) {
        super(url); // ignore protocol
      }
    },
  });
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
  );

  const client = new ApolloClient({
    uri: `https://api.8base.com/${REACT_APP_WORKSPACE_ID}${
      REACT_APP_ENVIRONMENT_NAME.toLowerCase() === 'master' ||
      REACT_APP_ENVIRONMENT_NAME === ''
        ? ''
        : `_${REACT_APP_ENVIRONMENT_NAME}`
    }`,
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });
  return client;
}

export const apolloClient: ApolloClient<NormalizedCacheObject> =
  createApolloClient(() => OnTokenEvent.get()?.token as string);
