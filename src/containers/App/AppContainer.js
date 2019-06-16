import React from 'react';

import AuthContainer from '../Auth/AuthContainer';
import LoginContainer from '../Login/LoginContainer';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const switchNavigator = createSwitchNavigator(
  {
    AuthContainer,
    LoginContainer,
  },
  {
    initialRouteName: 'AuthContainer',
  },
);

const AppContainer = createAppContainer(switchNavigator);

export default function App() {
  return (
    <AppContainer />
  );
}