/* 
    Playground.js
    
    Used to create BarMate features
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

import React, { Component } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Text,
  Dimensions,
  View,
  Platform,
  Picker
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import BarFlatlist from "../../components/AppTabs/YourBars/BarFlatlist/BarFlatlist";

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stub: {
        formattedAddress: '360 S Main St, Akron, OH 44301',
        name: 'Tear-EZ',
        place_id: 'ChIJy_SfNyTWMIgRXh1b740ZPDA',
        price_level: 1,
        rating: 4.5,
        photos: [{photo_reference: 'CmRaAAAA77swlJX8pAXp7GW4MAcNjN8Cdb_ilnQ_tvOZgnqdMN5vXw0yQ-XvrBGlzruU28F7TJOG5Xq7-52Mt6qc50AinCIfTnyiFT-fIjk-fZO0opBDrv3QQtPrFBOTfgU30GMIEhDFo_qIZsUiEjbJ_j6TeSGrGhRhSsi3qYt9_03fl2lQXm-BiHY58Q'}]
      }
    };
  }

  render() {
    return (
      <View style={styles.root}>
          <BarFlatlist />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAllowLocation: {
    width: wp('60%'),
    height: hp('5%'),
    backgroundColor: 'white',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 1 },
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('25%'),
    borderWidth: Platform.OS === "android" ? 0.5 : 0,
    borderColor: '#ebebeb',
  },
  textAllowLocation: {
    fontSize: wp('4%'),
    // fontFamily: 'HkGrotesk_Medium',
    color: '#302C9E'
  }
})

export default Playground;
