import { AppRegistry } from 'react-native';
// import { App } from './App.tsx';
import { App } from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
