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

import Carousel from 'react-native-snap-carousel';

const CARD_HEIGHT = Variables.deviceHeight / 2;
const CARD_WIDTH = CARD_HEIGHT - 100;

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentWillMount() {
    this._listenToBarData();
  }
  
  componentDidMount() {
    console.log(`Carousel Data: ${this.props.carouselData}`)
  }

  _listenToBarData() {
    // - pull key references from user firebase
    // - For each key, look inside the firebase bar database
    //   When the key being searched for is found, take that data
    //   and push it to the store.

    let uid = firebase.auth().currentUser.uid;
    let userBars = firebase.database().ref(`users/${uid}/bars`);
    let publicBars = firebase.database().ref(`bars`);

    userBars.on('value', snapshot => {
      snapshot.forEach(userChild => {
        publicBars.once('value', snapshot => {
          snapshot.forEach(barChild => {
            if(userChild.val() === barChild.key) {
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
            <View style={{flex: .6}}>
            
            </View>
            <View style={styles.flatlist}>
                <Carousel 
                  ref={c => { this._carousel = c}}
                  data={this.props.carouselData}
                  renderItem={(data, index) => 
                    <HomeBar 
                      key={index} 
                      name={data.item.name} 
                      rating={data.item.rating} 
                      price={data.item.price_level} 
                      photo={data.item.photos ? data.item.photos[0].photo_reference : null}
                    />
                  }
                  sliderWidth={Variables.deviceWidth}
                  itemWidth={CARD_WIDTH}
                  windowSize={1}
                />
            </View>
            <View style={styles.bottomContainer}>
              {/* <Text style={styles.name}>Manny's Bar</Text> */}
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
    position: 'absolute',
    width: Variables.deviceWidth,
    height: Variables.deviceHeight
  },
  flatlist: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingTop: Variables.deviceHeight / 7,
  },
  bottomContainer: {
    flex: 2.2,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'HkGrotesk_Bold',
    color: 'white',
    flexWrap: 'wrap',
    paddingTop: 50,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen); 
