/* Entry point for the app */
import React from 'react';
import { YellowBox } from 'react-native';
import AppContainer from './src/containers/App/AppContainer';

// Playground to test barmate features; replace in export to use
import Playground from './src/containers/Playground/Playground';

YellowBox.ignoreWarnings(['Require cycle:']);

export default() => (
  <AppContainer />
);