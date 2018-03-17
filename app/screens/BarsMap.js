import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Constants, MapView } from 'expo';
import { Container } from '../components/Container'
import { Header } from '../components/Header'
var {deviceHeight, deviceWidth} = Dimensions.get('window');

export default class App extends Component {
  state = {
    mapRegion: { 
      latitude: 41.0709053,
      longitude: -81.512106,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
     }
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    return (
      <Container>
        <Header title={'BarMate'}/>
          <View style={styles.container}>
            <MapView
              style={{ alignSelf: 'stretch', height: 750}}
              region={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}
            />
          </View>        
      </Container>
      
    );
  }
}

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
});




