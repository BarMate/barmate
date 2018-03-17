import { TabNavigator, TabBarTop } from 'react-navigation';
import { Dimensions } from 'react-native';
import { Icon } from 'native-base';
import React from 'react';

import BarMapNavigator from './homestack';
import BarsMap from '../screens/BarsMap';

var {height, width} = Dimensions.get('window');

export default TabNavigator(
    {
        BarsMap: {
            screen: BarsMapNavigator,
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
    },
    {
        initialRouteName: 'BarsMap',
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeTintColor: '#003E5B',
            inactiveTintColor: '#F0F0F0',
            allowFontScaling: false,
            style: {
                height: height*.08,
                backgroundColor: 'white',
            },
            labelStyle: {
                fontSize: 10,
            },
            indicatorStyle: {
                height: 0,
            }
        }
    }
);