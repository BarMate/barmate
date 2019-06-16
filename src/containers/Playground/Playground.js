/* 
    Playground.js
    
    Used to create BarMate features
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  StatusBar
} from "react-native";

import { BackgroundView, Logo } from '../../components/Global/index';

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BackgroundView style={styles.root}>
        <StatusBar barStyle="light-content"/>
        <Logo style={styles.logo} />
        <ActivityIndicator size={0} style={styles.indicator} />
      </BackgroundView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    marginTop: 100,
  },
  indicator: {
    marginTop: 480,
  },
});

export default Playground;
