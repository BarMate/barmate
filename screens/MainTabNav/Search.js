/* 
    Search.js
    
    The Search screen in BarMate
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';

const API_KEY = 'AIzaSyCN-KItGpvTPEhIMd9oG2CS8XldyOuVMAc';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      longitude: 0,
      latitude: 0,
      destination: '',
      predictions: [],
      search: [],
    };
    this.onChangeInputFieldDebounced = _.debounce(this.onChangeInputField, 1000);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => this.setState({error: error.message}),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 200000 }
    );
  }

  async onChangeInputField(destination) {
    this.setState({ destination });
    const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${this.state.destination}&location=${this.state.latitude},${this.state.longitude}&radius=2000&types=establishment`;
    try {
      const result = await fetch(apiURL);
      const json = await result.json();
      this.setState({
        predictions: json.predictions
      })
    } catch (err) {
      console.log(err);
    }
  }

  async onSearch(place) {
    const apiURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${API_KEY}`
    try {
      const result = await fetch(apiURL);
      const json = await result.json();
      console.log(json);
      this.setState({
        search: json.candidates,
        latitude: json.candidates[0].geometry.location.lat,
        longitude: json.candidates[0].geometry.location.lng,
      })
    } catch(err) {
      console.log(err);
    }
  }

  render() {

    const predictions = this.state.predictions.map(prediction => 
      <TouchableOpacity key={prediction.id} onPress={() => this.onSearch(prediction.description)}>
        <Text style={styles.suggestions} key={prediction.id}>{prediction.description}</Text>
      </TouchableOpacity>
    )
    
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
          <TextInput  
            style={styles.destinationInput}
            placeholder="Enter destination.." 
            value={this.state.destination} 
            onChangeText={destination => this.onChangeInputFieldDebounced(destination)}
          />
        {predictions}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  destinationInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: 'white',
  },
  suggestions: {
    backgroundColor: 'white',
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
  },
})