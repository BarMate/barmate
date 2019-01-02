/*
    Index file for Main tab navigator
*/
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './StackNav/Home';
import BarDetails from './StackNav/BarDetails';
import SearchScreen from './Search.js';
import MessageScreen from './Message.js';
import FriendsScreen from './Friends.js';
import ProfileScreen from '../Profile.js';
import DeleteAlert from '../Delete.js';

import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

const StackContainer = createStackNavigator({
    Home: HomeScreen,
    BarDetails, BarDetails,
},{ initialRouteName: 'Home', headerMode: 'none'} );

const DrawerContainer = createDrawerNavigator({
    Home: StackContainer,
    Profile: ProfileScreen,
    Delete: DeleteAlert,
},
{
    drawerType: 'slide',
    drawerBackgroundColor: '#42137B',
    contentOptions: {
        activeBackgroundColor: '#42137B'
    }
})

const Main = createBottomTabNavigator(
{
    Home: DrawerContainer,
    Search: SearchScreen,
    Friends: FriendsScreen,
    Message: MessageScreen,
},
{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;
            if(routeName === 'Home') {
                return (focused ? <Ionicons name={"ios-beer"} size={25} color={"#FFFFFF"}/> : <Ionicons name={"ios-beer"} size={25} color={"#536497"} />)
            }
            else if(routeName === 'Search') {
                return (focused ? <Ionicons name={"ios-search"} size={25} color={"#FFFFFF"}/> : <Ionicons name={"ios-search"} size={25} color={"#536497"} />)
            }
            else if(routeName === 'Friends') {
                return (focused ? <Ionicons name={"ios-people"} size={25} color={"#FFFFFF"}/> : <Ionicons name={"ios-people"} size={25} color={"#536497"} />)
            }
            else if(routeName === 'Message') {
                return (focused ? <Ionicons name={"ios-text"} size={25} color={"#FFFFFF"}/> : <Ionicons name={"ios-text"} size={25} color={"#536497"} />)
            }
        },
    }),
    tabBarPosition: "bottom",
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#536497',
        showLabel: false,
        style: {
            backgroundColor: "#100D64"
        }
    },
    animationEnabled: false,
    swipeEnabled: true
});

export default Main;