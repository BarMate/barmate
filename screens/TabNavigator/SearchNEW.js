import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback
} from "react-native";

import MapView, { Marker, Circle, AnimatedRegion } from "react-native-maps";
import Variables from "../../config/Variables.js";
import { Constants, Location, Permissions } from "expo";
import { Ionicons } from "@expo/vector-icons";
import Bar from "../../components/Bar.js";
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Icon,
  StyleProvider,
  Text,
  Button
} from "native-base";
import getTheme from "../../native-base-theme/components/index.js";
import Common from "../../native-base-theme/variables/commonColor.js";
import firebase from "../../config/Firebase.js";

console.disableYellowBox = true;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 36.778259,
        longitude: -119.417931,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      circleLatLng: {
        latitude: 36.778259,
        longitude: -119.417931
      },
      selectedMarker: {
        name: "initial",
        open: null,
        rating: "initial",
        price: 1,
        description: "initial",
        key: "initial"
      },

      locationResult: null,
      barMarkers: [],
      clubMarkers: [],
      modalVisible: false
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) =>
      focused ? (
        <Ionicons name={"ios-search"} size={25} color={"#FFFFFF"} />
      ) : (
        <Ionicons name={"ios-search"} size={25} color={"#536497"} />
      ),
    tabBarPosition: "bottom",
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "white",
      inactiveTintColor: "#536497",
      style: {
        backgroundColor: "#100D64"
      }
    },
    animationEnabled: false,
    swipeEnabled: false
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      console.log("Permission granted for LOCATION");
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(prevState => ({
          region: {
            ...prevState.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          },
          circleLatLng: {
            ...prevState.circleLatLng,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }));
        this._fetchMarkerData();
      });
    } else {
      this.setState({
        locationResult: "Permission denied for location access"
      });
    }
  };

  _fetchMarkerData() {
    API_KEY = "AIzaSyCskpsQ0KdNBrxUaxDcp57PndW6xMRHOWY";

    //=============================================================
    // Creates a URL from users current position for local bars
    // and local clubs
    //=============================================================
    navigator.geolocation.getCurrentPosition(
      position => {
        const barUrl =
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          position.coords.latitude +
          "," +
          position.coords.longitude +
          "&radius=5000&types=bar&key=" +
          API_KEY;
        const clubUrl =
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          position.coords.latitude +
          "," +
          position.coords.longitude +
          "&radius=5000&types=night_club&key=" +
          API_KEY;
        //=============================================================

        //=============================================================
        // Create an array to hold markers to be rendered
        //=============================================================
        var markersC = [];
        var markersB = [];
        //=============================================================

        //=============================================================
        // Find clubs at current location and push onto array
        //=============================================================
        fetch(clubUrl)
          .then(data => data.json())
          .then(res => {
            for (var i = 0; i < res.results.length; i++) {
              var instance = res.results[i];
              //may have to change description
              markersC.push({
                name: instance.name,
                coordinate: {
                  latitude: instance.geometry.location.lat,
                  longitude: instance.geometry.location.lng
                },
                description: "club " + i,
                price: "price_level" in instance ? instance.price_level : 0,
                open:
                  "opening_hours" in instance
                    ? instance.opening_hours.open_now
                      ? "Open"
                      : "Closed"
                    : "N/A",
                rating: "rating" in instance ? instance.rating : 0,
                key: "place_id" in instance ? instance.place_id : null,
                photos: instance.photos
              });
            }
            this.setState({
              clubMarkers: markersC
            })
              //causes warning to debugger but prevents android timer error
              .catch(error => {
                console.error(error);
              });
          });
        //=============================================================

        //=============================================================
        // Find bars at current location and push onto array
        //=============================================================
        fetch(barUrl)
          .then(data => data.json())
          .then(res => {
            for (var i = 0; i < res.results.length; i++) {
              var instance = res.results[i];
              //will not add a bar marker if it's already added as a club
              if (markersB.indexOf(instance.place_id) <= -1) {
                markersB.push({
                  name: instance.name,
                  coordinate: {
                    latitude: instance.geometry.location.lat,
                    longitude: instance.geometry.location.lng
                  },
                  description: "bar " + i,
                  price: "price_level" in instance ? instance.price_level : 0,
                  open:
                    "opening_hours" in instance
                      ? instance.opening_hours.open_now
                        ? "Open"
                        : "Closed"
                      : "N/A",
                  rating: "rating" in instance ? instance.rating : 0,
                  key: "place_id" in instance ? instance.place_id : null,
                  photos: "photos" in instance ? instance.photos : null
                });
              }
            }
            this.setState({
              ...this.state,
              barMarkers: markersB
            })
              //causes warning to debugger but prevents android timer error
              .catch(error => {
                console.error(error);
              });
          });
      },
      error => this.setState({ ...this.state, error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }


  _handleMapRegionChange = region => {
    console.log("new region: " + JSON.stringify(region))
    this.setState({ region });
    this.fetchMarkerData().then(() => {this.forceUpdate();})
    
  };

  render() {
    return (
      <StyleProvider style={getTheme(Common)}>
        <Container>
          <Header>
            <Left />
            <Body>
              <Title>Search</Title>
            </Body>
            <Right />
          </Header>

          <Content>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              backdropOpacity={0.5}>
              <SafeAreaView style={styles.modal}>
                <TouchableOpacity
                  style={{width: Variables.deviceWidth, height: Variables.deviceHeight}}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}/>
                <Bar
                  isMapComponent={true}
                  name={this.state.selectedMarker.name}
                  rating={this.state.selectedMarker.rating}
                  open={this.state.selectedMarker.open}
                  barID={this.state.selectedMarker}/>
              </SafeAreaView>
            </Modal>
            <View style={styles.container}>
              <MapView
                style={styles.map}
                region={this.state.region}
                showsUserLocation={true}
>           
                <MapView.Circle
                  center={this.state.circleLatLng}
                  radius={5000}
                  fillColor={"rgba(66, 19, 123, 0.1)"}
                  strokeColor={"rgba(48, 44, 158, 0.3)"}/>

                {this.state.barMarkers.map(markers => (
                  <Marker
                    key={markers.key}
                    coordinate={{
                      latitude: markers.coordinate.latitude,
                      longitude: markers.coordinate.longitude
                    }}
                    onPress={() => {
                      this.setState({
                        ...this.state.selectedMarker,
                        selectedMarker: {
                          name: markers.name,
                          open: markers.open,
                          rating: markers.rating,
                          price: markers.price,
                          description: markers.description,
                          key: markers.key
                        },
                        modalVisible: true
                      });
                    }}>
                    <View>
                      <Icon
                        name="md-pin"
                        style={{ color: "#030e2c", fontSize: 40 }}/>
                    </View>
                  </Marker>
                ))}

                {this.state.clubMarkers.map(markers => (
                  <Marker
                    key={markers.key}
                    coordinate={{
                      latitude: markers.coordinate.latitude,
                      longitude: markers.coordinate.longitude
                    }}
                    title={markers.name}
                    description={markers.description}
                    onPress={() => {
                      this.setState({
                        ...this.state.selectedMarker,
                        selectedMarker: {
                          name: markers.name,
                          open: markers.open,
                          rating: markers.rating,
                          price: markers.price,
                          description: markers.description,
                          key: markers.key
                        },
                        modalVisible: true
                      });
                    }}>
                    <View>
                      <Icon
                        name="md-pin"
                        style={{ color: "#1c2e63", fontSize: 40 }}/>
                    </View>
                  </Marker>
                ))}
              </MapView>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Variables.deviceWidth,
    height: Variables.deviceHeight
  },
  map: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
