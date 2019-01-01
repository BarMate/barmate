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
import { TouchableOpacity, Text } from 'react-native'
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator, withNavigation, DrawerActions  } from 'react-navigation';

const StackContainer = createStackNavigator({
    Home: HomeScreen,
    BarDetails, BarDetails,
},
{ 
    initialRouteName: 'Home', 
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.routeName === 'Home' ? (<Text style={{fontFamily: 'HkGrotesk_Bold', fontSize: 20, color: 'white'}}>Home</Text>) : '',
        headerRight: navigation.state.routeName === 'BarDetails' ? (
            <TouchableOpacity onPress={() => {alert('You were join a bar here!')}}>
                <Text style={{color: 'white', fontFamily: 'HkGrotesk_Bold', fontSize: 20, marginRight: 15}}>Join</Text>
            </TouchableOpacity>) : '',
        headerLeft: navigation.state.routeName === 'Home' ? (<TouchableOpacity onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                                                                <Ionicons name={'ios-contact'} size={30} color={'#FFFFFF'} style={{paddingLeft: 10}} />
                                                            </TouchableOpacity>) : '',
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

const Main = createBottomTabNavigator(
{
    Home: StackContainer,
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

const DrawerContainer = createDrawerNavigator({
    Home: Main,
    Profile: ProfileScreen,
},
{
    drawerType: 'slide',
    drawerBackgroundColor: '#42137B',
    contentOptions: {
        activeBackgroundColor: '#42137B'
    }
})
export default withNavigation(DrawerContainer);