/*
    Index file for Bar stack navigator
*/

import HomeScreen from './Home.js';
import ChatScreen from './Chat.js';
import DiscussScreen from './Discuss.js';
import EventsScreen from './Events.js';
import MeetScreen from './Meet.js';
import MenuScreen from './Menu.js';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { DrawerActions, withNavigation } from 'react-navigation';

const StackContainer = createStackNavigator({
    Home: HomeScreen,
    Chat: ChatScreen,
    Discuss: DiscussScreen,
    Events: EventsScreen,
    Meet: MeetScreen,
    Menu: MenuScreen,
},
{ 
    initialRouteName: 'Home', 
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
        headerTitle: `Manny's Bar`,
        headerStyle: {
          backgroundColor: 'rgba(16, 13, 100, 1)',
        },
        headerTitleStyle: {
          fontFamily: 'HkGrotesk_Bold',
          color: '#FFFFFF',
        },
        headerTintColor: '#fff',
    })
});

const BarDrawerContainer = createDrawerNavigator({   // App
    screen: StackContainer,
},{ });

export default withNavigation(BarDrawerContainer);