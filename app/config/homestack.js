import { StackNavigator } from 'react-navigation';
import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';

export default ProfileNavigator = StackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            header: null,
        },
    }    
});