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
} from 'react-native';

import AuthLoadingScreen from '../components/Auth.js';
import { Form, Label, Input, Item, Container, Content, Body, StyleProvider,  Button, Toast } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';
import { LinearGradient } from 'expo';
import firebase from '../config/Firebase.js'
import Variables from '../config/Variables.js';
import COLORS from '../config/Colors.js';

class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          error: '',
          email: '',
          password: '',
          success: '',
          showToast: false,
          isFontReady:true,
        };
      }

    static navigationOptions = {
        header: null,
        headerMode: 'none',
    };

    _signInAsync = async () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(() => { AsyncStorage.setItem('userToken', 'success');
                                    this.props.navigation.navigate('AuthLoading');
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
            <View>
            <StatusBar barStyle="light-content"/>
            <LinearGradient
              style={styles.gradient}
              colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
            >
              <Image
                source={require("../assets/global/logo_final.png")}
                style={styles.logo}
              />
              <Text style={styles.title}>BarMate</Text>
              <View style={styles.emailInputWrapper}>
                <Image
                  style={styles.textboxImage}
                  source={require("../assets/signup/email_text_box.png")}
                />
                <TextInput
                  style={styles.email}
                  autoFocus={false}
                  placeholder={"Email"}
                  placeholderTextColor={"#000000"}
                  value={this.state.email}
                  onChangeText={email => this.setState({email: email})}/>
                />
              </View>
              <View style={styles.passwordInputWrapper}>
                <Image
                  style={styles.textboxImage}
                  source={require("../assets/signup/password_text_box.png")}
                />
                <TextInput
                  style={styles.password}
                  autoFocus={false}
                  placeholder={"Password"}
                  placeholderTextColor={"#000000"}
                  value={this.state.password}
                  onChangeText={password => this.setState({password: password})}/>
                />
              </View>
              <Text style={styles.passwordRequirementText}>Forgot your password?</Text>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._signInAsync()}}>
                  <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backButtonContainer} onPress={() => {this.props.navigation.navigate('SignUp')}}>
                  <Text style={styles.backButtonText}>Don't have an account? Sign up.</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    gradient: {
      width: Variables.deviceWidth,
      height: Variables.deviceHeight
    },
    logo: {
      alignSelf: "center",
      width: 150,
      height: 160,
      marginTop: 150,
      marginBottom: 5,
      marginRight: 10,
    },
    title: { 
      alignSelf: 'center',
      fontFamily: "HkGrotesk_Bold",
      fontSize: 30,
      color: "#ffffff",
      marginBottom: 25
    },
    buttonContainer: {
      alignSelf: 'center',
      backgroundColor: '#3999c9',
      width: 220,
      height: 60,
      marginTop: 80,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButtonContainer: {
      alignSelf: 'center',
      width: 220,
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButtonText: {
      fontFamily: "HkGrotesk_Light",
      fontSize: 15,
      color: "#ffffff"
    },    
    glyph: {
      width: 100,
      height: 100,
      marginLeft: 30
    },
    buttonText: {
      fontFamily: "HkGrotesk_Bold",
      fontSize: 25,
      color: "#ffffff"
    },
    cancel: {
      fontFamily: "HkGrotesk_Light",
      fontSize: 20,
      alignSelf: "center",
      marginTop: 75,
      color: "white"
    },
    email: {
      paddingLeft: 10,
      flex: 1,
      backgroundColor: "#ffffff",
      height: 50,
      fontFamily: 'HkGrotesk_Italic',
      fontSize: 20,
    },
    password: {
      paddingLeft: 10,
      flex: 1,
      backgroundColor: "#ffffff",
      height: 50,
      fontFamily: 'HkGrotesk_Italic',
      fontSize: 20,
    },
    passwordRequirementText: {
        fontFamily: 'HkGrotesk_Light',
        fontSize: 13,
        color: '#ffffff',
        marginLeft: 30,
    },
    textboxImage: {
      padding: 10,
      width: 50,
      height: 50
    },
    emailInputWrapper: {
      width: Variables.deviceWidth - 50,
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center',
      backgroundColor: "#ffffff",
      flexDirection: "row",
      borderRadius: 15,
      marginTop: 40,
      marginBottom: 10,
    },
    passwordInputWrapper: {
      width: Variables.deviceWidth - 50,
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: 'center',
      backgroundColor: "#ffffff",
      flexDirection: "row",
      borderRadius: 15,
      marginBottom: 5,
    },
  });
  

  export default SignInScreen;
