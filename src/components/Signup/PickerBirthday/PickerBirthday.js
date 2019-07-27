import React, { Component } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import styles from './styles';

class PickerBirthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

  render() {
    return (
        <>
            <TouchableOpacity style={styles.rootContainer} onPress={this.showDateTimePicker}>
                <Text style={styles.buttonText}>Enter your birthday...</Text>
            </TouchableOpacity>
            <Text style={styles.bodyText}>You need to be at least 21 years old to use BarMate</Text>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
            />
        </>
    );
  }
}

export default PickerBirthday;