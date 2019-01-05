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
      open = this.props.open;
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
      price = this.state.price;
    }
    else {
      price = this.props.price;
    }
    if(price)
    {
      if(price === 0) {
        return "$";
      }
      else if(price === 1) {
        return "$$";
      }
      else if(price === 2) {
        return "$$$";
      }
      else if(price === 3) {
        return "$$$$";
      }
      else if(price === 4) {
        return "$$$$$";
      }
    }
    else {
      console.log("No price found for bar.. returning unknown")
      return "N/A"
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

  _addBarToUserHome(barID) {
    
    let uid = firebase.auth().currentUser.uid;
    let bars = firebase.database().ref(`users/${uid}/bars/`);
    let barsDB = firebase.database().ref(`bars/`);
    let newChildRef = bars.push();

    bars.once("value", (snapshot) => {
      snapshot.forEach((child) => {
        // Does the user have bar key reference inside bars branch of db?
        // Child.val() = Bar Key reference
        // If the bar we are trying to add is the current looked at bar in db
        console.log(`BarID: ${barID}`)
        console.log(`child.val(): ${child.val()}`)

        if(barID == child.val()) { 
          console.log(`The Bar you are trying to add has already been added!`)
        }
        else {
          console.log('Bar does not match key in database... going to next value...')
        }
      })
    })
      // Insert currently selected bars key into the users bar list
      //firebase.database().ref(`users/${uid}/bars/${newChildRef.key}`).set(barID)
    
  }

  render() {
    return (
      <View style={styles.content}>
        <LinearGradient
          style={styles.gradient}
          colors={[COLORS.TRANSPARENT_COLOR, "rgba(0, 0, 0, 0.5)"]}>
          <View>
            <Text style={styles.title}>{this.props.name ? this.props.name : 'Undefined'}</Text>
          </View>
          <View style={styles.footerText}>
            <Text style={styles.rating}>{this._renderRating()}</Text>
            <Text style={styles.price}> • {this._renderPrice()} • </Text>
            <Text style={styles.open}>{this._renderOpen()}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    width: Variables.deviceWidth - 50,
    height: 450,
    borderRadius: 25,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  content: {
    marginTop: 75,
    marginBottom: 50,
    width: Variables.deviceWidth - 50,
    height: 450,
    borderRadius: 25,
    backgroundColor: COLORS.GRADIENT_COLOR_1
  },
  title: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'HkGrotesk_Bold',
    marginLeft: 15,
  },
  rating: {
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 16,
    color: 'white',
    fontFamily: 'HkGrotesk_Light',
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
  }  
});

export default withNavigation(Bar);
