import { StackNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import React from 'react';
import BarsMap from '../screens/BarsMap'
import LoginScreen from '../screens/LoginScreen'
import { updateFocus } from 'react-navigation-is-focused-hoc'

const AppNavigator = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        },
    },
    Main: {
        screen: BarsMap,
        navigationOptions: {
            header: null,
        }
    }
});

export default class App extends React.Component {

    render() {
      return (
        <AppNavigator
          onNavigationStateChange={(prevState, currentState) => {
            updateFocus(currentState)
          }}
        />
      )
    }
  }