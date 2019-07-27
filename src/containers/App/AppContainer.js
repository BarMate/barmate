import React from 'react';

import AuthContainer from '../Auth/AuthContainer';
import LoginContainer from '../Login/LoginContainer';

import SignupPage1Container from '../Signup/SignupPage1/SignupPage1Container';
import SignupPage2Container from '../Signup/SignupPage2/SignupPage2Container';
import SignupPage3Container from '../Signup/SignupPage3/SignupPage3Container';
import SignupPage4Container from '../Signup/SignupPage4/SignupPage4Container';
import SignupPage5Container from '../Signup/SignupPage5/SignupPage5Container';

import AppNav from '../index';

import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import configureStore from '../../redux/Store';

// Signup Stack
const SignupStack = createStackNavigator(
  {
    SignupPage1Container,
    SignupPage2Container,
    SignupPage3Container,
    SignupPage4Container,
    SignupPage5Container,
  },
  {
    initialRouteName: 'SignupPage1Container',
    headerMode: 'none',
    mode: 'card',
  }
)
  
  const SignupAndLogin = createStackNavigator(
    {
      LoginContainer,
      SignupStack,
    },
    {
      initialRouteName: 'LoginContainer',
      headerMode: 'none',
      mode: 'modal',
    }
  )
  
const switchNavigator = createSwitchNavigator(
  {
    AuthContainer,
    SignupAndLogin,
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