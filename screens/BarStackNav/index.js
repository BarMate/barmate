/*
    Index file for Bar stack navigator
*/

import HomeScreen from './Home.js';
import ChatScreen from './Chat.js';
import DiscussScreen from './Discuss.js';
import EventsScreen from './Events.js';
import MeetScreen from './Meet.js';
import MenuScreen from './Menu.js';

import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

const StackContainer = createStackNavigator({
    Home: HomeScreen,
    Chat: ChatScreen,
    Discuss: DiscussScreen,
    Events: EventsScreen,
    Meet: MeetScreen,
    Menu: MenuScreen,
},{ initialRouteName: 'Home'});

const BarDrawerContainer = createDrawerNavigator({   // App
    screen: StackContainer,
});

export default BarDrawerContainer;