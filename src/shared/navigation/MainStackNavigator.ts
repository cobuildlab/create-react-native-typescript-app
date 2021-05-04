import { createStackNavigator } from 'react-navigation-stack';
import { CamelCase } from '../../modules/auth/CamelCase';
import { Dashboard } from '../../modules/dashboard/Dashboard';
import { AuthCallback } from '../../modules/auth/AuthCallback';

Dashboard.navigationOptions = {
  headerShown: false,
};

export const MainStack = createStackNavigator(
  {
    CamelCase: {
      screen: CamelCase,
    },
    Dashboard: {
      screen: Dashboard,
    },
    AuthCallback: {
      screen: AuthCallback,
    },
  },
  {
    initialRouteName: 'CamelCase',
  },
);
