import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import Variables from "../../config/Variables";
import COLORS from "../../config/Colors";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { setModalVisible } from "../../redux/actions/SignUpActions";
import firebase from "../../config/Firebase.js";
import Expo from "expo";
class ChooseNameAndHandle extends Component {

  async _createBarmateAccount() {
    this._renderLoading(true);
    await firebase.auth().createUserWithEmailAndPassword(this.props.email, this.props.password)
          .then(user => {
            console.log('User has been created successfully! Uploading Data...');
            this._uploadUserDataToAccount(user.user.uid);
            this._renderLoading(false);
          })
          .catch((error) => {if(error) {console.log('There was an error creating user... please try again')}})
  }

  _uploadUserDataToAccount(uid) {
    let user = firebase.database().ref(`users/${uid}`);
    user.set({
      name: this.props.name,
      age: this.props.age ? this.props.age : null,
      bio: this.props.bio ? this.props.bio : null,
      karma: 0,
      handle: this.props.handle,
      gender: this.props.gender ? this.props.gender : null,
      location: this.props.location ? this.props.location : null,
      color: this.props.favoriteColor ? this.props.favoriteColor : null,
      interest: this.props.interest ? this.props.interest : null,
    }).then(() => {
      console.log('Data has been uploaded to the cloud')
      this.props.profilePicture === 'None' ? null : this._uploadProfilePictureToStorageBucket(this.props.profilePicture, uid, 'profile-picture').then(() =>{
        console.log('Profile Picture added')
      }).catch((error) => {
        console.log(error)
      })
    }).catch(() => {console.log('An error has occured uploading data to the cloud')})
  }
  
  _uploadProfilePictureToStorageBucket = async(uri, uid, imageName,) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      let ref = firebase.storage().ref().child(`users/${uid}/${imageName}`);
      return ref.put(blob);
  }


  _renderLoading(value){
    if(value === true) {
      return <ActivityIndicator/>
    }
    else {
      return alert('Barmate account successfully created! :)')
    }
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
          <Text style={styles.title}>
            Awesome, {this.props.name}{"\n"}Here is your profile
          </Text>
          <Text style={styles.subtitle}>
            Here is a summary of all your info.
          </Text>
          <Text style={styles.subtitle}>
            Please make sure everything is correct
          </Text>
          <Text style={styles.subtitle}>before you finish signing up.</Text>
          <Text style={styles.subtitle}>Scroll to see all your data</Text>
          <Text style={styles.note}>
            Note: You cannot change your name{"\n"}or handle later
          </Text>
        <ScrollView>
          <View>
            <Text style={styles.header}>Email</Text>
            <Text style={styles.content}>{this.props.email}</Text>
          </View>

          <View>
            <Text style={styles.header}>Name</Text>
            <Text style={styles.content}>{this.props.name}</Text>
          </View>

          <View>
            <Text style={styles.header}>Handle</Text>
            <Text style={styles.content}>{this.props.handle}</Text>
          </View>

          <View>
            <Text style={styles.header}>Bio</Text>
            <Text style={styles.content}>{this.props.bio ? this.props.bio : 'None'}</Text>
          </View>

          <View>
            <Text style={styles.header}>Birthday</Text>
            <Text style={styles.content}>{this.props.age[1] + 1}/{this.props.age[0]}/{this.props.age[2]}</Text>
          </View>

          <View>
            <Text style={styles.header}>Gender</Text>
            <Text style={styles.content}>{this.props.gender ? this.props.gender : 'Not given'}</Text>
          </View>

          <View>
            <Text style={styles.header}>Location</Text>
            <Text style={styles.content}>{this.props.location ? this.props.location : 'Not given'}</Text>
          </View>

          <View>
            <Text style={styles.header}>Interested In</Text>
            <Text style={styles.content}>{this.props.interest ? this.props.interest : 'Not given'}</Text>
          </View>
        </ScrollView>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this._createBarmateAccount();
            }}
          >
            <Text style={styles.buttonText}>Create Account</Text>
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

const mapStateToProps = state => ({
  email: state.signUpReducer.email,
  password: state.signUpReducer.password,
  name: state.signUpReducer.name,
  handle: state.signUpReducer.handle,
  bio: state.signUpReducer.bio,
  age: state.signUpReducer.age,
  gender: state.signUpReducer.gender,
  location: state.signUpReducer.location,
  interest: state.signUpReducer.interest,
  profilePicture: state.signUpReducer.profilePicture,
  favoriteColor: state.signUpReducer.favoriteColor,
});

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
  header: {
    fontFamily: "HkGrotesk_Medium",
    fontSize: 20,
    marginLeft: 30,
    color: "#FFFFFF"
  },
  content: {
    fontFamily: "HkGrotesk_Regular",
    fontSize: 18,
    marginLeft: 30,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "HkGrotesk_Light",
    fontSize: 14,
    marginLeft: 30,
    color: "#FFFFFF"
  },
  note: {
    fontFamily: "HkGrotesk_Medium",
    fontSize: 14,
    marginLeft: 30,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "#3999c9",
    width: 220,
    height: 60,
    marginTop: 10,
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
    color: "#ffffff",
    marginBottom: 60,
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
    height: 75,
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
});

export default connect(
  mapStateToProps,
  null
)(ChooseNameAndHandle);
