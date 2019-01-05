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
  ScrollView,
  Platform,
  Alert
} from "react-native";
import Variables from "../../config/Variables";
import COLORS from "../../config/Colors";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { sendProfilePicture, sendBio } from "../../redux/actions.js";
import firebase from "../../config/Firebase.js";
import { Permissions, ImagePicker } from "expo";

class ChooseNameAndHandle extends Component {
  constructor(props) {
    super(props)
      this.state ={
        image: '',
        bio: '',
        charactersRemaining: 50,
      }
  }

  _checkBioCharactersRemaining() {
    // called when user types in bio to see how many characters remain   
    if(this.state.bio === '') {
      this.setState({ charactersRemaining: 50 })
    }
    else {
      this.setState({ charactersRemaining: 50 - this.state.bio.length})
    }
  }

  _chooseImageFromLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if(status !== 'granted') {
      alert('BarMate needs permission to access your picture library, please try again.')
    }
    else {
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.4,
        mediaTypes: 'Images',
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    }
  }

  _sendUserToNextRegistrationScreen() {
    console.log(`BASE64: ${this.state.image.uri}`)
    if(this.state.image === '') {
      this.props.sendProfilePicture('None')
    }
    else {
      this.props.sendProfilePicture(this.state.image)
    }
    this.props.sendBio(this.state.bio)
    this.props.navigation.push('ChooseFinal')
  }

  _confirmCorrectInformation() {
    // called when user presses next
    if(this.state.bio.length === 0 && this.state.image !== '') {
      Alert.alert(
        'Bio is empty!',
        'It looks like you haven\'t written a bio, if you don\'t want a bio, just press continue',
        [
          {text: 'Cancel', onPress: () => {console.log('cancelled')}},
          {text: 'Continue', onPress: () => {this._sendUserToNextRegistrationScreen()}}
        ],
        { cancelable: true }
      )
    }
    else if(this.state.bio.length !== 0 && this.state.image === '') {
      Alert.alert(
        'No profile picture!',
        'It looks like you didn\'t choose a profile picture, if you don\'t one, just press continue',
        [
          {text: 'Cancel', onPress: () => {console.log('cancelled')}},
          {text: 'Continue', onPress: () => {this._sendUserToNextRegistrationScreen()}}
        ],
        { cancelable: true }
      )
    }
    else if(this.state.bio.length === 0 && this.state.image === '') {
      Alert.alert(
        'No profile picture or bio!',
        'It looks like you didn\'t choose a profile picture or write a bio, if you don\'t either of these, just press continue',
        [
          {text: 'Cancel', onPress: () => {console.log('cancelled')}},
          {text: 'Continue', onPress: () => {this._sendUserToNextRegistrationScreen()}}
        ],
        { cancelable: true }
      )
    }
    else {
      this._sendUserToNextRegistrationScreen()
    }
  }

  render() {
    return (
      <ScrollView scrollEnabled={false}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          style={styles.gradient}
          colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
        >
        <KeyboardAvoidingView keyboardVerticalOffset={100} style={{flex: 1, justifyContent: 'center'}} behavior={(Platform.OS === 'ios') ? 'padding' : null} >
          <View>
          <Image
            source={require("../../assets/global/logo_final.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Choose a profile</Text>
          <Text style={styles.title}>picture and bio.</Text>
          <Text style={styles.subtitle}>
            Your profile picture and bio is visible by{"\n"}friends and people
            in places you visit.
          </Text>
          <TouchableOpacity style={styles.profilePictureContainer} onPress={() => {this._chooseImageFromLibrary()}}>
            {
              this.state.image ? (<Image style={[styles.profilePicture, { width: 200, height: 200, borderRadius: 100 }]} source={{uri: this.state.image}}/>) : 
                                 (<Image style={[styles.profilePicture, { width: 200, height: 200, borderRadius: 100 }]} source={require("../../assets/login/defaultProfilePicture.png")}/>)
            }
            <Text style={styles.chooseImageText}>Choose Image...</Text>
          </TouchableOpacity>
          <View style={styles.emailInputWrapper}>
            <Image
              style={styles.textboxImage}
              source={require("../../assets/signup/bio_text_box.png")}
            />
            <TextInput
              // there is a stupid error here where the text input updates the onChangeText a character behind, so that needs fixed eventually
              autoCorrect={false}
              multiline={true}
              maxLength={50}
              style={styles.bio}
              autoFocus={false}
              placeholder={"Bio"}
              value={this.state.bio}
              placeholderTextColor={"#000000"}
              returnKeyType={'done'}
              keyboardAppearance={'dark'}
              onChangeText={data => {
                this.setState({bio: data})
                this._checkBioCharactersRemaining();  
              }}
              blurOnSubmit={true}
            />
          </View>
          <Text style={styles.handle}>Bio must be:</Text>
          <Text style={styles.handle}>• A maximum of 50 characters</Text>
          <Text style={styles.charactersRemaining}>{this.state.charactersRemaining} characters remaining</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this._confirmCorrectInformation();
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
          </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {};

const mapDispatchToProps = {
  sendProfilePicture,
  sendBio,
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
    marginTop: 30,
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
  },
  subtitle: {
    fontFamily: "HkGrotesk_Light",
    fontSize: 14,
    marginLeft: 30,
    color: "#FFFFFF"
  },
  chooseImageText: {
    fontFamily: "HkGrotesk_Light",
    fontSize: 14,
    color: "#FFFFFF",
    alignSelf: 'center',
    marginBottom: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: "#3999c9",
    width: 220,
    height: 60,
    marginTop: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  backButtonContainer: {
    alignSelf: "center",
    width: 220,
    marginTop: 5,
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
  bio: {
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
  emailInputWrapper: {
    width: Variables.deviceWidth - 50,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10
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
    marginBottom: 5
  }
});

export default connect(
  null,
  mapDispatchToProps,
)(ChooseNameAndHandle);
