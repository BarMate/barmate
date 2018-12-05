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

import getTheme from "../../native-base-theme/components/index.js";
import Common from "../../native-base-theme/variables/commonColor.js";
import Variables from "../../config/Variables.js";
import COLORS from "../../config/Colors.js";



import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";
import Carousel from "../../components/Carousel.js";
import { DrawerActions } from 'react-navigation';

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
//=============================================================

class HomeScreen extends React.Component {
  //=============================================================
  // Definitions for the profile tab on the tab bar
  //=============================================================
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) =>
      focused ? (
        <Ionicons name={"ios-beer"} size={25} color={"#FFFFFF"} />
      ) : (
        <Ionicons name={"ios-beer"} size={25} color={"#536497"} />
      ),
    tabBarPosition: "bottom",
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "white",
      inactiveTintColor: "#536497",
      style: {
        backgroundColor: "#100D64"
      }
    },
    animationEnabled: false,
    swipeEnabled: false
  };
  //=============================================================

  render() {

    return (
      <StyleProvider style={getTheme(Common)}>
        <Container>
          <Header>
            <Left style={{flex: 1}}>
              <TouchableOpacity>
                <Ionicons name={'ios-contact'} size={30} color={'#FFFFFF'} style={{paddingLeft: 10}} />
              </TouchableOpacity>
            </Left>
            <Body style={{flex: 3, justifyContent: 'center'}}>
              <Title style={{alignSelf: 'center'}}>Home</Title>
            </Body>
            <Right style={{flex: 1}}/>
          </Header>

          <Content scrollEnabled={false}>
            <LinearGradient
              style={styles.gradient}
              colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
              <Carousel/>
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

export default HomeScreen;  // read about connect on react-redux docs if this is confusing
