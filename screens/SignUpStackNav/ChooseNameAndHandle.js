import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import Variables from "../../config/Variables";
import COLORS from "../../config/Colors";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { sendName, sendHandle } from "../../redux/actions.js";
import firebase from "../../config/Firebase.js";
import Expo from "expo";
import { Toast } from 'native-base'



class ChooseNameAndHandle extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      name: '',
      handle: '',
      handleValidFlag: false,
      handleTakenFlag: false,
      isHandleTaken: true,
      handleTakenText: '',
    }
  }

  _displayToastToUser(type) {
    switch(type) {
      case 'handleError': {
        Toast.show({
          style: {
            backgroundColor: "#6D6ABF",
            borderRadius: 15,
        },
        text: "It looks like the handle you've entered isnt valid, please re enter it.",
        buttonText: "Ok",
        duration: 3000,
        position: 'bottom',
        })
        break;
      }
      case 'nameError': {
        Toast.show({
          style: {
            backgroundColor: "#6D6ABF",
            borderRadius: 15,
        },
        text: "It looks like you haven't entered your name, please enter your name",
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

  isHandleTaken() {
    // used to display to user if the handle they are entering is vaid
    let whitespaceCheck = /^[\S]*$/

    this.setState({isHandleTaken: false}) // reset state of handle
    firebase.database().ref(`/users/`).once('value').then(snapshot => {
      snapshot.forEach(child => {
        if(this.state.handle === child.child('handle').val()) {
          this.setState({handleTakenText: 'Handle is taken', isHandleTaken: true})
          return;
        }
      })
    })
    
    if(whitespaceCheck.test(this.state.handle) === false || this.state.handle.length < 4)  {
      console.log('Handle is not taken, but invalid- it either has a space in it or less than 4 characters')
      this.setState({handleTakenText: 'Handle is invalid', isHandleTaken: true})
    }
    else {
      console.log('Handle is valid and not taken')
      this.setState({handleTakenText: 'Handle is not taken and valid', isHandleTaken: false})
    }
    return;
  }

  _confirmCorrectInformation() {
    // called when user is entering a handle for their account
    // - checks to see if handle is taken inside of firebase database
    // - checks to see if handle meets requirements
    
    if(this.state.isHandleTaken) {
      console.log('Handle is not yet valid- must be a valid handle to continue')
      this._displayToastToUser('handleError')
    }
    else if(this.state.name.length === 0) {
      console.log('A name has not been entered, must enter a name before continuing')
      this._displayToastToUser('nameError')
    }
    else if(this.state.isHandleTaken === false && this.state.name.length > 0) {
      this.props.sendName(this.state.name)
      this.props.sendHandle(this.state.handle)
      this.props.navigation.push('ChooseBP')
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
        <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center'}} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
          <View>
            <Image
              source={require("../../assets/global/logo_final.png")}
              style={styles.logo}
            />
            <View>
              <Text style={styles.title}>Enter your name{"\n"}and handle.</Text>
              <Text style={styles.subtitle}>Your handle is only visible to friends and{'\n'}people in places you visit.</Text>
            </View>
          <View style={styles.nameInputWrapper}>
            <Image
              style={styles.textboxImage}
              source={require("../../assets/signup/name_text_box.png")}
            />
            <TextInput
              style={styles.name}
              autoFocus={false}
              placeholder={"Name"}
              placeholderTextColor={"#000000"}
              value={this.state.name}
              returnKeyType={'next'}
              keyboardAppearance={'dark'}
              onChangeText={data => {
                this.setState({name: data});
              }}
              blurOnSubmit={false}
              onSubmitEditing={() => { this.handleInput.focus(); }}
            />
          </View>
          <View style={styles.handleInputWrapper}>
            <Image
              style={styles.textboxImage}
              source={require("../../assets/signup/at_text_box.png")}
            />
            <TextInput
              ref={input => { this.handleInput = input}}
              style={styles.handle}
              autoFocus={false}
              placeholder={"Handle"}
              placeholderTextColor={"#000000"}
              value={this.state.handle}
              returnKeyLabel={'done'}
              keyboardAppearance={'dark'}
              autoCorrect={false}
              blurOnSubmit={true}
              onSubmitEditing={() => {this.isHandleTaken()}}
              onEndEditing={() => {this.isHandleTaken()}}
              onChangeText={data => {
                this.setState({handle: data});
              }}
            />
          </View>
          <Text style={styles.handleRequirementText}>Handle must be:</Text>
          <Text style={styles.handleRequirementText}>• At least 4 characters</Text>
          <Text style={styles.handleRequirementText}>• No spaces</Text>
          <Text style={styles.handleConfirm}>@{this.state.handle}</Text>
          <Text style={this.state.isHandleTaken ? styles.handleTaken : styles.handleNotTaken}>{this.state.handleTakenText}</Text>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._confirmCorrectInformation()}}>
              <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButtonContainer} onPress={() => {this.props.navigation.goBack()}}>
              <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ScrollView>
    );
  }
}


const mapDispatchToProps = {
  sendName,
  sendHandle,
};

const styles = StyleSheet.create({
  gradient: {
    width: Variables.deviceWidth,
    height: Variables.deviceHeight
  },
  logo: {
    width: 75,
    height: 80,
    marginLeft: 30,
    marginTop: 60,
    marginBottom: 25,
    alignItems: 'flex-start'
  },
  title: {
    alignItems: 'flex-start',
    fontFamily: "HkGrotesk_Bold",
    fontSize: 30,
    marginLeft: 30,
    color: "#ffffff",
    marginBottom: 10
  },
  subtitle: {
    alignItems: 'flex-start',
    fontFamily: 'HkGrotesk_Light',
    fontSize: 14,
    marginLeft: 30,
    color: '#FFFFFF'
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
  name: {
    paddingLeft: 10,
    flex: 1,
    backgroundColor: "#ffffff",
    height: 50,
    fontFamily: 'HkGrotesk_Italic',
    fontSize: 20,
  },
  handle: {
    paddingLeft: 10,
    flex: 1,
    backgroundColor: "#ffffff",
    height: 50,
    fontFamily: 'HkGrotesk_Italic',
    fontSize: 20,
  },
  handleConfirm: {
      alignItems: 'flex-start',
      marginTop: 10,
      fontFamily: 'HkGrotesk_Light',
      fontSize: 13,
      color: '#ffffff',
      marginLeft: 30,
  },
  handleTaken: {
    fontFamily: 'HkGrotesk_Light',
    fontSize: 13,
    color: 'red',
    marginLeft: 30,
    alignItems: 'flex-start',
  },
  handleNotTaken: {
    fontFamily: 'HkGrotesk_Light',
    fontSize: 13,
    color: 'green',
    marginLeft: 30,
    alignItems: 'flex-start',
  },
  textboxImage: {
    padding: 10,
    width: 50,
    height: 50
  },
  nameInputWrapper: {
    width: Variables.deviceWidth - 50,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 10,
  },
  handleInputWrapper: {
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
    handleRequirementText: {
      fontFamily: 'HkGrotesk_Light',
      fontSize: 13,
      color: '#ffffff',
      marginLeft: 30,
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(ChooseNameAndHandle);
