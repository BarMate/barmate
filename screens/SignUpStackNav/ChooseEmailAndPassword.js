import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import Variables from "../../config/Variables";
import COLORS from "../../config/Colors";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { setModalVisible } from "../../redux/actions.js";
import firebase from "../../config/Firebase.js";
import Expo from "expo";
class ChooseEmailAndPassword extends Component {

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content"/>
        <LinearGradient
          style={styles.gradient}
          colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
        >
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
              autoFocus={false}
              placeholder={"Email"}
              placeholderTextColor={"#000000"}
            />
          </View>
          <View style={styles.passwordInputWrapper}>
            <Image
              style={styles.textboxImage}
              source={require("../../assets/signup/password_text_box.png")}
            />
            <TextInput
              style={styles.password}
              autoFocus={false}
              placeholder={"Password"}
              placeholderTextColor={"#000000"}
            />
          </View>
          <View style={styles.passwordInputWrapper}>
            <Image
              style={styles.textboxImage}
              source={require("../../assets/signup/password_text_box.png")}
            />
            <TextInput
              style={styles.password}
              autoFocus={false}
              placeholder={"Confirm password"}
              placeholderTextColor={"#000000"}
            />
          </View>
          <Text style={styles.passwordRequirementText}>Password must be:</Text>
          <Text style={styles.passwordRequirementText}>• At least 8 characters</Text>
          <Text style={styles.passwordRequirementText}>• One or more of each of the following:</Text>
          <Text style={styles.passwordRequirementText}>  - lower-case letter{'\n'}  - upper-case letter{'\n'}  - number</Text>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => {this.props.navigation.push('ChooseNH')}}>
              <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButtonContainer} onPress={() => {this.props.navigation.navigate('Start')}}>
              <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = state => {};

const mapDispatchToProps = {};

const styles = StyleSheet.create({
  gradient: {
    width: Variables.deviceWidth,
    height: Variables.deviceHeight
  },
  logo: {
    alignSelf: "flex-start",
    width: 75,
    height: 80,
    marginLeft: 30,
    marginTop: 60,
    marginBottom: 30
  },
  title: {
    fontFamily: "HkGrotesk_Bold",
    fontSize: 30,
    marginLeft: 30,
    color: "#ffffff",
    marginBottom: 30
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#3999c9',
    width: 220,
    height: 60,
    marginTop: 60,
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
  null
)(ChooseEmailAndPassword);
