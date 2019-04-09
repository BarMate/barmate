/* 
    HomeBar.js
    
    The component for holding data on user's saved bars
    including styling, name of bar, if it's open, etc..
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/


import React from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, Alert } from "react-native";

import firebase from '../../config/Firebase';
import { LinearGradient } from "expo";
import { withNavigation } from 'react-navigation';
import { pushSelectedBarData, refreshList } from '../../redux/actions/HomeActions';
import { connect } from 'react-redux';

import Variables from "../../config/Variables.js";
import COLORS from "../../config/Colors.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import API_KEY from '../../config/API_Key'
/*
  Props:
    id : string 'Used for the unique key for each bar component'
    name : string 'The name of the selected marker from the map screen'
    rating : Float 'The rating of the selected marker from the map screen'
    open : string 'Either 'Closed', 'Open', or 'N/A' '
    price : Int
    photo : string 'Photo reference for bar'
*/

const CARD_HEIGHT = Variables.deviceHeight / 1.5;
const CARD_WIDTH = Variables.deviceWidth - 50;

class Bar extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderOpen() {
    let open = this.props.open;
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

  _renderImage() {
    if(this.props.photo !== null) {
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
          source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=CmRaAAAA3sk1cGBA_FacwW2xOUSEcCYFfCtWHmeV3eW6-eDrO85P6-QQ7moJXXOG51PieHp8-kHBlE8ye6VkWGKXw3FqmjfyuULmMEzzEG5k7gyX5seaKn-A6Z2dMejYHdXcdl3NEhBps-zJMGicdLYlI9SZZQBAGhSRHtI05rmDZwX_ZW_sdwEyPmdxkw&key=AIzaSyCN-KItGpvTPEhIMd9oG2CS8XldyOuVMAc'}}
        />
      )
    }
  }

  _renderPrice() {
    let price = this.props.price;
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

  _renderRating() {
    let rating = this.props.rating;
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

  _sendDataToStoreAndOpen() {
    // When the user taps a bar, send the tapped bar data
    // To the store so we can use it on the next screen in the
    // stack navigator, then navigate to the next screen
    let tempObject = {
      name: this.props.name,
      id: this.props.id,
      rating: this.props.rating,
      open: this.props.open,
      price: this.props.price,
      photo: this.props.photo,
    }
    this.props.pushSelectedBarData(tempObject);
    this.props.navigation.navigate('BarDetails');
  }

  _deleteBarPrompt() {
    // When user long presses on a bar, they can choose
    // if they want to remove it from their list and db.
    Alert.alert(
      'Delete Bar?',
      'Would you like to remove this bar from your list?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancelled')},
        {text: 'Yes', onPress: () => this._deleteBar()},
      ],
      { cancelable: true }
    )
  }

  _deleteBar() {
    let uid = firebase.auth().currentUser.uid;
    let userBars = firebase.database().ref(`users/${uid}/bars`)

    userBars.once('value', snapshot => {
      snapshot.forEach(child => {
        if(child.val() === this.props.id)
        {
          userBars.child(`${child.key}`).remove();
        }
      })
    })
  }

  render() {
    return (
      <TouchableHighlight style={{borderRadius: 25}} onPress={() => {this._sendDataToStoreAndOpen()}}>
        <View style={styles.rootContainer}>
            {this._renderImage()}
              <LinearGradient
                style={styles.gradient}
                colors={[COLORS.TRANSPARENT_COLOR, "rgba(66, 19, 123, 0.8)"]}>
                  <View style={styles.openContainer}>
                      {/* {this._renderOpen()} */}
                  </View>
                  <View style={styles.nameContainer}>
                      <Text numberOfLines={2}  style={styles.name}>{this.props.name}</Text>
                      <Ionicons style={styles.arrow} name={'ios-arrow-dropright-circle'} size={40} color={'#ffffff'}/>
                  </View>
              </LinearGradient>
        </View>
      </TouchableHighlight>
    );
  }
}

// Dispatch data to store
const mapDispatchToProps = {
  pushSelectedBarData,
  refreshList,
}

const styles = StyleSheet.create({
  gradient: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 25,
  },
  rootContainer: {
    backgroundColor: "#42137b",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 25,
    shadowOpacity: 1.0,
    shadowRadius: 10,
    shadowColor: 'black',
  },
  backgroundImage: {
    borderRadius: 25,
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  openContainer: {
    flex: 5,
    justifyContent: 'flex-end',
    marginLeft: 15,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'HkGrotesk_Bold',
    marginLeft: 15,
    flexWrap: 'wrap',
  },
  rating: {
    marginBottom: 20,
    marginLeft: 16,
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
  arrow: {
    marginLeft: 'auto',
    paddingRight: 15,
  },
});

export default connect(null, mapDispatchToProps)(withNavigation(Bar));
