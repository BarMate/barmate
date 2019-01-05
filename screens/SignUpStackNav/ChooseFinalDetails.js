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
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Picker,
  Alert,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Variables from "../../config/Variables";
import COLORS from "../../config/Colors";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import { sendAge, sendGender, sendLocation, sendInterest, sendFavoriteColor } from "../../redux/actions.js";
import firebase from "../../config/Firebase.js";
import Expo from "expo";
class ChooseNameAndHandle extends Component {
  constructor(props) {
    super(props)
      this.state ={
        date: '--',
        month: 'Birthday   --',
        year: '----',
        isDateTimePickerVisible: false,
        isGenderPickerVisible: false,
        isLocationPickerVisible: false,
        isInterestedVisible: false,
        isFavoriteColorVisible: false,
        gender: 'Gender',
        location: 'Location',
        interestedIn: 'Interested In',
        totalAge: [],
        favoriteColor: 'Color',
      }
  }
  _showFavoriteColorPicker = () => this.setState({ isFavoriteColorVisible: true });
  _hideFavoriteColorPicker = () => this.setState({ isFavoriteColorVisible: false });

  _showInterestedPicker = () => this.setState({ isInterestedVisible: true });
  _hideInterestedPicker = () => this.setState({ isInterestedVisible: false });

  _showGenderPicker = () => this.setState({ isGenderPickerVisible: true });
  _hideGenderPicker = () => this.setState({ isGenderPickerVisible: false });

