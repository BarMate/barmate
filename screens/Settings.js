import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { toggleSettings } from '../redux/actions/SettingsActions'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView>
        <Text onPress={() => this.props.toggleSettings(false)}> textInComponent </Text>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = {
    toggleSettings
}

const styles = StyleSheet.create({

})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
