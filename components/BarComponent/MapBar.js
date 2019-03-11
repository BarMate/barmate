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
import API_KEY from '../../config/API_Key';
import _ from 'lodash'

/*
  Props:
    name : string 'The name of the selected marker from the map screen'
    rating : float 'The rating of the selected marker from the map screen'
    price : int 'The price estimate of the bar'
    id : string 'Place ID for business provided by Google'
    photo : string 'Reference to business photo'
*/

const CARD_HEIGHT = Variables.deviceHeight / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class MapBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailResults: {},
    }
  }

  _renderImage() {
    if(this.props.photo) {
      const imageApi = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.props.photo}&key=${API_KEY}`
      return(
        <Image 
          style={styles.backgroundImage}
          source={{uri: imageApi}}
        />
      )
    }
    else {
      return(
        <Image 
          style={styles.backgroundImage}
          source={require('../../assets/global/gradient.png')}
        />
      )
    }
  }

  async onGetDetailsRequest(place_id) {
    const detailsURL = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&fields=opening_hours&key=${API_KEY}`

    try {
      const results = await fetch(detailsURL);
      const json = await results.json();

      this.setState({
        detailResults: json,
      })

      console.log(`Detail results: ${JSON.stringify(this.state.detailResults)}`)

    } catch(err) { console.log('Could not reach Details API... ' + err)}
  }

  _renderHours() {
    try {
      this.onGetDetailsRequest(this.props.id);
    } catch(err) {console.log(`Could not get details to render hours: ${err}`)}

    if(this.state.detailResults != {}) {
      let date = new Date();
      let day = date.getDay();

      if(this.state.detailResults.opening_hours.weekday_text != null) {

        this.state.detailResults.opening_hours.weekday_text.forEach((result, index) => {

          if(result.includes(day)) {
            return(this.state.detailResults.opening_hours.weekday_text[index])
          }

        })
      }
    }
    else {
      return('Hours not available') 
    }
  }

  _renderPrice() {
    if(this.props.price)
    {
      price = this.props.price;
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
      return "N/A"
    }
  }

  _renderRating() {
    if(this.props.rating) {
      rating = this.props.rating;
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
    else {
      return(
        <Image
          style={styles.rating}
          source={require("../../assets/global/ratings/unknown.png")}
        />
      )
    }
  }

  _renderAddButton() {
    
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
            {this._renderAddButton()}
            <TouchableOpacity style={styles.isAddedButton}>
              <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.hoursContainer}>
            <Text style={styles.hours}>{/*this._renderHours()*/}</Text>
        </View>

        <View style={styles.nameContainer}>
            <Text numberOfLines={1} style={styles.name}>{this.props.name}</Text>
        </View>

        <View style={styles.otherContainer}>
            {this._renderRating()}
            <Text style={styles.price}> • {this._renderPrice()}</Text>
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
      flexDirection: 'row',
    },
    isAddedButton: {
      width: 45,
      height: 30,
      borderRadius: 9,
      backgroundColor: 'white',
      justifyContent: 'center',
    },
    hours: {
      fontSize: 10,
      fontFamily: 'HkGrotesk_Italic',
      color: '#ebebeb',
      paddingLeft: 10,
    },
    name: {
      fontSize: 18,
      fontFamily: 'HkGrotesk_Bold',
      color: 'white',
      paddingLeft: 10,
      flexWrap: 'wrap',
    },
    add: {
      fontFamily: 'HkGrotesk_Bold', 
      fontSize: 20, 
      color: '#302c9e',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    rating: {
      width: 55,
      height: 10,
      marginLeft: 10,
    },
    price: {
      fontSize: 10,
      fontFamily: 'HkGrotesk_Bold',
      color: 'white',
    },
});

export default withNavigation(MapBar);
