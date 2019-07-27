import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

// App tabs
import { YourBars, BarDetails, Plans, PlanDetails, Inside, Messages, MessageDetails } from './AppTabs/index';

// Drawer
import { DrawerContainer } from '../components/Drawer/index';

// Tab Bar
import CustomTabBar from '../components/TabBar/CustomTabBar';

// Profile
import Profile from './Profile/ProfileContainer';

// Friends
import FriendsContainer from './Friends/MainScreen/FriendsContainer';
import FriendsProfileScreenContainer from './Friends/FriendProfileScreen/FriendsProfileScreenContainer';


const YourBarsNav = createStackNavigator(
    {
        YourBars: YourBars,
        BarDetails: BarDetails,
    },
    {
        initialRouteName: 'YourBars',
        headerMode: 'none',
        defaultNavigationOptions: ({ navigation }) => ({
            headerTransparent: true,
            headerStyle: {
                height: hp('8%')
            },
            headerBackground: (
                <LinearGradient 
                    colors={['rgba(48,44,158,0.4)', 'transparent']}
                    style={{ flex: 1 }}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                />
            )
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
        })
    }
)

const FriendsNav = createStackNavigator(
    {
        Friends: FriendsContainer,
        FriendsProfileScreen: FriendsProfileScreenContainer,
    },
    {
        initialRouteName: 'Friends',
        headerMode: 'none',
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
        tabBarPosition: "bottom",
        tabBarComponent: ({ navigation }) => <CustomTabBar navigation={navigation} />,
        tabBarOptions: {
            activeBackgroundColor: 'rgba(0,0,0,0.0)',
            inactiveBackgroundColor: 'rgba(0,0,0,0.0)',
            showLabel: false,
            style: {
                backgroundColor: 'transparent',
                borderTopWidth: 0,
            },
        },
        animationEnabled: false,
        swipeEnabled: true,

    }
)

const App = createDrawerNavigator(
    {
        Home: TabNav,
        Profile: Profile,
        Friends: FriendsNav,
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