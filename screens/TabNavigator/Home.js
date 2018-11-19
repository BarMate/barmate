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

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";
import Carousel from "../../components/Carousel.js";

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

  inputRef = React.createRef();

  dataForCarousel = () => {
    let uid = firebase.auth().currentUser.uid;
    let bars = firebase.database().ref(`users/${uid}/bars/`);
    bars.once("value", snapshot => {
      this.setState({data: []});
      snapshot.forEach((child) => {
        this.state.data.push(child.val());
        this.setState({increment: this.state.increment + 1})
      })
    })
  }

  componentWillMount() {
    this.dataForCarousel();
  }


  componentWillUpdate() {
    this.dataForCarousel();
  }

  shouldComponentUpdate() {
    if(this.state.flag === false) {
      return false 
    }
    else {
      this.setState({flag: false})
      return true;
    }
    return true;
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
              <Carousel data={this.state.data} flag={this.state.flag}></Carousel>
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
  contentContainer: {
    height: Variables.deviceHeight - 200,
    width: Variables.deviceWidth,
    // borderWidth: 2,
    // borderColor: '#CCC',
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default withNavigation(HomeScreen);
