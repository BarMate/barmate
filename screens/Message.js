import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons } from '@expo/vector-icons'

import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';

import { Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text } from 'native-base';

var { height, width } = Dimensions.get('window');

class MessageScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => (
            focused ? <Ionicons name={'ios-text'} size={25} color={'#FFFFFF'} />
                : <Ionicons name={'ios-text'} size={25} color={'#536497'} />
        ),
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#FFFFFF',
            inactiveTintColor: '#536497',
            style: {
                backgroundColor: '#030e2c',
            }
        },
        animationEnabled: false,
        swipeEnabled: false,
    };

    render() {
        return (
        <StyleProvider style={getTheme(Common)}>
            <Container>
                <Header>
                <Left style={{flex: 1}}>
                </Left>
                <Body style={{flex: 1}}>
                    <Title>Messages</Title>
                </Body>
                <Right style={{flex: 1}}></Right>
                </Header>
                <Content>
                    {/* Messages content */}
                </Content>
            </Container>
        </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({ 

});

export default MessageScreen;