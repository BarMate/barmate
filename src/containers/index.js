import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import { YourBars, BarDetails, Plans, PlanDetails, Inside, Messages, MessageDetails } from './AppTabs/index';

import { DrawerContainer } from '../components/Drawer/index';

import Friends from './Friends/FriendsContainer';
import Profile from './Profile/ProfileContainer';

import { IconHeaderProfilePicture, IconYourBars } from '../components/AppTabs/index';
import { Ionicons } from '@expo/vector-icons';

// Tabs
const YourBarsNav = createStackNavigator(
    {
        YourBars: YourBars,
        BarDetails: BarDetails,
    },
    {
        initialRouteName: 'YourBars',
        defaultNavigationOptions: ({ navigation }) => ({
            headerTransparent: true,
            headerLeft: navigation.state.routeName === 'YourBars' ? <IconHeaderProfilePicture /> : '',
        })
    }
)

const PlansNav = createStackNavigator(
    {
        Plans: Plans,
        PlanDetails: PlanDetails,
    },
    {
        initialRouteName: 'Plans',
        defaultNavigationOptions: ({ navigation }) => ({
            headerTransparent: true,
            headerLeft: navigation.state.routeName === 'Plans' ? <IconHeaderProfilePicture /> : '',
        })
    }
)

const InsideNav = createStackNavigator(
    {
        Inside: Inside, 
    },
    {
        initialRouteName: 'Inside',
        defaultNavigationOptions: ({ navigation }) => ({
            headerTransparent: true,
            headerLeft: navigation.state.routeName === 'Inside' ? <IconHeaderProfilePicture /> : '',
        })
    }
)

const MessagesNav = createStackNavigator(
    {
        Messages: Messages,
        MessageDetails: MessageDetails,
    },
    {
        initialRouteName: 'Messages',
        defaultNavigationOptions: ({ navigation }) => ({
            headerTransparent: true,
            headerLeft: navigation.state.routeName === 'Messages' ? <IconHeaderProfilePicture /> : '',
        })
    }
)


// Create tab navigator and drawer
const TabNav = createBottomTabNavigator(
    {
        YourBarsNav,
        PlansNav,
        InsideNav,
        MessagesNav,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                if(routeName === 'YourBarsNav') {
                    return (focused ? <IconYourBars /> : <Ionicons name={"md-beer"} size={30} color={"rgba(255,255,255,0.3)"} />)
                }
                else if(routeName === 'PlansNav') {
                    return (focused ? <Ionicons name={"ios-apps"} size={30} color={"#ffffff"}/> : <Ionicons name={"ios-apps"} size={30} color={"rgba(255,255,255,0.3)"} />)
                }
                else if(routeName === 'InsideNav') {
                    return (focused ? <Ionicons name={"ios-grid"} size={30} color={"#ffffff"}/> : <Ionicons name={"ios-grid"} size={30} color={"rgba(255,255,255,0.3)"} />)
                }
                else if(routeName === 'MessagesNav') {
                    return (focused ? <Ionicons name={"ios-chatbubbles"} size={30} color={"#ffffff"}/> : <Ionicons name={"ios-chatbubbles"} size={30} color={"rgba(255,255,255,0.3)"} />)
                }
            },
            
        }),
        tabBarPosition: "bottom",
        tabBarOptions: {
            activeBackgroundColor: 'rgba(0,0,0,0.0)',
            inactiveBackgroundColor: 'rgba(0,0,0,0.0)',
            showLabel: false,
            style: {
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
            }
        },
        animationEnabled: false,
        swipeEnabled: true,

    }
)

const App = createDrawerNavigator(
    {
        Home: TabNav,
        Profile: Profile,
        Friends: Friends,
    },
    {
        drawerType: 'slide',
        initialRouteName: 'Home',
        contentComponent: DrawerContainer,
        drawerBackgroundColor: '#302c9e',
        contentOptions: {
        activeBackgroundColor: '#302c9e'
    }
})

export default App;