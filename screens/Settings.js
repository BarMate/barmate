import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { toggleSettings } from '../redux/actions/SettingsActions'
import Ionicons from '@expo/vector-icons/Ionicons';
import COLORS from '../config/Colors';
import firebase from '../config/Firebase';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _signOutAsync = async () => {
    firebase.auth().signOut().then( () => {
          this.props.toggleSettings(false)
          AsyncStorage.clear().then(async () => {
        }).catch(function(error){
            console.log(error);
        })
      }).catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.rootContainer}>

        <View style={styles.containerHeader}>

          <Text style={styles.textSettings}>Settings</Text>

          <TouchableOpacity onPress={() => this.props.toggleSettings(false)}>
              <Ionicons style={{paddingRight: 20}} name={'ios-close'} size={40} color={'#ffffff'}/>
          </TouchableOpacity>
          
        </View>
        

        <View style={styles.containerBodyOne}>
          
          <View style={styles.containerBodyOneText1}>
            <Text style={styles.textAccount}>Account</Text>
          </View>

          <TouchableOpacity style={styles.containerBodyOneText2}>
            <Text style={styles.textChangePassword}>Change Password</Text>
            <Ionicons style={{paddingRight: 20}} name={'ios-arrow-forward'} size={30} color={'#FFFFFF'}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.containerBodyOneText3}>
            <Text style={styles.textBlockedAccounts}>Blocked Accounts</Text>
            <Ionicons style={{paddingRight: 20}} name={'ios-arrow-forward'} size={30} color={'#FFFFFF'}/>
          </TouchableOpacity>
          
        </View>


        <View style={styles.containerBodyTwo}>

          <View style={styles.containerBodyTwoText1}>
            <Text style={styles.textAbout}>About</Text>
          </View>

          <TouchableOpacity style={styles.containerBodyTwoText2}>
            <Text style={styles.textTermsAndConditions}>Terms and Conditions</Text>
            <Ionicons style={{paddingRight: 20}} name={'ios-arrow-forward'} size={30} color={'#FFFFFF'}/>
          </TouchableOpacity>

        </View>


        <View style={styles.containerBodyThree}>

          <TouchableOpacity style={styles.containerBodyThreeText1} onPress={this._signOutAsync}>
              <Ionicons style={{paddingLeft: 20}} name={'md-log-out'} size={30} color={'#FFFFFF'}/>
              <Text style={styles.textSignOut}>Sign out of @{this.props.handle}</Text>
          </TouchableOpacity>

        </View>
      
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
    handle: state.currentProfileReducer.handle
})

const mapDispatchToProps = {
    toggleSettings
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.GRADIENT_COLOR_2,
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRADIENT_COLOR_2,
  },
  containerBodyOne: {
    flex: 3,
  },
  containerBodyTwo: {
    flex: 2,
  },
  containerBodyThree: {
    flex: 7,
  },
  containerBodyOneText1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  containerBodyOneText2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBodyOneText3: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBodyTwoText1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  containerBodyTwoText2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBodyThreeText1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSettings: {
    fontFamily: 'HkGrotesk_Bold',
    fontSize: 30,
    color: '#ffffff',
    marginLeft: 20,
    marginRight: 'auto',
  },
  textAccount: {
    fontFamily: 'HkGrotesk_Medium',
    fontSize: 20,
    paddingLeft: 20,
    color: '#ffffff',
  },
  textChangePassword: {
    fontFamily: 'HkGrotesk_Light',
    fontSize: 15,
    paddingLeft: 20,
    color: '#ffffff',
    marginRight: 'auto',
  },
  textBlockedAccounts: {
    fontFamily: 'HkGrotesk_Light',
    fontSize: 15,
    paddingLeft: 20,
    color: '#ffffff',
    marginRight: 'auto',
  },
  textAbout: {
    fontFamily: 'HkGrotesk_Medium',
    fontSize: 20,
    paddingLeft: 20,
    color: '#ffffff',
  },
  textTermsAndConditions: {
    fontFamily: 'HkGrotesk_Light',
    fontSize: 15,
    paddingLeft: 20,
    color: '#ffffff',
    marginRight: 'auto',
  },
  textSignOut: {
    fontFamily: 'HkGrotesk_Bold',
    fontSize: 15,
    paddingLeft: 10,
    color: '#ffffff',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
