import { createStackNavigator } from 'react-navigation-stack';
import { Auth } from '../../app/auth/Auth';
import { Dashboard } from '../../app/dashboard/Dashboard';
import { AuthCallback } from '../../app/auth/AuthCallback';

export const MainStack = createStackNavigator(
  {
    Auth: {
      screen: Auth,
    },
    Dashboard: {
      screen: Dashboard,
    },
    AuthCallback: {
      screen: AuthCallback,
    },
  },
  {
    initialRouteName: 'Auth',
  },
);
