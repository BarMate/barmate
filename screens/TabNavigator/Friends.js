import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import getTheme from "../../native-base-theme/components/index.js";
import Common from "../../native-base-theme/variables/commonColor.js";
import { LinearGradient } from "expo";
import Variables from "../../config/Variables.js";
import COLORS from "../../config/Colors.js";

import {
    Container,
    Header,
    Title,
    Content,
    Left,
    Right,
    Body,
    StyleProvider,
  } from "native-base";

class FriendsScreen extends Component {

    static navigationOptions = {

        tabBarIcon: ({ focused, tintColor }) => (
            focused ? <Ionicons name={'ios-people'} size={25} color={'#FFFFFF'} />
                : <Ionicons name={'ios-people'} size={25} color={'#536497'} />
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
    }

  render() {
    return (
        <StyleProvider style={getTheme(Common)}>
        <Container>
          <Header>
            <Left style={{flex: 1}}>
            </Left>
            <Body style={{flex: 3, justifyContent: 'center',}}>
              <Title style={{alignSelf: 'center'}}>Friends</Title>
            </Body>
            <Right style={{flex: 1}}/>
          </Header>

          <Content scrollEnabled={false}>
            <LinearGradient
              style={styles.gradient}
              colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>

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
        height: Variables.deviceHeight
      },
});
export default FriendsScreen;
