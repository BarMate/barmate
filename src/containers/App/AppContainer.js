import React from 'react';

import AuthContainer from '../Auth/AuthContainer';
import LoginContainer from '../Login/LoginContainer';
import AppNav from '../index';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { Provider } from 'react-redux';
import configureStore from '../../redux/Store';

const switchNavigator = createSwitchNavigator(
  {
    AuthContainer,
    LoginContainer,
    AppNav,
  },
  {
    initialRouteName: 'AuthContainer',
  },
);

const AppContainer = createAppContainer(switchNavigator);
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}