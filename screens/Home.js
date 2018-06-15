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
    ScrollView
} from 'react-native';

// Used to navigate the app
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, TabBarBottom } from 'react-navigation';

// Icons for the tab bar
import { Ionicons } from '@expo/vector-icons'


// Native base used for the front end
// Use this instead of react native default styling
import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';
import { Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text } from 'native-base';
// =================================================

var { height, width } = Dimensions.get('window');

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => (
            focused ? <Ionicons name={'ios-beer'} size={25} color={'#FFFFFF'} />
                : <Ionicons name={'ios-beer'} size={25} color={'#536497'} />
        ), tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: 'white',
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
            // Get the theme for the app from Common located inside nativebasetheme/commonColor.js
            // For help look at guides for native base custom styling
            <StyleProvider style={getTheme(Common)}>
                <Container>
                    <Header>
                        <Left></Left>
                        <Body>
                            <Image
                                style={styles.logo}
                                source={require('../assets/global/logo_final.png')}
                            />
                        </Body>
                        <Right></Right>
                    </Header>
                    <Content>
                        {/* Where the Bar component should be stored */}
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

    // Unused for now but will navigate to the search tab when no Bar components are present
    _showMoreApp = () => {
        this.props.navigation.navigate('Search');
    };
    //=======================================================================================
}

const styles = StyleSheet.create({
    logo: {
        width: 60,
        height: 40,
        marginBottom: 5,
        // borderColor: '#FFFFFF',
        // borderWidth: 1,
    },
});
