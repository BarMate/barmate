import React, { Component } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, Keyboard} from 'react-native'
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation, SafeAreaView, } from 'react-navigation';
import Variables from "../../../../config/Variables.js";
import COLORS from '../../../../config/Colors.js'
import DateTimePicker from "react-native-modal-datetime-picker";
import { LinearGradient } from "expo";
import { sendEventInfo } from '../../../../redux/actions/PlansActions'
import firebase from '../../../../config/Firebase';

class TitleDateAndDescription extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            title: '',
            description: '',
            date: '--',
            month: 'Date   --',
            year: '----',
            selectedDateObject: null,
            time: '',
            handleValidFlag: false,
            handleTakenFlag: false,
            isDatePickerVisible: false,
            isTimePickerVisible: false
        }
    }

    _showDatePicker = () => {this.setState({ isDatePickerVisible: true }); Keyboard.dismiss();}
    _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

    _showTimePicker = () => {this.setState({ isTimePickerVisible: true }); Keyboard.dismiss();}
    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleDatePicked = (date) => {
        let selectedDate = new Date();
        selectedDate.setTime(date);
        this.setState({
          date: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
          selectedDateObject: selectedDate
        })
        this._hideDatePicker();
    };

      _handleTimePicked = (date) => {
        this.setState({time: date});
        this._hideTimePicker();
    };

    _displayToastToUser(type) {
        switch(type) {
          case 'noTitle': {
            Toast.show({
              style: {
                backgroundColor: "#6D6ABF",
                borderRadius: 15,
            },
            text: "It looks like you forgot to add a title.",
            buttonText: "OK",
            duration: 3000,
            position: 'bottom',
            })
            break;
          }
          case 'noDescription': {
            Toast.show({
              style: {
                backgroundColor: "#6D6ABF",
                borderRadius: 15,
            },
            text: "It looks like you forgot to add a description.",
            buttonText: "OK",
            duration: 3000,
            position: 'bottom',
            })
            break;
          }
          case 'noDate': {
            Toast.show({
              style: {
                backgroundColor: "#6D6ABF",
                borderRadius: 15,
            },
            text: "It looks like you forgot to add a date.",
            buttonText: "OK",
            duration: 3000,
            position: 'bottom',
            })
            break;
          }
          case 'noTime': {
            Toast.show({
              style: {
                backgroundColor: "#6D6ABF",
                borderRadius: 15,
            },
            text: "It looks like you forgot to add a start time.",
            buttonText: "OK",
            duration: 3000,
            position: 'bottom',
            })
            break;
          }
          case 'badTime': {
            Toast.show({
              style: {
                backgroundColor: "#6D6ABF",
                borderRadius: 15,
            },
            text: "Your start date can't have already begun.",
            buttonText: "OK",
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

    getStartTime(date, time){
        var startDate = date.setHours(time.getHours());
        startDate = date.setMinutes(time.getMinutes());
        return new Date(startDate);
        
    }

    _confirmDetails() {
        // called when user hits next
        // - checks to see if title, description, and date/time have been selected
        
        if(this.state.title.length === 0) {
            console.log('Title not entered')
            this._displayToastToUser('noTitle')
        }
        else if(this.state.description.length === 0) {
            console.log('Description not entered')
            this._displayToastToUser('noDescription')
        }
        else if(this.state.date === '--') {
            console.log('Date not entered')
            this._displayToastToUser('noDate')
        }
        else if(this.state.time === '') {
            console.log('Time not entered')
            this._displayToastToUser('noTime')
        }
        else if(Date.parse(this.getStartTime(this.state.selectedDateObject, this.state.time)) < Date.parse(new Date())){
            console.log('Event Date has already happened');
            this._displayToastToUser('badTime');
        }
        else{
            this.setPlanObjectForStore();
        }
    }

    setPlanObjectForStore(){
        let planObject = {
            creator: firebase.auth().currentUser.uid,
            eventName: this.state.title,
            description: this.state.description,
            startTime: this.getStartTime(this.state.selectedDateObject, this.state.time),
        }
        this.props.sendEventInfo(planObject);
        console.log(planObject);
        this.props.navigation.push('EventLocationAndPrivacy')
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <LinearGradient
                    style={styles.gradient}
                    colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                    <KeyboardAvoidingView style={styles.eventInfoContainer} behavior="padding">
                        <View style={styles.titleInputWrapper}>
                            <Image
                                style={styles.textboxImage}
                                source={require("../../../../assets/signup/name_text_box.png")}
                            />
                            <TextInput
                                ref={input => { this.handleInput = input}}
                                style={styles.title}
                                autoFocus={false}
                                placeholder={"Event Title"}
                                placeholderTextColor={"#000000"}
                                value={this.state.name}
                                returnKeyType={'next'}
                                maxLength={140}
                                keyboardAppearance={'dark'}
                                onChangeText={data => { this.setState({title: data}); }}
                                blurOnSubmit={false}
                                onSubmitEditing={() => { this.handleInput.focus(); }}
                            />
                        </View>
                        <View style={styles.descriptionInputWrapper}>
                            <Image
                                style={styles.textboxImage}
                                source={require("../../../../assets/signup/name_text_box.png")}
                            />
                            <TextInput
                                ref={input => { this.handleInput = input}}
                                style={styles.description}
                                autoFocus={false}
                                placeholder={"Description"}
                                placeholderTextColor={"#000000"}
                                value={this.state.description}
                                multiline={true}
                                maxLength={400}
                                numberOfLines={8}
                                keyboardAppearance={'dark'}
                                onChangeText={data => { this.setState({description: data}); }}
                                blurOnSubmit={false}
                            />
                        </View>
                        <TouchableOpacity onPress={this._showDatePicker}>
                            <View style={styles.titleInputWrapper}>
                                <Image
                                    style={styles.textboxImage}
                                    source={require("../../../../assets/signup/age_text_box.png")}
                                />
                                <Text style={styles.date}>{this.state.month}/{this.state.date}/{this.state.year}</Text>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker 
                            isVisible={this.state.isDatePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDatePicker}
                            titleIOS={'Enter the Event Date'}
                            minimumDate={new Date()}
                        />
                        <TouchableOpacity onPress={this._showTimePicker}>
                            <View style={styles.titleInputWrapper}>
                                <Image
                                    style={styles.textboxImage}
                                    source={require("../../../../assets/signup/age_text_box.png")}
                                />
                                <Text style={styles.date}>{this.state.time ==='' ? 'Start Time' : this.state.time.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'})}</Text>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker 
                            isVisible={this.state.isTimePickerVisible}
                            mode={'time'}
                            is24Hour={false}
                            androidMode={"default"}
                            onConfirm={this._handleTimePicked}
                            onCancel={this._hideTimePicker}
                            titleIOS={'Enter the Event\'s Start Time'}
                        />
                        <TouchableOpacity style={{flex:0.5}} onPress={() => {this._confirmDetails()}}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Next</Text>
                            </View>
                        </TouchableOpacity>
                        {/* To be removed */}
                        <TouchableOpacity style={{flex:1}} onPress={() => {this.props.navigation.push('EventLocationAndPrivacy')}}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>ADMIN SKIP</Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>                        
                </LinearGradient>
            </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
    gradient: {
        width: Variables.deviceWidth,
        height: Variables.deviceHeight
    },
    safeAreaView: {
        flex:1,
    },
    eventInfoContainer:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleInputWrapper: {
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
    textboxImage: {
        padding: 10,
        width: 50,
        height: 50
    },
    title: {
        paddingLeft: 10,
        flex: 1,
        backgroundColor: "#ffffff",
        height: 50,
        fontFamily: 'HkGrotesk_Italic',
        fontSize: 20,
    },
    descriptionInputWrapper: {
        width: Variables.deviceWidth - 50,
        padding: 5,
        justifyContent: "center",
        alignSelf: 'center',
        backgroundColor: "#ffffff",
        flexDirection: "row",
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 20,
      },
    description: {
        paddingLeft: 10,
        flex: 4,
        backgroundColor: "#ffffff",
        height: 200,
        fontFamily: 'HkGrotesk_Italic',
        fontSize: 20,
    },
    date: {
        paddingLeft: 10,
        flex: 1,
        backgroundColor: "#ffffff",
        fontFamily: "HkGrotesk_Italic",
        fontSize: 20
    },
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: '#3999c9',
        width: 220,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: "HkGrotesk_Bold",
        fontSize: 25,
        color: "#ffffff"
    },
});

const mapDispatchToProps = {
    sendEventInfo
}

export default connect(null, mapDispatchToProps)(withNavigation(TitleDateAndDescription));