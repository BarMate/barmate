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
import { StyleSheet, TouchableOpacity, View, FlatList, Text, RefreshControl, StatusBar, AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import { selectBar, pushListData, eraseListData, refreshList, updatePicture } from '../../../redux/actions/HomeActions';
import HomeBar from '../../../components/BarComponent/HomeBar.js'
import firebase from '../../../config/Firebase.js';
import MapBar from '../../../components/BarComponent/MapBar'

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
    this.state = {
      refreshing: false,
    }
  }

  _pullDataFromFirebaseToReduxStore() {
    // 1) pull key references from user firebase
    // 2) For each key, look inside the firebase bar database
    //    When the key being searched for is found, take that data
    //    and push it to the store.

    let uid = firebase.auth().currentUser.uid;
    let userBars = firebase.database().ref(`users/${uid}/bars`);
    let publicBars = firebase.database().ref(`bars`);

    userBars.on('value', snapshot => {
      snapshot.forEach(userChild => {
        publicBars.once('value', snapshot => {
          snapshot.forEach(barChild => {
            if(userChild.val() === barChild.val().key) {
              this.props.pushListData(barChild.val());
            }
          })
        })
      })
    })
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content"/>
          <LinearGradient
            style={styles.gradient}
            colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
            <View style={styles.flatlist}>
                
            </View>
          </LinearGradient>
      </View>
    );
  }
}

// Pull data from store
const mapStateToProps = state => ({
  refreshing: state.homeReducer.refreshing,
  carouselData: state.homeReducer.carouselData,
})

// Dispatch data to store
const mapDispatchToProps = {
  pushListData,
  selectBar,
  eraseListData,
  refreshList,
  updatePicture,
}

const styles = StyleSheet.create({
  gradient: {
    width: Variables.deviceWidth,
    height: Variables.deviceHeight
  },
  flatlist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingBottom: 220, 
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen); 
