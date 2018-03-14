import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import {Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');

class ProfileScreen extends Component {

    render() {

        return (
            <Container>
                <View>
                    <Text>Hello World</Text>
                </View>
                
            </Container>
        )
    }
}

export default withNavigationFocus(ProfileScreen, 'Profile')