  _showLocationPicker = () => this.setState({ isLocationPickerVisible: true });
  _hideLocationPicker = () => this.setState({ isLocationPickerVisible: false });

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    let selectedDate = new Date();
    selectedDate.setTime(date);
    console.log(`Selected Date ${selectedDate.toUTCString}`)
    this.setState({
      totalAge: [selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear()],
      date: selectedDate.getDate(),
      month: selectedDate.getMonth() + 1,
      year: selectedDate.getFullYear(),
    })
    this._hideDateTimePicker();
  };

  _maximumDate() {
    // Get the current year/month/day
    // minimumDate = current year/month/day - 18 years
    let minimumDate = new Date();
    minimumDate.setFullYear(minimumDate.getFullYear() - 18)
    minimumDate.setMonth(minimumDate.getMonth())
    minimumDate.setDate(minimumDate.getDate())
    return minimumDate;
  }

  _confirmCorrectInformation() {
    // called when user presses next
    // birthday = 0, location = 0, gender = 0 
    // birthday = 1, location = 0, gender = 0 
    // birthday = 0, location = 1, gender = 0 
    // birthday = 0, location = 0, gender = 1 
    
    if(this.state.year === '----') {
      Alert.alert(
        'It looks like you havent entered your birthday',
        'Your birthday is required to verify you are at least 21 years old.. please re enter it',
        [
          {text: 'Cancel', onPress: () => {console.log('cancelled')}},
          {text: 'Ok', onPress: () => {console.log('Ok')}}
        ],
        { cancelable: false }
      )
    }
    else if(this.state.location === 'Location') {
      Alert.alert(
        'No Location Set',
        'It looks like you didnt choose a location. If you don\'t want one, then just press continue',
        [
          {text: 'Cancel', onPress: () => {console.log('cancelled')}},
          {text: 'Continue', onPress: () => {this._sendUserToNextRegistrationScreen()}}
        ],
        { cancelable: true }
      )
    }
    else if(this.state.gender === 'Gender') {
      Alert.alert(
        'No Gender Set',
        'It looks like you didn\'t choose a gender. If you don\'t want to choose one, just press continue',
        [
          {text: 'Cancel', onPress: () => {console.log('cancelled')}},
          {text: 'Continue', onPress: () => {this._sendUserToNextRegistrationScreen()}}
        ],
        { cancelable: true }
      )
    }
    else if(this.state.interestedIn === 'Interested In') {
      Alert.alert(
        'No Interest Set',
        'It looks like you didn\'t choose an interest. If you don\'t want to choose one, just press continue',
        [
          {text: 'Cancel', onPress: () => {console.log('cancelled')}},
          {text: 'Continue', onPress: () => {this._sendUserToNextRegistrationScreen()}}
        ],
        { cancelable: true }
      )
    }
    else {
      this._sendUserToNextRegistrationScreen();
    }
  }

  _sendUserToNextRegistrationScreen() {
    this.props.sendAge(this.state.totalAge)
    this.props.sendGender(this.state.gender)
    this.props.sendInterest(this.state.interestedIn)
    this.props.sendLocation(this.state.location)
    this.props.sendFavoriteColor(this.state.favoriteColor)
    this.props.navigation.push('Confirm')
  }

  render() {
    return (
      <ScrollView scrollEnabled={false}>
        <StatusBar barStyle="light-content" />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isGenderPickerVisible}
          onRequestClose={() => {
            console.log('Modal closed');
          }}
        >
        <View style={{backgroundColor: COLORS.GRADIENT_COLOR_2, width: Variables.deviceWidth, height: Variables.deviceHeight}}>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'flex-end', marginRight: 30, marginTop: 80,}} onPress={this._hideGenderPicker}>
              <Text style={{fontSize: 20, fontFamily: 'HkGrotesk_Bold', color: 'white'}}>Done</Text>
          </TouchableOpacity>
            <Picker
              // TODO: fix picker not just using the initial value if user doesnt move it
              itemStyle={{fontFamily: 'HkGrotesk_Medium', color: 'white'}}
              selectedValue={this.state.gender}
              style={{width: Variables.deviceWidth, height: 300, position: 'absolute', bottom: 0, backgroundColor: COLORS.GRADIENT_COLOR_2}}
              onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Transgender" value="Transgender" />
              <Picker.Item label="Pangender" value="Pangender" />
              <Picker.Item label="Agender" value="Agender" />
              <Picker.Item label="Bigender" value="Bigender" />
              <Picker.Item label="Other" value="Other" />
              <Picker.Item label="Prefer not to say" value="Prefer not to say" />
            </Picker>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isInterestedVisible}
          onRequestClose={() => {
            console.log('Modal closed');
          }}
        >
        <View style={{backgroundColor: COLORS.GRADIENT_COLOR_2, width: Variables.deviceWidth, height: Variables.deviceHeight}}>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'flex-end', marginRight: 30, marginTop: 80,}} onPress={this._hideInterestedPicker}>
              <Text style={{fontSize: 20, fontFamily: 'HkGrotesk_Bold', color: 'white'}}>Done</Text>
          </TouchableOpacity>
            <Picker
              itemStyle={{fontFamily: 'HkGrotesk_Medium', color: 'white'}}
              selectedValue={this.state.interestedIn}
              style={{width: Variables.deviceWidth, height: 300, position: 'absolute', bottom: 0, backgroundColor: COLORS.GRADIENT_COLOR_2}}
              onValueChange={(itemValue, itemIndex) => this.setState({interestedIn: itemValue})}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Transgender" value="Transgender" />
              <Picker.Item label="Pangender" value="Pangender" />
              <Picker.Item label="Agender" value="Agender" />
              <Picker.Item label="Bigender" value="Bigender" />
              <Picker.Item label="Other" value="Other" />
              <Picker.Item label="Prefer not to say" value="Prefer not to say" />
            </Picker>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isFavoriteColorVisible}
          onRequestClose={() => {
            console.log('Modal closed');
          }}
        >
        <View style={{backgroundColor: COLORS.GRADIENT_COLOR_2, width: Variables.deviceWidth, height: Variables.deviceHeight}}>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'flex-end', marginRight: 30, marginTop: 80,}} onPress={this._hideFavoriteColorPicker}>
              <Text style={{fontSize: 20, fontFamily: 'HkGrotesk_Bold', color: 'white'}}>Done</Text>
          </TouchableOpacity>
            <Picker
              itemStyle={{fontFamily: 'HkGrotesk_Medium', color: 'white'}}
              selectedValue={this.state.favoriteColor}
              style={{width: Variables.deviceWidth, height: 300, position: 'absolute', bottom: 0, backgroundColor: COLORS.GRADIENT_COLOR_2}}
              onValueChange={(itemValue, itemIndex) => this.setState({favoriteColor: itemValue})}>
              <Picker.Item label="Red" value="Red" />
              <Picker.Item label="Blue" value="Blue" />
              <Picker.Item label="Green" value="Green" />
              <Picker.Item label="Pink" value="Pink" />
              <Picker.Item label="Purple" value="Purple" />
              <Picker.Item label="Yellow" value="Yellow" />
              <Picker.Item label="Black" value="Black" />
              <Picker.Item label="White" value="White" />
            </Picker>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isLocationPickerVisible}
          onRequestClose={() => {
            console.log('Modal closed');
          }}
        >
        <View style={{backgroundColor: COLORS.GRADIENT_COLOR_2, width: Variables.deviceWidth, height: Variables.deviceHeight}}>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'flex-end', marginRight: 30, marginTop: 80,}} onPress={this._hideLocationPicker}>
              <Text style={{fontSize: 20, fontFamily: 'HkGrotesk_Bold', color: 'white'}}>Done</Text>
          </TouchableOpacity>
            <Picker
              itemStyle={{fontFamily: 'HkGrotesk_Medium', color: 'white'}}
              selectedValue={this.state.location}
              style={{width: Variables.deviceWidth, height: 300, position: 'absolute', bottom: 0, backgroundColor: COLORS.GRADIENT_COLOR_2}}
              onValueChange={(itemValue, itemIndex) => this.setState({location: itemValue})}>
              <Picker.Item label="Alabama" value="Alabama" />
              <Picker.Item label="Alaska" value="Alaska" />
              <Picker.Item label="Arizona" value="Arizona" />
              <Picker.Item label="Arkansas" value="Arkansas" />
              <Picker.Item label="California" value="California" />
              <Picker.Item label="Colorado" value="Colorado" />
              <Picker.Item label="Connecticut" value="Connecticut" />
              <Picker.Item label="Delaware" value="Delaware" />
              <Picker.Item label="Florida" value="Florida" />
              <Picker.Item label="Georgia" value="Georgia" />
              <Picker.Item label="Hawaii" value="Hawaii" />
              <Picker.Item label="Idaho" value="Idaho" />
              <Picker.Item label="Illinois" value="Illinois" />
              <Picker.Item label="Indiana" value="Indiana" />
              <Picker.Item label="Iowa" value="Iowa" />
              <Picker.Item label="Kansas" value="Kansas" />
              <Picker.Item label="Kentucky" value="Kentucky" />
              <Picker.Item label="Louisiana" value="Louisiana" />
              <Picker.Item label="Maine" value="Maine" />
              <Picker.Item label="Maryland" value="Maryland" />
              <Picker.Item label="Massachusetts" value="Massachusetts" />
              <Picker.Item label="Michigan" value="Michigan" />
              <Picker.Item label="Minnesota" value="Minnesota" />
              <Picker.Item label="Mississippi" value="Mississippi" />
              <Picker.Item label="Missouri" value="Missouri" />
              <Picker.Item label="Montana" value="Montana" />
              <Picker.Item label="Nebraska" value="Nebraska" />
              <Picker.Item label="Nevada" value="Nevada" />
              <Picker.Item label="New Hampshire" value="New Hampshire" />
              <Picker.Item label="New Jersey" value="New Jersey" />
              <Picker.Item label="New Mexico" value="New Mexico" />
              <Picker.Item label="New York" value="New York" />
              <Picker.Item label="North Carolina" value="North Carolina" />
              <Picker.Item label="North Dakota" value="North Dakota" />
              <Picker.Item label="Ohio" value="Ohio" />
              <Picker.Item label="Oklahoma" value="Oklahoma" />
              <Picker.Item label="Oregon" value="Oregon" />
              <Picker.Item label="Pennsylvania" value="Pennsylvania" />
              <Picker.Item label="Rhode Island" value="Rhode Island" />
              <Picker.Item label="South Carolina" value="South Carolina" />
              <Picker.Item label="South Dakota" value="South Dakota" />
              <Picker.Item label="Tennessee" value="Tennessee" />
              <Picker.Item label="Texas" value="Texas" />
              <Picker.Item label="Utah" value="Utah" />
              <Picker.Item label="Vermont" value="Vermont" />
              <Picker.Item label="Virginia" value="Virginia" />
              <Picker.Item label="Washington" value="Washington" />
              <Picker.Item label="West Virginia" value="West Virginia" />
              <Picker.Item label="Wisconsin" value="Wisconsin" />
              <Picker.Item label="Wyoming" value="Wyoming" />
              <Picker.Item label="Prefer not to say" value="Prefer not to say" />
            </Picker>
          </View>
        </Modal>
        <DateTimePicker 
           isVisible={this.state.isDateTimePickerVisible}
           onConfirm={this._handleDatePicked}
           onCancel={this._hideDateTimePicker}
           titleIOS={'Choose your age'}
           maximumDate={this._maximumDate()}
        />
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
            <Text style={styles.title}>
              Enter the final details{'\n'}about yourself for your{'\n'}account.
            </Text>
          </View>
          <TouchableOpacity style={styles.passwordInputWrapper} onPress={this._showDateTimePicker}>
              <Image
                style={styles.textboxImage}
                source={require("../../assets/signup/age_text_box.png")}
              />
            <Text style={styles.email}>{this.state.month}/{this.state.date}/{this.state.year}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emailInputWrapper} onPress={this._showGenderPicker}>
              <Image
                style={styles.textboxImage}
                source={require("../../assets/signup/gender_text_box.png")}
              />
            <Text style={styles.email}>{this.state.gender}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emailInputWrapper} onPress={this._showLocationPicker}>
              <Image
                style={styles.textboxImage}
                source={require("../../assets/signup/location_text_box.png")}
              />
            <Text style={styles.email}>{this.state.location}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.emailInputWrapper} onPress={this._showInterestedPicker}>
              <Image
                style={styles.textboxImage}
                source={require("../../assets/signup/interested_text_box.png")}
              />
            <Text style={styles.email}>{this.state.interestedIn}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emailInputWrapper} onPress={this._showFavoriteColorPicker}>
              <Image
                style={styles.textboxImage}
                source={require("../../assets/signup/favoriteColor_text_box.png")}
              />
            <Text style={styles.email}>{this.state.favoriteColor}</Text>
          </TouchableOpacity>

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
          </KeyboardAvoidingView>
        </LinearGradient>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {};

const mapDispatchToProps = {
  sendAge,
  sendGender,
  sendLocation,
  sendInterest,
  sendFavoriteColor,
};

const styles = StyleSheet.create({
  gradient: {
    width: Variables.deviceWidth,
    height: Variables.deviceHeight
  },
  datePickerContainer: {
    backgroundColor: COLORS.GRADIENT_COLOR_1,
  },
  logo: {
    alignSelf: "flex-start",
    width: 75,
    height: 80,
    marginLeft: 30,
    marginTop: 40,
    marginBottom: 15
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
    marginTop: 30,
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
    fontFamily: "HkGrotesk_Italic",
    fontSize: 20
  },
  ageInput: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    marginBottom: 10,
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
    marginTop: 50,
    marginBottom: 10,
  }
});

export default connect(
  null,
  mapDispatchToProps
)(ChooseNameAndHandle);
