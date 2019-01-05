/*
    App.js

    Root of application.
    Initializes root switch navigator

    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved
*/

// I think expo has fixed this issue not sure though. I'm getting an issue on my phone
// When this code is in use
// Stops the timer warning on Android.
// This is a known problem with Expo but they haven't reached any resolution at this time.
// YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = message => {
//   if (message.indexOf('Setting a timer') <= -1) {
//     _console.warn(message);
//   }
// };

// Boilerplate imports
import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

// Needed for toast menu
import { Root } from 'native-base';

// Redux
import { Provider } from 'react-redux';
import configureStore from './redux/store.js';

// All Screens
import Auth from './components/Auth.js';
import SignIn from './screens/SignIn.js';
import SignUp from './screens/SignUpStackNav/index.js';
import Main from './screens/MainTabNav/index.js';
import Bar from './screens/BarStackNav/index.js';
import Start from './screens/Start.js';

const App = createSwitchNavigator(
  {
    Auth,
    SignIn,
    SignUp,
    Main,
    Bar,
    Start,
  },
  {
    initialRouteName: 'Auth',
  },
);

// create store for redux
const store = configureStore();

export default () => (
  <Provider store={store}>
    <Root>
      <App />
    </Root>
  </Provider>
);
