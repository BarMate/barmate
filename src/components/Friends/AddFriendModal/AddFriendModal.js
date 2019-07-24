import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

class AddFriendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.root}>
        <Modal style={styles.modal} animationInTiming={400} animationIn={'bounceInUp'} isVisible={this.props.modalVisible} onBackdropPress={() => console.log('Hook up to redux to close')}>
          <View style={styles.backdropContainer}>

          </View>
          <View style={styles.contentContainer}>

            <TouchableOpacity style={styles.addFriendViaPhotoLibrary}>
                <View style={styles.photoLibraryGlyphContainer}>
                    <Ionicons name={'ios-image'} size={styles.glyphSize} color={'#302C9E'} />
                </View>
                <View style={styles.photoLibraryTextContainer}>
                    <Text style={styles.photoLibraryText}>Scan users BarCode from Library</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addFriendViaCamera}>
                <View style={styles.cameraGlyphContainer}>
                    <Ionicons name={'ios-camera'} size={styles.glyphSize} color={'#302C9E'} />
                </View>
                <View style={styles.cameraTextContainer}>
                    <Text style={styles.cameraText}>Scan users BarCode from Camera</Text>
                </View>
            </TouchableOpacity>

          </View>
        </Modal>
      </View>
    );
  }
}

export default AddFriendModal;
