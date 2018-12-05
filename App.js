/*
    App.js

    Root of application.
    Initializes switch navigator

    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved
*/


// Boilerplate imports
import React from 'react';
import { YellowBox } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

// Needed for toast menu
import { Root } from 'native-base';


// TabNav Views
import AppTab from './screens/TabNavigator/index.js';
import PreLobby from './screens/PreLobby.js';

// Sign in screen and loading account screen
import SignInScreen from './screens/SignIn.js';
import AuthLoadingScreen from './components/Auth.js';


// Stack of pages for signing up user
import Signup_page1 from './screens/SignUpScreens/SignUp.js';
import Signup_page2 from './screens/SignUpScreens/SignUp2.js';
import Signup_page3 from './screens/SignUpScreens/SignUp3.js';
import Signup_page4 from './screens/SignUpScreens/SignUp4.js';
import Signup_page5 from './screens/SignUpScreens/SignUp5.js';
import Signup_page6 from './screens/SignUpScreens/SignUp6.js';


// Redux
import { Provider } from 'react-redux';
import configureStore from './redux/store.js';


// StackNav creator for sign up screens
const SignUpStack = createStackNavigator({  // Sign up
  SignIn: SignInScreen,
  p1: Signup_page1,
  p2: Signup_page2,
  p3: Signup_page3,
  p4: Signup_page4,
  p5: Signup_page5,
  p6: Signup_page6,
});

// SwitchNav for the entire app
const Switch = createSwitchNavigator({    
  AuthLoading: AuthLoadingScreen, 
  App: AppTab,
  SignUp: SignUpStack,
  PLobby: PreLobby,
}, 
{
  initialRouteName: 'AuthLoading' 
});


// Stops the timer warning on Android. This is a known 
// problem with Expo but they haven't reached any resolution at
// this time.
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


// create store for redux
const store = configureStore();
export default () => (
  <Provider store={store}>
    <Root>
      <Switch/>
    </Root>
  </Provider>
)