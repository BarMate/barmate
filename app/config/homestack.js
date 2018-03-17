import { StackNavigator } from 'react-navigation';
import React from 'react';
import BarsMap from '../screens/BarsMap';

export default BarsMapNavigator = StackNavigator({
    BarsMapNavigator: {
        screen: BarsMap,
        navigationOptions: {
            header: null,
        },
    }    
});