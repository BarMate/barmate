import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';

import EditProfilePictureButton from '../EditProfilePictureButton/EditProfilePictureButton';
import SaveButton from '../SaveButton/SaveButton';
import CancelButton from '../CancelButton/CancelButton';
import NameTextInput from '../NameTextInput/NameTextInput';
import BioTextInput from '../BioTextInput/BioTextInput';
import ShowFriendsToggle from '../ShowFriendsToggle/ShowFriendsToggle';
import ShowPlansToggle from '../ShowPlansToggle/ShowPlansToggle';

import styles from './styles';

class EditProfileRootView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Modal animationIn={'bounceInUp'} animationInTiming={600} style={{ margin: 0 }} isVisible={this.props.modalVisible}>
          <View style={styles.rootContainer}>
            <ScrollView contentContainerStyle={styles.scrollView}>

              <View style={styles.headerContainer}>
                <CancelButton style={styles.cancelButton} />
                <SaveButton style={styles.saveButton} />
              </View>

              <View style={styles.editProfilePictureContainer}>
                <EditProfilePictureButton />
              </View>

              <View style={styles.editNameContainer}>
                <NameTextInput />
              </View>

              <View style={styles.editBioContainer}>
                <BioTextInput />
              </View>

              <View style={styles.showFriendsToggleContainer}>
                <ShowFriendsToggle />
              </View>

              <View style={styles.showPlansToggleContainer}>
                <ShowPlansToggle />
              </View>

            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default EditProfileRootView;
