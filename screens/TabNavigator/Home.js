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
import Bar from "../../components/Bar.js";
//=============================================================

//=============================================================
// Barmate Theme (Default)
//=============================================================
import getTheme from "../../native-base-theme/components/index.js";
import Common from "../../native-base-theme/variables/commonColor.js";
//=============================================================

//=============================================================
// Variables and Constants
//=============================================================
import Variables from "../../config/Variables.js";
import COLORS from "../../config/Colors.js";
//=============================================================

//=============================================================
// Imports
//=============================================================
import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import firebase from "../../config/Firebase.js";

import { Button } from 'native-base';

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";
import Carousel from "../../components/Carousel.js";
import { connect } from 'react-redux';
import { addNumber, subNumber } from '../../redux/actions.js';

import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Icon,
  StyleProvider,
  Text
} from "native-base";
import { withNavigation } from "react-navigation";
import { stringify } from "querystring";
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

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      currentIndex: 0,
      data: [],
      length: 0,
      flag: true,
    };
  }


  render() {

    return (
      <StyleProvider style={getTheme(Common)}>
        <Container>
          <Header>
            <Left />
            <Body>
              <Title>Home</Title>
            </Body>
            <Right />
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

/*
      ALTERNATIVE WAY OF USING THESE FUNCTIONS
      Only keeping this here because it is more explicit

      Extract data from store
      function mapStateToProps(state) {
        return {
          counter: state.counter,
        }
      };

      Defining mapDispatchToProps as an function
      function mapDispatchToProps(dispatch) {
        return {
          addNumber: () => dispatch(addNumber()) 
        }
      }
*/


// Extract data from store
const mapStateToProps = state => ({
  test: state.homeReducer.test,
})

// Defining mapDispatchToProps as an object
// Dispatch data to store
const mapDispatchToProps = {
  addNumber,
  subNumber,
}


const styles = StyleSheet.create({
  gradient: {
    width: Variables.deviceWidth,
    height: Variables.deviceHeight
  },
  contentContainer: {
    height: Variables.deviceHeight - 200,
    width: Variables.deviceWidth,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);  // read about connect on react-redux docs if this is confusing
