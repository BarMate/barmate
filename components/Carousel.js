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
      refreshing: false,
      data: [],
      length: 0,
    };
  }


  // TODO: component does not update unless
  // user pulls down refresh. It should update
  // when the component is mounted
  componentDidMount() {
    this.onRefresh;
  }

  onRefresh = () => {
    console.log('Refreshing carousel...');
    let uid = firebase.auth().currentUser.uid;
    let bars = firebase.database().ref(`users/${uid}/bars/`);
    this.setState({refreshing: true});
      bars.once("value", snapshot => {
      this.setState({data: []});
      this.setState({length: snapshot.numChildren()})
      snapshot.forEach((child) => {
        this.state.data.push(child.val());
      })
    }).then(    
      this.props.refreshCarousel(this.state.data)
    )
    console.log(`Carousel data[0]: ${JSON.stringify(this.props.carouselData[1])}`)
    this.setState({refreshing: false});
  }

  mapData() {
    return this.props.carouselData.map(data => {
      return(
        <View style={styles.data}><Bar source={data} key={this.props.key}/></View>
      )
    })
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
            {this.mapData()}
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
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: Variables.deviceWidth * 0.8,
    width: Variables.deviceWidth,
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
