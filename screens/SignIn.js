import React from 'react';
import {
    StatusBar,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

import { Toast } from 'native-base';
import { connect } from 'react-redux';

import AuthLoadingScreen from '../components/Auth.js';

import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';

import { LinearGradient } from 'expo';

import firebase from '../config/Firebase.js'

import Variables from '../config/Variables.js';
import COLORS from '../config/Colors.js';

import CustomTextBox from '../components/SignIn/CustomTextBox'

class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        
        };
      }

    _signInAsync = async () => {
    firebase.auth().signInWithEmailAndPassword(this.props.username, this.props.password)
                    .then(() => { AsyncStorage.setItem('userToken', 'success');
                                    this.props.navigation.navigate('Auth');
                                })
                    .catch(() => {
                        <AuthLoadingScreen error='Authentication failed' loading={false} success=''/>
                        Toast.show({
                            style: {
                                backgroundColor: "#6D6ABF",
                                borderRadius: 15,
                            },
                            text: "Email or password is inccorect. Try again.",
                            buttonText: "Got it",
                            duration: 3000,
                            position: 'bottom',
                        })
                        });
    };

    render(){
        return(
          <ScrollView scrollEnabled={false}>

            <StatusBar barStyle="light-content"/>

            <LinearGradient
              style={styles.gradient}
              colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
            >

            <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center'}} behavior={'padding'}>
            
              <View style={styles.rootContainer}>

                <View style={styles.containerTop}>

                  <View style={styles.containerImageLogo}>

                    <Image 
                      style={styles.imageLogo}
                      source={require("../assets/global/logo_final.png")}
                    />
                    
                  </View>

                  <View>

                    <Text style={styles.textTitle}>BarMate</Text>

                  </View>

                </View>

                <View style={styles.containerMiddle}>
                  
                  <View style={styles.containerMiddleTextBoxes}>
  
                      <CustomTextBox type={'username'}/>
                      <CustomTextBox type={'password'}/>
                   
                  </View>

                  <View style={styles.containerMiddleForgotPassword}>

                    <TouchableOpacity style={styles.buttonForgotPassword}>
                      <Text style={styles.textForgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>

                  </View>

                </View>

                <View style={styles.containerBottom}>

                    <TouchableOpacity style={styles.buttonSignIn} onPress={this._signInAsync}>
                      <Text style={styles.textSignIn}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonSignUp}>
                      <Text style={styles.textSignUp}>Don't have an account? Sign Up.</Text>
                    </TouchableOpacity>

                </View>

              </View>

              </KeyboardAvoidingView>

            </LinearGradient>
            
          </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
  username: state.signInReducer.username,
  password: state.signInReducer.password,
})  

const styles = StyleSheet.create({
  gradient: {
    
    width: Variables.deviceWidth,
    height: Variables.deviceHeight,
  },
  rootContainer: {
    flex: 1,
  },
  containerTop: {
    flex: 3,
    alignItems: 'center',
  },
  containerMiddle: {
    flex: 2,
  },
  containerBottom: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImageLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageLogo: {
      width: 150,
      height: 140,
      marginRight: 15,
      resizeMode: 'contain'
  },
  textTitle: {
      fontFamily: "HkGrotesk_Bold",
      fontSize: 30,
      color: "#ffffff",
  },
  containerMiddleTextBoxes: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerMiddleForgotPassword: {
    flex: 1,
    paddingLeft: 30,
  },
  buttonForgotPassword: {

  },
  textForgotPassword: {
    fontFamily: "HkGrotesk_Bold",
    fontSize: 15,
    color: "#ffffff"   
  },
  buttonSignUp: {

  },
  textSignIn: {
    fontFamily: "HkGrotesk_Bold",
    fontSize: 25,
    color: "#ffffff"
  },
  buttonSignIn: {
    width: 220,
    height: 60,
    backgroundColor: '#3999c9',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  textSignUp: {
    fontFamily: "HkGrotesk_Light",
    fontSize: 15,
    color: "#ffffff"
  },
})


export default connect(mapStateToProps, null)(SignInScreen);
