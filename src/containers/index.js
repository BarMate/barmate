import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import { YourBars, BarDetails, Plans, PlanDetails, Inside, Messages, MessageDetails } from './AppTabs/index';
import { Ionicons } from '@expo/vector-icons';

// Tabs
const YourBarsNav = createStackNavigator(
    {
        YourBars: YourBars,
        BarDetails: BarDetails,
    },
    {
        initialRouteName: 'YourBars',
    }
)

const PlansNav = createStackNavigator(
    {
        Plans: Plans,
        PlanDetails: PlanDetails,
    },
    {
        initialRouteName: 'Plans',
    }
)

const InsideNav = createStackNavigator(
    {
        Inside: Inside, 
    },
    {
        initialRouteName: 'Inside',
    }
)

const MessagesNav = createStackNavigator(
    {
        Messages: Messages,
        MessageDetails: MessageDetails,
    },
    {
        initialRouteName: 'Messages',
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
                if(routeName === 'YourBars') {
                    return (focused ? <Ionicons name={"ios-beer"} size={25} color={"#FFFFFF"}/> : <Ionicons name={"ios-beer"} size={25} color={"#536497"} />)
                }
                else if(routeName === 'Plans') {
                    return (focused ? <Ionicons name={"ios-search"} size={25} color={"#FFFFFF"}/> : <Ionicons name={"ios-search"} size={25} color={"#536497"} />)
                }
                else if(routeName === 'Inside') {
                    return (focused ? <Ionicons name={"ios-people"} size={25} color={"#FFFFFF"}/> : <Ionicons name={"ios-people"} size={25} color={"#536497"} />)
                }
                else if(routeName === 'Messages') {
                    return (focused ? <Ionicons name={"ios-text"} size={25} color={"#FFFFFF"}/> : <Ionicons name={"ios-text"} size={25} color={"#536497"} />)
                }
            },
        }),
        tabBarPosition: "bottom",
        tabBarOptions: {
           
        },
        animationEnabled: false,
        swipeEnabled: true,
    }
)

const App = createDrawerNavigator(
    {
        Tabs: TabNav,
        // Profile: Profile,
        // Friends: Friends,
    },
    {
        drawerType: 'slide',
        // contentComponent: CustomDrawer,
        drawerBackgroundColor: '#302c9e',
        contentOptions: {
            activeBackgroundColor: '#302c9e'
    }
})

export default App;