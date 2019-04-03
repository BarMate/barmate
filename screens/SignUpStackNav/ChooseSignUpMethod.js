import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import Variables from "../../config/Variables";
import COLORS from "../../config/Colors";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { setModalVisible } from "../../redux/actions/SignUpActions";
import firebase from "../../config/Firebase.js";
import Expo from "expo";
import { withNavigation } from 'react-navigation';
class ChooseSignUpMethod extends Component {

  _signUpWithFacebook = async () => {
    // thx kevin
    const fbId = "791668991006897";
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      fbId,
      { permissions: ["public_profile", "email", "user_friends"] }
    );

    if (type == "success") {
      const response = await fetch(
        "https://graph.facebook.com/me?access_token=$(token)&fields=id,name,email,about,picture"
      );

      console.log("Response: ", response);

      const json = await response.json();

      console.log("USER INFO: ", json);

      try {
        var credential = firebase.auth.FacebookAuthProvider.credential(token);
        await firebase.auth().signInAndRetrieveDataWithCredential(credential);

        this.props.navigation.navigate("Main");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Cancelled fb login");
    }
  };

  _signUpWithGoogle() {

  }

  _signUpWithEmail() {
    this.props.navigation.navigate('ChooseEP');
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          style={styles.gradient}
          colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
        >
          <Image
            source={require("../../assets/global/logo_final.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>How would you {"\n"}like to sign up?</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this._signUpWithFacebook();
            }}
          >
            <Image
              style={styles.glyph}
              source={require("../../assets/signup/facebook_glyph.png")}
            />
            <Text style={styles.buttonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Image
              style={styles.glyph}
              source={require("../../assets/signup/google_glyph.png")}
            />
            <Text style={styles.buttonText}>Google+</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonContainer} 
            onPress={() => {
              this._signUpWithEmail();
            }}>
            <Image
              style={styles.glyph}
              source={require("../../assets/signup/email_glyph.png")}
            />
            <Text style={styles.buttonText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.setModalVisible(false);
            }}
          >
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const mapDispatchToProps = {
  setModalVisible
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
    width: Variables.deviceWidth,
    height: 100,
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center"
  },
  glyph: {
    width: 100,
    height: 100,
    marginLeft: 30
  },
  buttonText: {
    marginLeft: 30,
    fontFamily: "HkGrotesk_Bold",
    fontSize: 30,
    color: "#ffffff"
  },
  cancel: {
    fontFamily: "HkGrotesk_Light",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 75,
    color: "white"
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(ChooseSignUpMethod));
