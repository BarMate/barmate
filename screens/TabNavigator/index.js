//=============================================================
// Tabs inside app
//=============================================================
import HomeScreen from './Home';
import SearchScreen from './SearchNEW.js';
import MessageScreen from './Message.js';
import FriendsScreen from './Friends.js';

import { createBottomTabNavigator } from 'react-navigation';

const AppTab = createBottomTabNavigator({   // App
    Home: {screen: HomeScreen }, 
    Search: {screen: SearchScreen }, 
    Friends: {screen: FriendsScreen},
    Message: {screen: MessageScreen },  
});


export default AppTab;