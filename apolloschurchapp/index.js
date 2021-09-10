import Bugsnag from '@bugsnag/react-native';

import './loadConfig';
import { AppRegistry, YellowBox } from 'react-native';

Bugsnag.start();

// temp fix for the promise.finally
// https://github.com/storybookjs/storybook/issues/8371
const fn = Promise.prototype.finally;
Promise.prototype.finally = fn; // eslint-disable-line

const MainApp = require('./src').default;

const App = MainApp;

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

AppRegistry.registerComponent('GoDoGood', () => App);
