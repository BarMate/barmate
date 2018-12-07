import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, Image, RefreshControl } from "react-native";
import Variables from '../config/Variables.js'
import Bar from '../components/Bar.js'
import Search from '../components/Search.js'
import firebase from '../config/Firebase.js'

import { connect } from 'react-redux'
import { refreshCarousel } from '../redux/actions.js';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      length: 0,
    };
  }


  // TODO: component does not update unless
  // user pulls down refresh. It should update
  // when the component is mounted

  getUserBarsFromDataBase() {
    let uid = firebase.auth().currentUser.uid;
    let bars = firebase.database().ref(`users/${uid}/bars/`);
    
    bars.once("value", snapshot => {
      snapshot.forEach((child) => {
        this.state.data.push(child.val());
      })
    }).then(this.props.refreshCarousel(this.state.data))
  }

  onRefresh = () => {
    this.setState({refreshing: true})
    this.getUserBarsFromDataBase();
    this.mapDataToView();
    this.setState({refreshing: false})
  }

  mapDataToView() {
    let results = this.state.data.map(data => {
      return(
        <View style={styles.data} key={Math.random()}><Bar source={data}/></View>
      )
    })
    return results;
  }

  render() {
      return (
       
        <View
          style={styles.scrollContainer}>
          <ScrollView
            showsHorizontalScrollIndicator={true}
            refreshControl={
              <RefreshControl 
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            {this.mapDataToView()}
          </ScrollView>
        </View>
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
  carouselData: state.homeReducer.carouselData
})

// Dispatch data to store
const mapDispatchToProps = {
  refreshCarousel,
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: Variables.deviceHeight,
  },
  data: {
    marginTop: 150,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: Variables.deviceWidth * 0.8,
    width: Variables.deviceWidth,
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
