/* 
    Search.js
    
    The Search screen in BarMate
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, Keyboard, Animated, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps';
import COLORS from '../../config/Colors';

import _ from 'lodash';
import Variables from '../../config/Variables';
import { connect } from 'react-redux'
import { onSubmitNearbySearch, userSearch } from '../../redux/actions/SearchActions'
import MapBar from '../../components/BarComponent/MapBar'
import API_KEY from '../../config/API_Key';
import firebase from '../../config/Firebase';

const CARD_HEIGHT = Variables.deviceHeight / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0041,
        longitudeDelta: 0.0021,
      },
      error: "",
      longitude: 0,
      latitude: 0,
      destination: '',
      predictions: [],
      textSearchResults: [],
      nearbySearchResults: [],
      detailsSearchResults: {},
    };
    this.onChangeInputFieldDebounced = _.debounce(this.onChangeInputField, 500);
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  } 

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            longitudeDelta: 0.0041,
            latitudeDelta: 0.0021,
          }
        })
        this.map.animateToCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }, 1000)
      },
      
      error => this.setState({error: error.message}),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 200000 }
    );

    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.nearbySearchResults.length) {
        index = this.state.nearbySearchResults.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

    clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          this.map.animateToRegion(
            {
              latitude: this.state.nearbySearchResults[index].geometry.location.lat,
              longitude: this.state.nearbySearchResults[index].geometry.location.lng,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  //componentWillReceiveProps is depricated, must be updated to getDerivedStateFromProps
  componentWillReceiveProps(nextProps) {
    if(nextProps.destination || nextProps.destination == '') {
      console.log('Text')
      this.onChangeInputFieldDebounced();
    }
    if(nextProps.submitSearch != '') {
      console.log(`Nearby: ${this.props.submitSearch}`)
      this.onSearchNearby(nextProps.submitSearch)
    }
  }

  async onChangeInputField() {
    const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${this.props.destination}&location=${this.state.latitude},${this.state.longitude}&radius=2000&types=establishment`;
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

  async onSearchFindPlaceFromText(place) {
    const apiURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry,types&key=${API_KEY}`
    this.props.userSearch(true);
    Keyboard.dismiss();
    try {
      const result = await fetch(apiURL);
      const json = await result.json();
      json.candidates[0].types.forEach(types => {
        if(types === 'bar' || types === 'night_club') {
          this.setState({
            nearbySearchResults: json.candidates,
          })
        }
      })
      this.map.animateToRegion({
        latitude: json.candidates[0].geometry.location.lat, 
        longitude: json.candidates[0].geometry.location.lng,
        latitudeDelta: this.state.region.latitudeDelta,
        longitudeDelta: this.state.region.longitudeDelta,
      }, 1000)
    } catch(err) {
      console.log(err);
    }
  }

  async onSearchNearby(query) {
    const textSearchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}&radius=2000&type=bar`;
    console.log(textSearchURL)
    let longitude = 0;
    let latitude = 0;
    this.props.userSearch(true);
    Keyboard.dismiss();

    try {
      const result = await fetch(textSearchURL);
      const json = await result.json();
      this.setState({
        latitude: json.results[0].geometry.location.lat,
        longitude: json.results[0].geometry.location.lng,
      })
      latitude = json.results[0].geometry.location.lat;
      longitude = json.results[0].geometry.location.lng;
    } catch(err) {
      console.log(err);
    }

    try {
      const nearbySearchURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=bar&keyword=bars&region=US&key=${API_KEY}`
      const result = await fetch(nearbySearchURL);
      const json = await result.json();
      
      if(json.status === 'ZERO_RESULTS') {
        alert('No results found, please search again')
      }
      else {
        this.map.animateToRegion({
          latitude: this.state.latitude, 
          longitude: this.state.longitude,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
        }, 1000)

        this.setState({
          nearbySearchResults: json.results
        })
      }
    } catch(err) {
      console.log(err);
    }
    this.props.onSubmitNearbySearch('');
  }

  render() {    
    const predictions = this.state.predictions.map(prediction => 
      <TouchableHighlight key={prediction.id} onPress={() => this.onSearchFindPlaceFromText(prediction.description)}>
        <Text style={styles.suggestions} key={prediction.id}>{prediction.description}</Text>
      </TouchableHighlight>
    )

    const interpolations = this.state.nearbySearchResults.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          customMapStyle={this.state.mapstyle}
          initialRegion={this.state.region}
          ref={map => {this.map = map}}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
     
          {
            this.state.nearbySearchResults.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity,
              }
              const latlng = {
                latitude: this.state.nearbySearchResults[index].geometry.location.lat,
                longitude: this.state.nearbySearchResults[index].geometry.location.lng,
              }
              return(
                  <MapView.Marker  key={index} coordinate={latlng}>
                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                      <Animated.View style={[styles.markerWrap, scaleStyle]}>
                        <View style={styles.marker} />
                      </Animated.View>
                    </Animated.View>
                  </MapView.Marker>
              )
            })
          }
          
        </MapView>
        {this.props.didUserSearch ? null : predictions}
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
            {
              this.state.nearbySearchResults.map((marker, index) => (
                <View style={{padding: 5}} key={index}>
                    <MapBar 
                      name={marker.name} 
                      rating={marker.rating}
                      price={marker.price_level}
                      id={marker.place_id}
                      photo={marker.photos ? marker.photos[0].photo_reference : null}
                    />
                </View>
              ))
            }
          
        </Animated.ScrollView> 
      </View>
    );
  }
}

const mapStateToProps = state => ({
  destination: state.searchReducer.destination,
  submitSearch: state.searchReducer.submitSearch,
  didUserSearch: state.searchReducer.didUserSearch,
})

const mapDispatchToProps = {
  onSubmitNearbySearch,
  userSearch,
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
    backgroundColor: '#302C9E',
    padding: 5,
    fontSize: 17,
    fontFamily: 'HkGrotesk_Light',
    color: 'white',
    borderWidth: 0.5,
  },
  scrollView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: Variables.deviceWidth - CARD_WIDTH,
  },
  textContent: {
    flex: 1,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)