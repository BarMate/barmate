/* Entry point for the app */
import React from 'react';
import { YellowBox } from 'react-native';
import AppContainer from './src/containers/App/AppContainer';

YellowBox.ignoreWarnings(['Require cycle:']);

export default() => (
  <AppContainer />
);
