//=============================================================
// Home.js
//
// Screen for the home tab
// Displays to users their respective bar components
//
// Author: Joseph Contumelio
// Copyright(C) 2018, Barmate l.l.c.
// All rights reserved.
//=============================================================


//=============================================================
// Bar component
//=============================================================
import Bar from '../../components/Bar.js';
//=============================================================

//=============================================================
// Barmate Theme (Default)
//=============================================================
import getTheme from '../../native-base-theme/components/index.js';
import Common from '../../native-base-theme/variables/commonColor.js';
//=============================================================

//=============================================================
// Variables and Constants
//=============================================================
import Variables  from '../../config/Variables.js';
import COLORS from '../../config/Colors.js';
//=============================================================

//=============================================================
// Imports
//=============================================================
import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo'
import Carousel from 'react-native-carousel-view'
import { Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text } from 'native-base';
import { withNavigation } from 'react-navigation'; 
//=============================================================

class HomeScreen extends React.Component {
    
    //=============================================================
    // Definitions for the profile tab on the tab bar
    //=============================================================
    static navigationOptions = {
        tabBarIcon: ({ focused, tintColor }) => (
            focused ? <Ionicons name={'ios-beer'} size={25} color={'#FFFFFF'} />
                : <Ionicons name={'ios-beer'} size={25} color={'#536497'} />
        ), 
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: 'white',
            inactiveTintColor: '#536497',
            style: {
                backgroundColor: '#100D64',
            }
        },
        animationEnabled: false,
        swipeEnabled: false,
    };
    //=============================================================
    
    render() {
        return (
            <StyleProvider style={getTheme(Common)}>
                <Container>

                    <Header>
                        <Left></Left>
                        <Body>
                            <Title>Home</Title>
                        </Body>
                        <Right></Right>
                    </Header>


                    <Content scrollEnabled={false}>
                        <LinearGradient style={styles.gradient} colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                            <Carousel
                                width={Variables.deviceWidth}
                                height={Variables.deviceHeight - 200}
                                animate={false}
                                indicatorAtBottom={true}
                                indicatorSize={10}
                                indicatorText="o"
                                indicatorColor="white"
                                >
                                <View style={styles.contentContainer}>
                                    <Bar />
                                </View>
                                <View style={styles.contentContainer}>
                                    <Bar />
                                </View>
                                <View style={styles.contentContainer}>
                                    <Bar />
                                </View>
                            </Carousel>
                        </LinearGradient>
                    </Content>

                </Container>
            </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    gradient: {
        width: Variables.deviceWidth,
        height: Variables.deviceHeight,
    },
    contentContainer: {
        height: Variables.deviceHeight - 200,
        width: Variables.deviceWidth,
        // borderWidth: 2,
        // borderColor: '#CCC',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default withNavigation(HomeScreen);