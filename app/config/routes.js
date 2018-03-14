import { TabNavigator, TabBarTop } from 'react-navigation';
import { Dimensions } from 'react-native';
import { Icon } from 'native-base';
import React from 'react';

import ProfileNavigator from './homestack';
import ProfileScreen from '../screens/ProfileScreen';

var {height, width} = Dimensions.get('window');

export default TabNavigator(
    {
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name={'md-home'}
                        size={26}
                        style={{ color: tintColor }}
                    />
                ),
            }
        },
    }
);