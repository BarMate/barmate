import React from 'react';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons'

import getTheme from '../../native-base-theme/components';
import Common from '../../native-base-theme/variables/commonColor';
import { LinearGradient } from 'expo';
import { Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text } from 'native-base';
import COLORS from '../../config/Colors.js';
import { connect } from 'react-redux';


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
                backgroundColor: '#100D64',
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
                <Body style={{flex: 3, justifyContent: 'center'}}>
                    <Title style={{alignSelf: 'center'}}>Messages</Title>
                </Body>
                <Right style={{flex: 1}}></Right>
                </Header>
                <Content scrollEnabled={false}>
                    <LinearGradient style={styles.gradient} colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                    </LinearGradient>
                </Content>
            </Container>
        </StyleProvider>
        );
    }
}

const mapStateToProps = state => ({
    test: state.homeReducer.test,
})

const styles = StyleSheet.create({ 
    gradient: {
        width: width,
        height: height,
    }
});

export default connect(mapStateToProps, null)(MessageScreen);