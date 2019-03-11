/* 
    MapBar.js
    
    The component to show the user bars on the map screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

import Variables from "../../config/Variables.js";
import COLORS from "../../config/Colors.js";

import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Body, Button } from "native-base";
import firebase from "../../config/Firebase.js";
import { withNavigation } from 'react-navigation';

/*
  Props:
    name : string 'The name of the selected marker from the map screen'
    rating : float 'The rating of the selected marker from the map screen'
    price_level : int 'The price estimate of the bar'
    onHomeScreen : bool 'True if the bar is on the user's homescreen'
    opening_hours: Object 'Contains information on bar hours'

*/

const CARD_HEIGHT = Variables.deviceHeight / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class MapBar extends React.Component {
  constructor(props) {
    super(props);
  }

   _renderImage() {
    const imageApi = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA3sk1cGBA_FacwW2xOUSEcCYFfCtWHmeV3eW6-eDrO85P6-QQ7moJXXOG51PieHp8-kHBlE8ye6VkWGKXw3FqmjfyuULmMEzzEG5k7gyX5seaKn-A6Z2dMejYHdXcdl3NEhBps-zJMGicdLYlI9SZZQBAGhSRHtI05rmDZwX_ZW_sdwEyPmdxkw&key=AIzaSyCN-KItGpvTPEhIMd9oG2CS8XldyOuVMAc`
    return(
      <Image 
        style={styles.backgroundImage}
        source={{uri: imageApi}}
      />
    )
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

  render() {
    return (
      <View style={styles.rootContainer}>
        {this._renderImage()}
        <LinearGradient
          style={styles.gradient}
          colors={[COLORS.TRANSPARENT_COLOR, "rgba(66, 19, 123, 0.8)"]}
        >
        <View style={styles.isAddedButtonContainer}>
            <TouchableOpacity style={styles.isAddedButton}>
              <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.hoursContainer}>
            <Text style={styles.hours}>Today: 7:00AM - 9:00PM</Text>
        </View>

        <View style={styles.nameContainer}>
            <Text style={styles.name}>Manny's Bar</Text>
        </View>

        <View style={styles.otherContainer}>
            <Text style={styles.other}>XXXXX • $$$</Text>
        </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    rootContainer: {
      justifyContent: 'flex-end',
      backgroundColor: "#42137b",
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      borderRadius: 25,
    },
    gradient: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: 25,
    },
    backgroundImage: {
      borderRadius: 25,
      position: 'absolute',
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
    },
    isAddedButtonContainer: {
      flex: 1, 
      alignItems: 'flex-end',
      padding: 12,
    },
    hoursContainer: {
      flex: 0.3,
      justifyContent: 'flex-end'
    },
    nameContainer: {
      flex: 0.3,
      justifyContent: 'flex-end'
    },
    otherContainer: {
      flex: 0.3,
    },
    isAddedButton: {
      width: 50,
      height: 40,
      borderRadius: 9,
      backgroundColor: 'white',
      justifyContent: 'center',
    },
    hours: {
      fontSize: 10,
      fontFamily: 'HkGrotesk_Regular',
      color: 'white',
      paddingLeft: 10,
    },
    name: {
      fontSize: 18,
      fontFamily: 'HkGrotesk_Bold',
      color: 'white',
      paddingLeft: 10,
    },
    other: {
      fontSize: 15,
      fontFamily: 'HkGrotesk_Bold',
      color: 'white',
      paddingLeft: 10,
    },
    add: {
      fontFamily: 'HkGrotesk_Bold', 
      fontSize: 20, 
      color: '#302c9e',
      alignSelf: 'center',
      justifyContent: 'center',
    }
});

export default withNavigation(MapBar);
