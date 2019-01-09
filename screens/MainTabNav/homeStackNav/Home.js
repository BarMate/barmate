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
import { selectBar, pushListData, eraseListData, refreshList, updatePicture } from '../../../redux/actions.js';
import HomeBar from '../../../components/BarComponent/HomeBar.js'
import firebase from '../../../config/Firebase.js';

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

  componentWillMount() {
    this._refreshing()
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

  _refreshing() {
    // Refreshes the list of bars on users screen
    this.props.refreshList(true);
    this.props.eraseListData();
    this._pullDataFromFirebaseToReduxStore();
    this.props.refreshList(false);
  }

  // sitting this here til i make a place for it.
  _signOutAsync = async () => {
    console.log('Signing out')
    firebase.auth().signOut().then( () => {
         AsyncStorage.clear().then(async () => {
            this.props.navigation.navigate('SignUp');
        }).catch(function(error){
            console.log(error);
        })
      }).catch(function(error) {
        console.log(error);
      });
};

  render() {

    return (
      <StyleProvider style={getTheme(Common)}>
        <Container>
          <StatusBar barStyle="light-content"/>
          <Content scrollEnabled={false}>
            <LinearGradient
              style={styles.gradient}
              colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
              <View style={styles.flatlist}>
                <FlatList
                    refreshControl={
                      <RefreshControl
                          refreshing={this.props.refreshing}
                          onRefresh={() => {this._refreshing()}}
                      />
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                    data={this.props.carouselData}
                    renderItem={({item}) => <HomeBar name={item.name} key={item.key} id={item.key} rating={item.rating} open={item.open} price={item.price}/>}
                  />
              </View>
            </LinearGradient>
          </Content>
        </Container>
      </StyleProvider>
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
