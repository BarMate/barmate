import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar
} from "react-native";
import Variables from "../../config/Variables";
import COLORS from "../../config/Colors";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { setModalVisible } from "../../redux/actions.js";
import firebase from "../../config/Firebase.js";
import Expo from "expo";

class ChooseNameAndHandle extends Component {
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
          <Text style={styles.title}>
            Enter the final details{'\n'}about yourself for your{'\n'}account.
          </Text>

          <View style={styles.passwordInputWrapper}>
            <Image
              style={styles.textboxImage}
              source={require("../../assets/signup/age_text_box.png")}
            />
            <TextInput
              style={styles.password}
              autoFocus={false}
              placeholder={"Age"}
              placeholderTextColor={"#000000"}
            />
          </View>

          <View style={styles.emailInputWrapper}>
            <Image
              style={styles.textboxImage}
              source={require("../../assets/signup/gender_text_box.png")}
            />
            <TextInput
              style={styles.email}
              autoFocus={false}
              placeholder={"Gender"}
              placeholderTextColor={"#000000"}
            />
          </View>
          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.props.navigation.push("Confirm");
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
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
    marginBottom: 10
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  profilePictureContainer: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 10
  },
  title: {
    fontFamily: "HkGrotesk_Bold",
    fontSize: 30,
    marginLeft: 30,
    color: "#ffffff",
    marginBottom: 10
  },
  subtitle: {
    fontFamily: "HkGrotesk_Light",
    fontSize: 14,
    marginLeft: 30,
    color: "#FFFFFF"
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "#3999c9",
    width: 220,
    height: 60,
    marginTop: 200,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  backButtonContainer: {
    alignSelf: "center",
    width: 220,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
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
    fontFamily: "HkGrotesk_Italic",
    fontSize: 20
  },
  password: {
    paddingLeft: 10,
    flex: 1,
    backgroundColor: "#ffffff",
    height: 50,
    fontFamily: "HkGrotesk_Italic",
    fontSize: 20
  },
  handle: {
    fontFamily: "HkGrotesk_Light",
    fontSize: 13,
    color: "#ffffff",
    marginLeft: 30
  },
  charactersRemaining: {
    fontFamily: "HkGrotesk_Italic",
    fontSize: 13,
    color: "#ffffff",
    marginLeft: 30
  },
  isHandleTakenText: {
    fontFamily: "HkGrotesk_Light",
    fontSize: 13,
    color: "green",
    marginLeft: 30
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
    alignSelf: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderRadius: 15,
  },
  passwordInputWrapper: {
    width: Variables.deviceWidth - 50,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 50,
  }
});

export default connect(
  null,
  null
)(ChooseNameAndHandle);
