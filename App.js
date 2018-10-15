//=============================================================
// App.js
//
// Root of application.
// Initializes switch navigator
//
// Author: Joseph Contumelio
// Copyright(C) 2018, Barmate l.l.c.
// All rights reserved
//=============================================================


import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Root } from 'native-base';


//=============================================================
// Tabs inside app
//=============================================================
import HomeScreen from './screens/TabNavigator/Home.js';
import SearchScreen from './screens/TabNavigator/Search.js';
import MessageScreen from './screens/TabNavigator/Message.js';
import ProfileScreen from './screens/TabNavigator/Profile.js';
//=============================================================


//=============================================================
// Sign in screen and loading account screen
//=============================================================
import SignInScreen from './screens/SignIn.js';
import AuthLoadingScreen from './components/Auth.js';
//=============================================================


//=============================================================
// Stack of pages for signing up user
//=============================================================
import Signup_page1 from './screens/SignUpScreens/SignUp.js';
import Signup_page2 from './screens/SignUpScreens/SignUp2.js';
import Signup_page3 from './screens/SignUpScreens/SignUp3.js';
import Signup_page4 from './screens/SignUpScreens/SignUp4.js';
import Signup_page5 from './screens/SignUpScreens/SignUp5.js';
import Signup_page6 from './screens/SignUpScreens/SignUp6.js';
//=============================================================


//=============================================================
// Navigators for each part of the app
//=============================================================
const AppTab = createBottomTabNavigator({   // App
    Home: HomeScreen, 
    Search: SearchScreen, 
    Message: MessageScreen, 
    Profile: ProfileScreen 
});

const SignUpStack = createStackNavigator({  // Sign up
  SignIn: SignInScreen,
  p1: Signup_page1,
  p2: Signup_page2,
  p3: Signup_page3,
  p4: Signup_page4,
  p5: Signup_page5,
  p6: Signup_page6,
});

const Switch = createSwitchNavigator({    // Switch between the two
  AuthLoading: AuthLoadingScreen, 
  App: AppTab,
  SignUp: SignUpStack,
}, 
{
  initialRouteName: 'AuthLoading' 
});
//=============================================================


export default () => (
  <Root>
    <Switch/>
  </Root>
)