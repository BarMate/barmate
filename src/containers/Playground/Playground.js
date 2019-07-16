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
  Picker,
  ScrollView,
  SafeAreaView
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import BarFlatlist from "../../components/AppTabs/YourBars/BarFlatlist/BarFlatlist";
import { Ionicons } from "@expo/vector-icons";

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barStub: {
        formattedAddress: '360 S Main St, Akron, OH 44301',
        name: 'Tear-EZ',
        place_id: 'ChIJy_SfNyTWMIgRXh1b740ZPDA',
        price_level: 1,
        rating: 4.5,
        photos: [{photo_reference: 'CmRaAAAA77swlJX8pAXp7GW4MAcNjN8Cdb_ilnQ_tvOZgnqdMN5vXw0yQ-XvrBGlzruU28F7TJOG5Xq7-52Mt6qc50AinCIfTnyiFT-fIjk-fZO0opBDrv3QQtPrFBOTfgU30GMIEhDFo_qIZsUiEjbJ_j6TeSGrGhRhSsi3qYt9_03fl2lQXm-BiHY58Q'}]
      },
      profileStub: {
        age: [23, 2, 1998],
        bars: [{test: "Chidlfsdfsfsdfsd"}],
        bio: "BarMate CTO",
        friends: [{"dfewsfsd": "903j2fjdslfjds"}],
        gender: "Male",
        handle: "joeGainz",
        interest: "Female",
        karma: 6342,
        name: "Joe Contumelio",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/barmate-e95b6.appspot.com/o/users%2FdaTEWcFLY5OSYHCcFbFdKKxpf0D3%2Fprofile-picture?alt=media&token=80c8b9ca-5ee8-4ee9-a4e5-75d17329e3c7",
      },
    };
  }

  render() {
    return (
      <View style={styles.root}>
          <View style={styles.testHeader}>
              <Ionicons name={"ios-radio-button-on"} size={50} color={'white'} />
              <Text style={styles.profiletext}>Profile</Text>
          </View>
          <ScrollView contentContainerStyle={styles.profileCard}>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
              <Text style={styles.test}>TEST</Text>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#302C9E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    width: wp('90%'),
    backgroundColor: 'white',
    borderTopLeftRadius: wp('4%'),
    borderTopRightRadius: wp('4%'),

  },
  testHeader: {
    height: hp('20%'),
    width: wp('100%'),
    backgroundColor: 'rgba(0,0,0,0.0)',
    justifyContent: 'center',
    paddingLeft: wp('5%'),
  },
  test: {
    fontSize: 50,
    color: 'black',
  },
  profiletext: {
    fontSize: 50,
    color: 'white',
  },
})

export default Playground;
