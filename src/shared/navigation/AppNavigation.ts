import { createAppContainer } from 'react-navigation';

import { MainStack } from './MainStackNavigator';

export const AppNavigator = createAppContainer(MainStack);
