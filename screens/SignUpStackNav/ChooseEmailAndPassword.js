import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Variables from "../../config/Variables";
import COLORS from "../../config/Colors";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { sendEmail, sendPassword } from "../../redux/actions.js";
import firebase from "../../config/Firebase.js";
import Expo from "expo";
import { Toast } from 'native-base';

class ChooseEmailAndPassword extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      passwordValidFlag: false,
      emailValidFlag: false,
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  _displayToastToUser(type) {
    switch(type) {
      case 'emailTaken': {
        Toast.show({
          style: {
            backgroundColor: "#6D6ABF",
            borderRadius: 15,
        },
        text: "The email entered is already being used.",
        buttonText: "Ok",
        duration: 3000,
        position: 'bottom',
        })
        break;
      }
      case 'passwordMismatch': {
        Toast.show({
          style: {
            backgroundColor: "#6D6ABF",
            borderRadius: 15,
        },
        text: "Uh oh! Your passwords do not match each other!",
        buttonText: "Ok",
        duration: 3000,
        position: 'bottom',
        })
        break;
      }
      case 'passwordRequirements': {
        Toast.show({
          style: {
            backgroundColor: "#6D6ABF",
            borderRadius: 15,
        },
        text: "It looks like your password doesn't meet requirements, try entering them again",
        buttonText: "Ok",
        duration: 3000,
        position: 'bottom',
        })
        break;
      }
      case 'emailInvalid': {
        Toast.show({
          style: {
            backgroundColor: "#6D6ABF",
            borderRadius: 15,
        },
        text: "The email address seems to be invalid. Please try entering it again.",
        buttonText: "Ok",
        duration: 3000,
        position: 'bottom',
        })
        break;
      }
      default: {
        Toast.show({
          style: {
            backgroundColor: "#6D6ABF",
            borderRadius: 15,
        },
        text: "An unknown error has occured, please try again.",
        buttonText: "Ok",
        duration: 3000,
        position: 'bottom',
        })
        break;
      }
    }
  }

  async _confirmEmailAndPassword() {
      // called when user clicks next on this page
      // - checks to see if email is already being used
      // - checks to see if email address is valid
      // - checks to see if password and confirm password are the same
      // - checks to see if password meets requirements
      // - sends user to next page of setup
      let passwordCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

      await firebase.auth().fetchSignInMethodsForEmail(this.state.email ? this.state.email : 'null').then(methods => {
        console.log(`Methods: ${methods.length}`)
        if(methods.length === 0) {
          console.log('Email is valid and not being used!')
          this.setState({emailValidFlag: true})
        }
        else {
          console.log('Email is valid but is already in use!')
          this._displayToastToUser('emailTaken');
          return;
        }
      }).catch(() => {
        console.log('Email is invalid')
        this._displayToastToUser('emailInvalid')
        return;
      })

      if(passwordCheck.test(this.state.password) === false) {
        console.log('Password did not meet requirements')
        this._displayToastToUser('passwordRequirements')
        return;
      } 
      else if(this.state.password !== this.state.confirmPassword) {
        console.log('Passwords did not match')
        this._displayToastToUser('passwordMismatch')
        return;
      } 
      else {
        console.log('Password is valid')
        this.setState({passwordValidFlag: true})
      }

      if(this.state.emailValidFlag === true && this.state.passwordValidFlag === true) {
        console.log('Email and password are valid... continuing registration')
        this.props.sendEmail(this.state.email)
        this.props.sendPassword(this.state.password)
        this.props.navigation.push('ChooseNH')
      }
      else {
        console.log('An error has occured reading if email and password are valid.')
      }
  }

  render() {
    return (
      <ScrollView scrollEnabled={false}>
        <StatusBar barStyle="light-content"/>
        <LinearGradient
          style={styles.gradient}
          colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
        >
          <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
          <View>
          <Image
            source={require("../../assets/global/logo_final.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Enter your email{"\n"}and password.</Text>
          
            <View style={styles.emailInputWrapper}>
              <Image
                style={styles.textboxImage}
                source={require("../../assets/signup/email_text_box.png")}
              />
              <TextInput
                style={styles.email}
                autoFocus={true}
                placeholder={"Email"}
                placeholderTextColor={"#000000"}
                value={this.state.email}
                autoCapitalize={"none"}
                autoCorrect={false}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                keyboardAppearance={'dark'}
                blurOnSubmit={false}
                onChangeText={data => {
                  this.setState({email: data});
                }}
                onSubmitEditing={() => { this.passwordInput.focus(); }}
              />
            </View>
            <View style={styles.passwordInputWrapper}>
              <Image
                style={styles.textboxImage}
                source={require("../../assets/signup/password_text_box.png")}
              />
              <TextInput
                ref={input => { this.passwordInput = input}}
                style={styles.password}
                placeholder={"Password"}
                placeholderTextColor={"#000000"}
                value={this.state.password}
                autoCapitalize={"none"}
                autoCorrect={false}
                returnKeyType={'next'}
                keyboardAppearance={'dark'}
                secureTextEntry={true}
                blurOnSubmit={false}
                onChangeText={data => {
                  this.setState({password: data});
                }}
                onSubmitEditing={() => { this.confirmPasswordInput.focus(); }}
              />
            </View>
            <View style={styles.passwordInputWrapper}>
              <Image
                style={styles.textboxImage}
                source={require("../../assets/signup/password_text_box.png")}
              />
              <TextInput
                ref={input => { this.confirmPasswordInput = input}}
                style={styles.password}
                placeholder={"Confirm Password"}
                placeholderTextColor={"#000000"}
                value={this.state.confirmPassword}
                autoCapitalize={"none"}
                autoCorrect={false}
                returnKeyType={'done'}
                keyboardAppearance={'dark'}
                secureTextEntry={true}
                blurOnSubmit={true}
                onChangeText={data => {
                  this.setState({confirmPassword: data});
                }}
              />
            </View>
          
          <Text style={styles.passwordRequirementText}>Password must be:</Text>
          <Text style={styles.passwordRequirementText}>• At least 1 special characters</Text>
          <Text style={styles.passwordRequirementText}>• At least 8 characters</Text>
          <Text style={styles.passwordRequirementText}>• One or more of each of the following:</Text>
          <Text style={styles.passwordRequirementText}>  - lower-case letter{'\n'}  - upper-case letter{'\n'}  - number</Text>
        
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._confirmEmailAndPassword()}}>
              <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButtonContainer} onPress={() => {this.props.navigation.navigate('Start')}}>
              <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      
      </ScrollView>
    );
  }
}

// Send data to redux store
const mapDispatchToProps = {
  sendEmail,
  sendPassword,
};
const styles = StyleSheet.create({
  gradient: {
    width: Variables.deviceWidth,
    height: Variables.deviceHeight
  },
  logo: {
    alignSelf: "flex-start",
    width: 75,
    height: 80,
    marginTop: 0,
    marginBottom: 30
  },
  title: {
    fontFamily: "HkGrotesk_Bold",
    fontSize: 30,
    color: "#ffffff",
    marginBottom: 20
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#3999c9',
    width: 220,
    height: 60,
    marginTop: 10,
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
    fontFamily: "HkGrotesk_Medium",
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
      marginLeft: 5,
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
    marginTop: 5,
    marginBottom: 20,
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

export default connect(
  null,
  mapDispatchToProps,
)(ChooseEmailAndPassword);
