//=============================================================
// Bar.js
//
// The component for holding data on user's saved bars
// including styling, name of bar, if it's open, etc..
//
// Author: Joseph Contumelio
// Copyright(C) 2018, Barmate l.l.c.
// All rights reserved.
//=============================================================

//=============================================================
// Variables and Constants
//=============================================================
import Variables from "../config/Variables.js";
import COLORS from "../config/Colors.js";
//=============================================================

//=============================================================
// Imports
//=============================================================
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Body, Button } from "native-base";
import firebase from "../config/Firebase.js";
import { withNavigation } from 'react-navigation';
//=============================================================

/*
  Props:
    isMapComponent : bool 'Determine if the component belongs on the map screen
    barID : object 'All the given data from a bar inside an object'
    name : string 'The name of the selected marker from the map screen'
    rating : string 'The rating of the selected marker from the map screen'
    open : string 'Either 'Closed', 'Open', or 'N/A' '
    source : object 'Holds data for bar from user personal homescreen
*/

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      key: this.props.isMapComponent ? null : this.props.key,
      name: this.props.isMapComponent ? null : this.props.source.name,
      rating: this.props.isMapComponent ? null : this.props.source.rating,
      open: this.props.isMapComponent ? null : this.props.source.open,
    }
  }

  componentDidMount() {
    //TODO: figure out how to get dynamic prop naming. i.e. make this.props.(iteration)
    this.dataForCarousel();
  }


  dataForCarousel() {
    let uid = firebase.auth().currentUser.uid;
    let bars = firebase.database().ref(`users/${uid}/bars/`);
    bars.once("value", snapshot => {
      this.setState({length: snapshot.numChildren()})
    })
  }

  _renderMapButton() {
    let barID = this.props.barID;
    if (this.props.isMapComponent) {
      return (
        <Button
          style={styles.button}
          onPress={() => {
            this._addBarToUserHome(barID);
            alert('Bar added to HomeScreen!');
          }}>
          <Text style={{ fontSize: 25, color: "white" }}>Add to Home</Text>
        </Button>
      );
    }
  }

  _renderOpen() {
    let open = undefined;
    if(this.props.isMapComponent) {
      open = this.props.open;
    }
    else {
      open = this.state.open;
    }

    if (open === "Open") {
      return (
        <Image
          style={styles.image}
          source={require("../assets/global/open.png")}
        />
      );
    } else if (open === "Closed") {
      return (
        <Image
          style={styles.image}
          source={require("../assets/global/closed.png")}
        />
      );
    } else if (open === "N/A") {
      return (
        <Image
          style={styles.image}
          source={require("../assets/global/na.png")}
        />
      );
    } else {
      console.log("Could not gather open information");
    }
  }

  _renderRating() {
    let rating = undefined;
    if(this.props.isMapComponent) {
      rating = this.props.rating;
    }
    else {
      rating = this.state.rating;
    }

    if (rating <= 0.4) {
      return (
        <Image
          style={styles.rating}
          source={require("../assets/global/ratings/0star.png")}
        />
      );
    } else if (rating >= 0.5 && rating <= 1.4) {
      return (
        <Image
          style={styles.rating}
          source={require("../assets/global/ratings/1star.png")}
        />
      );
    } else if (rating >= 1.5 && rating <= 2.4) {
      return (
        <Image
          style={styles.rating}
          source={require("../assets/global/ratings/2star.png")}
        />
      );
    } else if (rating >= 2.5 && rating <= 3.4) {
      return (
        <Image
          style={styles.rating}
          source={require("../assets/global/ratings/3star.png")}
        />
      );
    } else if (rating >= 3.5 && rating <= 4.4) {
      return (
        <Image
          style={styles.rating}
          source={require("../assets/global/ratings/4star.png")}
        />
      );
    } else if (rating >= 4.5 && rating <= 5) {
      return (
        <Image
          style={styles.rating}
          source={require("../assets/global/ratings/5star.png")}
        />
      );
    } else {
      return (
        <Image
          style={styles.rating}
          source={require("../assets/global/ratings/unknown.png")}
        />
      );
    }
  }

  _addBarToUserHome = async barID => {
    let key = barID.key;
    let userID = firebase.auth().currentUser.uid;
    let bars = firebase.database().ref(`users/${userID}/bars/`);    
    let newChildRef = bars.push();
    let length = 0;

    if (userID) {

      bars.once("value", (snapshot) => {
        length = snapshot.numChildren()
      })

      //Adding bar from map to database
      firebase
        .database()
        .ref(`bars/${newChildRef.key}`)
        .once("value", function(snapshot) {
        })
        .then(data => {
          if (data.val() === null) {
            console.log("Data is undefined, adding bar to database...");
            firebase
              .database()
              .ref(`bars/${newChildRef.key}`)
              .update(barID);
          } else {
            console.log("Data has been found in database, continuing...");
          }
        })
        .catch(error => {
          console.log("error: ", error);
        });

      //Adding the bar to users home
      firebase
        .database()
        .ref(`users/${userID}/bars/${newChildRef.key}`)
        .once("value", function(snapshot) {
          
        })
        .then(data => {
          if (data.val() === null) {
            console.log(
              "User does not have bar in their home, continue adding bar..."
            );
            firebase
              .database()
              .ref(`users/${userID}/bars/${newChildRef.key}`)
              .set(barID);
          } else {
            console.log("Data is already in users home! cannot add twice!");
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  };

  render() {
    return (
      <View style={styles.content}>
        
        <LinearGradient
          style={styles.gradient}
          colors={["rgba(0, 0, 0, 0.5)", COLORS.TRANSPARENT_COLOR]}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('PLobby')}}>
          <Grid style={{ width: Variables.deviceWidth - 50, height: 450 }}>
            <Row
              style={{ backgroundColor: COLORS.TRANSPARENT_COLOR }}
              size={16}>
              <Body>
                <Text style={{ color: "white", fontSize: 20, marginLeft: 50 }}>
                  {this.props.isMapComponent ? this.props.name : this.state.name}
                </Text>
              </Body>
              {this._renderOpen()}
            </Row>

            <Row
              style={{ backgroundColor: COLORS.TRANSPARENT_COLOR }}
              size={68}>
              {this._renderRating()}
            </Row>

            <Row
              style={{ backgroundColor: COLORS.TRANSPARENT_COLOR }}
              size={16}>
              {this._renderMapButton()}
            </Row>
          </Grid>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    marginTop: 25,
    marginRight: 20,
    width: 25,
    height: 25
  },
  button: {
    backgroundColor: COLORS.TRANSPARENT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    width: Variables.deviceWidth - 50
  },
  gradient: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Variables.deviceHeight / 2 - 310,
    borderRadius: 15,
    width: Variables.deviceWidth - 50,
    height: 450,
    zIndex: 2
  },
  content: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Variables.deviceHeight / 2 - 310,
    width: Variables.deviceWidth - 50,
    height: 450,
    borderRadius: 15,
    backgroundColor: COLORS.GRADIENT_COLOR_1
  },
  rating: {
    marginLeft: 135,
    width: 60,
    height: 10,
  }
});

export default withNavigation(Bar);
