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
const API_KEY = 'AIzaSyCN-KItGpvTPEhIMd9oG2CS8XldyOuVMAc';
const CARD_HEIGHT = Variables.deviceHeight / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]
class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
      error: "",
      longitude: 0,
      latitude: 0,
      destination: '',
      predictions: [],
      search: [],
      didUserSearch: false,
      markers: [
        {
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          title: "Best Place",
          description: "This is the best place in Portland",
          image: Images[0],
        },
        {
          coordinate: {
            latitude: 45.524698,
            longitude: -122.6655507,
          },
          title: "Second Best Place",
          description: "This is the second best place in Portland",
          image: Images[1],
        },
        {
          coordinate: {
            latitude: 45.5230786,
            longitude: -122.6701034,
          },
          title: "Third Best Place",
          description: "This is the third best place in Portland",
          image: Images[2],
        },
        {
          coordinate: {
            latitude: 45.521016,
            longitude: -122.6561917,
          },
          title: "Fourth Best Place",
          description: "This is the fourth best place in Portland",
          image: Images[3],
        },
      ],
      mapstyle: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8ec3b9"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1a3646"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#64779e"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#4b6878"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#334e87"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6f9ba5"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3C7680"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#304a7d"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2c6675"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#255763"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#b0d5ce"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#023e58"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#98a5be"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1d2c4d"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#283d6a"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3a4762"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#0e1626"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#4e6d70"
            }
          ]
        }
      ],
      dataStub: [
      {
        geometry: {
          location: {
            lat: 41.072160,
            lng: -81.502920,
          }
        },
        name: 'Test Bar 1',
        place_id: 'ChIJi6C1MxquEmsR9-c-3O48ykI'
      },
      {
        geometry: {
          location: {
            lat: 41.072430,
            lng: -81.503050,
          }
        },
        name: 'Test Bar 2',
        place_id: 'ChIJi6C1MxquEmsR9-c-3O4834ykI'
      },
      {
        geometry: {
          location: {
            lat: 41.072240,
            lng: -81.503300,
          }
        },
        name: 'Test Bar 3',
        place_id: 'ChIJi6C1MxquEmsR9-c-3O428ykI'
      },

    ]
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
        this.map.animateToCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }, 1000)
      },
      error => this.setState({error: error.message}),
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 200000 }
    );

    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
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
              latitude: this.state.dataStub[index].geometry.location.lat,
              longitude: this.state.dataStub[index].geometry.location.lng,
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
    const apiURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${API_KEY}`
    this.props.userSearch(true);
    Keyboard.dismiss();
    try {
      const result = await fetch(apiURL);
      const json = await result.json();
      this.setState({
        search: json.candidates,
        // latitude: json.candidates[0].geometry.location.lat,
        // longitude: json.candidates[0].geometry.location.lng,
      })
      this.map.animateToRegion({
        latitude: json.candidates[0].geometry.location.lat, 
        longitude: json.candidates[0].geometry.location.lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }, 1000)
    } catch(err) {
      console.log(err);
    }
  }

  async onSearchNearby(query) {
    const textSearchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}}&key=${API_KEY}&radius=2000&type=bar`;
    let longitude = 0;
    let latitude = 0;
    this.props.userSearch(true);
    Keyboard.dismiss();

    try {
      const result = await fetch(textSearchURL);
      const json = await result.json();
      latitude = json.results[0].geometry.location.lat;
      longitude = json.results[0].geometry.location.lng;
    } catch(err) {
      console.log(err);
    }

    try {
      const nearbySearchURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=bar&keyword=bars&region=US&key=${API_KEY}`
      const result = await fetch(nearbySearchURL);
      const json = await result.json();
      
      this.map.animateToRegion({
        latitude: latitude, 
        longitude: longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }, 1000)
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

    const interpolations = this.state.markers.map((marker, index) => {
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
            this.state.dataStub.map((marker, index) => {
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
                latitude: this.state.dataStub[index].geometry.location.lat,
                longitude: this.state.dataStub[index].geometry.location.lng,
              }
              return(
                <MapView.Marker key={index} coordinate={latlng}>
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
              this.state.dataStub.map((marker, index) => (
                // <View style={styles.card} key={index}>
                //   <Image 
                //     source={marker.image}
                //     style={styles.cardImage}
                //     resizeMode="cover"
                //   />
                //   <View style={styles.textContent}>
                //     <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                //     <Text numberOfLines={1} style={styles.carddescription}>
                //       {marker.description}
                //     </Text>
                //   </View>
                // </View>
                <View style={{padding: 5}} key={index}>
                    <MapBar />
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
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: Variables.deviceWidth - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
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