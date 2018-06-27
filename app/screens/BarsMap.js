import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Constants } from 'expo';
import { Container } from '../components/Container'
import { Header } from '../components/Header'
var {deviceHeight, deviceWidth} = Dimensions.get('window');

import MapView, { Marker, Callout } from 'react-native-maps';

import { DrawerNavigator } from 'react-navigation'
import {Icon, Button, Content, Left } from 'native-base'  // Using custom container and header

import HomeScreen from './HomeScreen'
import SettingsScreen from './SettingsScreen'

var {height, width} = Dimensions.get('window');

export default class App extends Component {
  
  state = {
    mapRegion: { 
      latitude: 41.0709053,
      longitude: -81.512106,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
     },
     markers: [
      {
        latlng: {
          latitude:  41.071331,
          longitude: -81.4952769,
        },
        title: "Dave's Supermarket",
        description: "The girlscouts here sell peanutbutter cookies!",
        image: require("../assets/images/test.png"),
        key: 1,
        url: 'https://www.google.com/maps?saddr=My+Location&daddr=@41.071331,-81.4952769'
      },
    ]
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() { 
    return ( 
      <Container>
          <Header title='BarMate'/>
          <View style={styles.container}>
            <MapView
              style={{ alignSelf: 'stretch', height: 750}}
              initialRegion={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}
            >
            {this.state.markers.map(marker => (
                <Marker key={marker.key}
                  image={marker.image}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}>
                  <Callout>
                    <View>
                      <Text style={styles.textBold}>{marker.title}</Text>
                      <Text>{marker.description}</Text>
                      <View style={styles.blueView}>
                        <Text style={styles.text}>Tap to get directions!</Text>
                      </View>
                    </View>
                </Callout>
                </Marker>
              ))}
            </MapView>
          </View>  
      </Container>
    );
  }
}

const MyApp = DrawerNavigator ({  // Drawer navigator constructor
  Settings:{
    screen: SettingsScreen
  },
  Home:{
    screen: HomeScreen
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  blueView: {
    backgroundColor: 'aquamarine',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});




