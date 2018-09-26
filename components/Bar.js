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
import Variables from '../config/Variables.js';
import COLORS from '../config/Colors.js';
//=============================================================


//=============================================================
// Imports
//=============================================================
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { LinearGradient } from 'expo';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Body } from 'native-base'
//=============================================================

class Bar extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        opened: false,
        joinable: false,
        isFontReady: false,
      }
    }

    componentDidMount() {
      Expo.Font.loadAsync({
          'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({isFontReady:true})
    }


    render(){
      if (!this.state.isFontReady) {
        return <Expo.AppLoading />;
      }
      return(
          <View style={styles.content}>
            <LinearGradient style={styles.gradient} colors={['rgba(0, 0, 0, 0.5)', COLORS.TRANSPARENT_COLOR]}>

              <Grid style={{width: Variables.deviceWidth - 50, height: 450,}}>

                <Row style={{backgroundColor: COLORS.TRANSPARENT_COLOR}} size={16}>
                    <Body>
                      <Text style={{color: 'white', fontSize: 20}}>Mannys Bar</Text>
                    </Body>
                </Row>


                <Row style={{backgroundColor: COLORS.TRANSPARENT_COLOR}} size={68}>
        
                </Row>


                <Row style={{backgroundColor: COLORS.TRANSPARENT_COLOR}} size={16}>

                </Row>

              </Grid>

            </LinearGradient>
          </View>
      )
    }
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (Variables.deviceHeight / 2) - (310),
    borderRadius: 15,
    width: Variables.deviceWidth - 50,
    height: 450,
    zIndex: 2,
  },
  content: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (Variables.deviceHeight / 2) - (310),
    width: Variables.deviceWidth - 50,
    height: 450,
    borderRadius: 15,
    backgroundColor: "#f3d",
  },
})

export default Bar;