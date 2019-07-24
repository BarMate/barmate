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
  StatusBar,
  Text,
  Dimensions,
  View,
  Platform,
  Picker,
  ScrollView,
  SafeAreaView
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { AddFriendModal } from "../../components/Friends";

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <AddFriendModal />
    );
  }
}

const styles = StyleSheet.create({
  
})

export default Playground;
