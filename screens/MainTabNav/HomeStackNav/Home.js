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
import { DrawerActions, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { updateLoading, selectBar, pushListData, eraseListData, refreshList, updatePicture } from '../../../redux/actions/HomeActions';
import HomeBar from '../../../components/BarComponent/HomeBar.js'
import firebase from '../../../config/Firebase.js';
import BasicLoadingIndicator from '../../../components/BasicLoadingIndicator';

import Carousel from 'react-native-snap-carousel';

const CARD_HEIGHT = Variables.deviceHeight / 1.5;
const CARD_WIDTH = Variables.deviceWidth - 50;

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        cache: [],
    }
  }

  componentWillMount() {
    this._listenToBarData();
  }
  
  componentDidMount() {
    console.log(`Carousel Data: ${this.props.carouselData}`)
  }

  _updateListData() {
    let uid = firebase.auth().currentUser.uid;
    let userBars = firebase.database().ref(`users/${uid}/bars`);
    let publicBars = firebase.database().ref(`bars`);

    userBars.on('value', snapshot => {
      
    })
  }

  _renderIndicator() {
    return(
      <BasicLoadingIndicator animating={this.props.loading} />
    )
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
              this.setState({cache: [...this.state.cache, barChild.val()]})
            }
          })
        }).then(() => {
            this.props.updateLoading(false)
            this.props.pushListData(this.state.cache)
          }
        )
      })
    })
}

  _snapToLastItem() {
    if(this.props.carouselData) {
      this._carousel.snapToItem(this.props.carouselData.length - 1)
    }
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <StatusBar barStyle="light-content"/>
        {/* <NavigationEvents
          onDidFocus={() => this._snapToLastItem()}
        /> */}
        <LinearGradient
            style={styles.gradient}
            colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                {this._renderIndicator()}
                <Carousel
                  contentContainerCustomStyle={{justifyContent: 'center', alignItems: 'center',}}
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
          </LinearGradient>
      </View>
    );
  }
}

// Pull data from store
const mapStateToProps = state => ({
  refreshing: state.homeReducer.refreshing,
  carouselData: state.homeReducer.carouselData,
  loading: state.homeReducer.loading,
})

// Dispatch data to store
const mapDispatchToProps = {
  pushListData,
  selectBar,
  eraseListData,
  refreshList,
  updatePicture,
  updateLoading,
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    width: Variables.deviceWidth,
    height: Variables.deviceHeight
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen); 
