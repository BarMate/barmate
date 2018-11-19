import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, Image, RefreshControl } from "react-native";
import Variables from '../config/Variables.js'
import Bar from '../components/Bar.js'
import Search from '../components/Search.js'
import firebase from '../config/Firebase.js'

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      length: 0,
    };
  }


  componentDidMount() {
    this._onRefresh()
  }

  componentWillReceiveProps(props, state) {
    console.log(`Value of props.data: ${props.data}`)
    console.log(`Value of state.data: ${state.data}`)
    if(props.data) {
      console.log(`if props.data`)
      return(
        this.setState({data: props.data})
      )
    }
    return null;
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    let uid = firebase.auth().currentUser.uid;
    let bars = firebase.database().ref(`users/${uid}/bars/`);
    
    console.log(`onRefresh p.DATA: ${this.props.data}`)
    console.log(`onRefresh s.DATA (Before): ${this.state.data}`)

    bars.once("value", snapshot => {
      this.setState({data: []});
      this.props.flag = true;
      snapshot.forEach((child) => {
        this.state.data.push(child.val());
        console.log(`ChildVAL: ${JSON.stringify(child.val())}`)
        console.log(`onRefresh s.DATA (After): ${JSON.stringify(this.state.data)}`)
      })
    }).then(() => {
      this.setState({refreshing: false})
    })
  }

  mapData() {
    let uid = firebase.auth().currentUser.uid;
    let bars = firebase.database().ref(`users/${uid}/bars/`);

    let results = this.state.data.map(data => {
      return(
        <View style={styles.data}><Bar source={data} key={this.props.key}/></View>
      )
    })

    return results;
  }

  render() {
    if (this.state.data) {
      return (
        <View
          style={styles.scrollContainer}>
          <ScrollView
            showsHorizontalScrollIndicator={true}
            refreshControl={
              <RefreshControl 
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}/>
            }>
          {this.mapData()}
          </ScrollView>
        </View>
      );
    }
    console.log('Please provide images');
    return null;    
  }
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
export default Carousel;
