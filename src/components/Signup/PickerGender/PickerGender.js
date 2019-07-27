import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styles, pickerSelectStyles } from './styles';

class PickerBirthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        stub: [
            {
                label: 'Test',
                value: 'test',
            },
            {
                label: 'Test2',
                value: 'test2',
            }
        ]
    };
  }

  render() {
    return (
        <RNPickerSelect 
            style={pickerSelectStyles}
            items={this.state.stub}
            onValueChange={(value, index) => this.setState({value: value})}
            placeholder={{ value: 'birthday', label: 'Enter your gender...'}}
        />
    );
  }
}

export default PickerBirthday;
