import { createStackNavigator } from 'react-navigation-stack';

import { Auth } from '../../app/auth/auth';

export const MainStack = createStackNavigator(
  {
    Auth: {
      screen: Auth,
    },
  },
  {
    initialRouteName: 'Auth',
  },
);
