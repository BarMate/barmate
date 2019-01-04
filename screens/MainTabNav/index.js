/*
    Index file for Main tab navigator
*/
import React from 'react';
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './homeStackNav/Home';
import BarDetails from './homeStackNav/BarDetails';
import SearchScreen from './Search.js';
import MessageScreen from './Message.js';
import FriendsScreen from './friendsStackNav/Friends.js';
import CardDetails from './friendsStackNav/CardDetails.js'
import ProfileScreen from '../Profile.js';
import LoggedInUserProfile from '../loggedInUserProfile.js';
import COLORS from '../../config/Colors.js';
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

const homeStackContainer = createStackNavigator({
    Home: HomeScreen,
    BarDetails, BarDetails,
},{ initialRouteName: 'Home', headerMode: 'none'} );

const friendsStackContainer = createStackNavigator({
    Friends: FriendsScreen,
    Profile: ProfileScreen,
    CardDetails: CardDetails
},
{ 
    initialRouteName: 'Friends', 
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
        headerTitle: `Plans`,
        headerStyle: {
          backgroundColor: COLORS.HEADER_COLOR,
        },
        headerTitleStyle: {
          fontFamily: 'HkGrotesk_Bold',
          color: '#FFFFFF',
        },
        headerTintColor: '#fff',
        headerRight: (navigation.state.routeName == 'Friends' ? <TouchableOpacity><Ionicons name={'ios-add'} size={35} color={'#FFFFFF'} style={{paddingRight: 20}}/></TouchableOpacity> : null)
        
    })
});

const DrawerContainer = createDrawerNavigator({
    Home: homeStackContainer,
    Profile: LoggedInUserProfile,
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
    Friends: friendsStackContainer,
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