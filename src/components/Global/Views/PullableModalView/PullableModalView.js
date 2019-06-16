import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Modal
} from "react-native";

import styles from './styles';

class PullableModalView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={styles.root}>
          {/* Pulldown bar Container */}
          <SafeAreaView style={styles.pulldownBarContainer}>
            <View style={styles.pulldownBar} />
          </SafeAreaView>

          {/* Content Container */}
          <View style={[styles.contentContainer, this.props.style]}>
            {this.props.children}
          </View>
        </View>
      </Modal>
    );
  }
}

export default PullableModalView;
