//=============================================================
// Tabs inside app
//=============================================================
import HomeScreen from './Home';
import SearchScreen from './SearchNEW.js';
import MessageScreen from './Message.js';
import ProfileScreen from './Profile.js';

import { createBottomTabNavigator } from 'react-navigation';

const AppTab = createBottomTabNavigator({   // App
    Home: {screen: HomeScreen }, 
    Search: {screen: SearchScreen }, 
    Message: {screen: MessageScreen }, 
    Profile: {screen: ProfileScreen },  
});


export default AppTab;