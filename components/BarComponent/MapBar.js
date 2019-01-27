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
import Variables from "../../config/Variables.js";
import COLORS from "../../config/Colors.js";
//=============================================================

//=============================================================
// Imports
//=============================================================
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Body, Button } from "native-base";
import firebase from "../../config/Firebase.js";
import { withNavigation } from 'react-navigation';
//=============================================================

/*
  Props:
    isMapComponent : bool 'Determine if the component belongs on the map screen
    barID : object 'All the given data from a bar inside an object'
    name : string 'The name of the selected marker from the map screen'
    rating : string 'The rating of the selected marker from the map screen'
    open : string 'Either 'Closed', 'Open', or 'N/A' '
    price
*/

class Bar extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderOpen() {
    let open = undefined;
    if(this.props.isMapComponent) {
      open = this.props.barID.open;
    }
    else {
      open = this.state.open;
    }

    if (open === "Open") {
      return <Text style={{color: 'green'}}>Open</Text>
    } else if (open === "Closed") {
      return <Text style={{color: 'red'}}>Closed</Text>
    } else if (open === "N/A") {
      return <Text style={{color: 'yellow'}}>N/A</Text>
    } else {
      return <Text style={{color: 'yellow'}}>N/A</Text>
      console.log("Could not gather open information");
    }
  }

  _renderPrice() {
    let price = undefined;
    if(this.props.isMapComponent) {
      price = this.props.barID.price;
    }
    else {
      price = this.state.price;
    }
    if(price)
    {
      if(price === 0) {
        return " • $ • ";
      }
      else if(price === 1) {
        return " • $$ • ";
      }
      else if(price === 2) {
        return " • $$$ • ";
      }
      else if(price === 3) {
        return " • $$$$ • ";
      }
      else if(price === 4) {
        return " • $$$$$ • ";
      }
    }
    else {
      console.log("No price found for bar.. returning unknown")
      return " • N/A • "
    }
  }

  _renderRating() {
    let rating = undefined;
    if(this.props.isMapComponent) {
      rating = this.props.barID.rating;
    }
    else {
      rating = this.state.rating;
    }

    if (rating <= 0.4) {
      return (
        <Image
          style={styles.rating}
          source={require("../../assets/global/ratings/0star.png")}
        />
      );
    } else if (rating >= 0.5 && rating <= 1.4) {
      return (
        <Image
          style={styles.rating}
          source={require("../../assets/global/ratings/1star.png")}
        />
      );
    } else if (rating >= 1.5 && rating <= 2.4) {
      return (
        <Image
          style={styles.rating}
          source={require("../../assets/global/ratings/2star.png")}
        />
      );
    } else if (rating >= 2.5 && rating <= 3.4) {
      return (
        <Image
          style={styles.rating}
          source={require("../../assets/global/ratings/3star.png")}
        />
      );
    } else if (rating >= 3.5 && rating <= 4.4) {
      return (
        <Image
          style={styles.rating}
          source={require("../../assets/global/ratings/4star.png")}
        />
      );
    } else if (rating >= 4.5 && rating <= 5) {
      return (
        <Image
          style={styles.rating}
          source={require("../../assets/global/ratings/5star.png")}
        />
      );
    } else {
      return (
        <Image
          style={styles.rating}
          source={require("../../assets/global/ratings/unknown.png")}
        />
      );
    }
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

  // WORK IN PROGRESS - FIXING ISSUE WHERE DUPLICATES CAN BE SENT
  _addBarToUserHome = async barID => {
    let key = barID.key;
    let userID = firebase.auth().currentUser.uid;
    let barList = firebase.database().ref(`bars/`); 
    let newBarChildRef = barList.push();
    //deletes the barID's key so it isn't stored inside an object with the same key
    var barData = barID;
    delete barData.key;

    if (userID) {
      firebase 
      .database()
      .ref('bars/')
      .once("value", snapshot =>{
        if(!snapshot.hasChild(key)){
          console.log("Data is undefined, adding bar to database...");
            firebase
              .database()
              .ref(`bars/${key}`)
              .update(barData);
          } else {
            console.log("Data has been found in database, continuing...");
          }
        })
        .catch(error => {
          console.log("error: ", error);
        });

      firebase 
      .database()
      .ref(`users/${userID}/bars`)
      .orderByValue()
      .equalTo(key)
      .once("value", snapshot =>{
        if(!snapshot.exists()){
          console.log("User does not have bar in their home, continue adding bar...");
            firebase
              .database()
              .ref(`users/${userID}/bars/`)
              .push(key);
          } else {
            console.log("Data is already in users home! cannot add twice!");
          }
        })
        .catch(error => {
          console.log("error: ", error);
        });
    }
  }
  
    


  render() {
    return (
      <View style={styles.content}>
        <LinearGradient
          style={styles.gradient}
          colors={[COLORS.TRANSPARENT_COLOR, "rgba(0, 0, 0, 0.5)"]}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{this.props.barID.name ? this.props.barID.name : 'Undefined'}</Text>
          </View>
          <View style={styles.footerText}>
            <View style={styles.rating}>{this._renderRating()}</View>
            <Text style={styles.price}>{this._renderPrice()}</Text>
            <View style={styles.open}>{this._renderOpen()}</View>
          </View>
          <View>
            <Text style={styles.open}>{this._renderMapButton()}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.TRANSPARENT_COLOR,
    justifyContent: "center",
    alignItems: "center",
    width: Variables.deviceWidth - 50
  },
  gradient: {
    width: Variables.deviceWidth - 50,
    height: 500,
    borderRadius: 25,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  content: {
    width: Variables.deviceWidth - 50,
    height: 500,
    borderRadius: 25,
    backgroundColor: COLORS.GRADIENT_COLOR_1
  },
  contentContainer: {
    marginLeft: 15,
  },
  title: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'HkGrotesk_Bold',
  },
  rating: {
    marginBottom: 20,
    width: 110,
    height: 20,
  },
  open: {
    fontSize: 20,
    marginBottom: 20,
    color: 'green',
    fontFamily: 'HkGrotesk_LightItalic', 
  },
  price: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'HkGrotesk_Light',
  },
  footerText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  }  
});

export default withNavigation(Bar);
