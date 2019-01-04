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

import getTheme from "../../../native-base-theme/components/index.js";
import Common from "../../../native-base-theme/variables/commonColor.js";
import Variables from "../../../config/Variables.js";
import COLORS from "../../../config/Colors.js";



import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";
import Carousel from "../../../components/Carousel.js";
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import { refreshCarousel } from '../../../redux/actions.js';
import firebase from '../../../config/Firebase.js'

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


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getUserBarsFromDataBase();
  }

  getUserBarsFromDataBase() {
    let uid = firebase.auth().currentUser.uid;
    let bars = firebase.database().ref(`users/${uid}/bars/`);
    let tempArray = [];

    bars.once("value", snapshot => {
      snapshot.forEach((child) => {
        tempArray.push(child.val())
      })
    }).then(this.props.refreshCarousel(tempArray))
  }

  render() {

    return (
      <StyleProvider style={getTheme(Common)}>
        <Container>
          <Header>
            <Left style={{flex: 1}}>
              <TouchableOpacity onPress={() => {this.props.navigation.dispatch(DrawerActions.openDrawer())}}>
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

// Dispatch data to store
const mapDispatchToProps = {
  refreshCarousel,
}

const styles = StyleSheet.create({
  gradient: {
    width: Variables.deviceWidth,
    height: Variables.deviceHeight
  },
});

export default connect(null, mapDispatchToProps)(HomeScreen); 
