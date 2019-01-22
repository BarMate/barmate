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
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";

import firebase from '../../config/Firebase';
import { LinearGradient } from "expo";
import { withNavigation } from 'react-navigation';
import { pushSelectedBarData, refreshList } from '../../redux/actions/HomeActions';
import { connect } from 'react-redux';
//=============================================================

/*
  Props:
    key : string 'Used for the unique key for each bar component'
    name : string 'The name of the selected marker from the map screen'
    rating : Float 'The rating of the selected marker from the map screen'
    open : string 'Either 'Closed', 'Open', or 'N/A' '
    price : Int
*/

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
      <TouchableOpacity onPress={() => {this._sendDataToStoreAndOpen()}} onLongPress={() => {this._deleteBarPrompt()}}>
      <View style={styles.content}>
        <LinearGradient
          style={styles.gradient}
          colors={[COLORS.TRANSPARENT_COLOR, "rgba(0, 0, 0, 0.5)"]}>
          <View>
            <Text style={styles.title}>{this.props.name ? this.props.name : 'Loading...'}</Text>
          </View>
          <View style={styles.footerText}>
            <Text style={styles.rating}>{this._renderRating()}</Text>
            <Text style={styles.price}> • {this._renderPrice()} • </Text>
            <Text style={styles.open}>{this._renderOpen()}</Text>
          </View>
        </LinearGradient>
      </View>
      </TouchableOpacity>
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
  image: {
    position: 'absolute',
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'HkGrotesk_Bold',
    marginLeft: 15,
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
  footerText: {
    flexDirection: 'row',
    alignItems: 'center',
  }  
});

export default connect(null, mapDispatchToProps)(withNavigation(Bar));
