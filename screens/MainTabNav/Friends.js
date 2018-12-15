import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import getTheme from "../../native-base-theme/components/index.js";
import Common from "../../native-base-theme/variables/commonColor.js";
import { LinearGradient } from "expo";
import Variables from "../../config/Variables.js";
import COLORS from "../../config/Colors.js";
import Profile from '../../components/Profile.js';
import { updateModal } from '../../redux/actions.js'
import { connect } from 'react-redux';

import {
    Container,
    Header,
    Title,
    Content,
    Left,
    Right,
    Body,
    StyleProvider,
  } from "native-base";

class FriendsScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
          modalVisible: false,
      };
  }

  render() {
    return (
        <StyleProvider style={getTheme(Common)}>
        <Container>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modal}>
            <Profile uid={'tpA4ijbBVhcQ8bu92XmsnJvsj1e2'}/>  
         </Modal>
          <Header>
            <Left style={{flex: 1}}>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Profile')}}>
                  <Ionicons name={'ios-contact'} size={30} color={'#FFFFFF'} style={{paddingLeft: 10}} />
              </TouchableOpacity>
            </Left>
            <Body style={{flex: 3, justifyContent: 'center',}}>
              <Title style={{alignSelf: 'center'}}>Friends</Title>
            </Body>
            <Right style={{flex: 1}}>
              <Ionicons name={'md-people'} size={30} color={'#FFFFFF'} style={{paddingRight: 10,}}/>
            </Right>
          </Header>
          <Content scrollEnabled={false}>
            <LinearGradient
              style={styles.gradient}
              colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
              <TouchableOpacity onPress={() => {this.props.updateModal(true)}}><Text>Open Rodney profile</Text></TouchableOpacity>
            </LinearGradient>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

// Extract data from store
const mapStateToProps = state => ({
  modal: state.profileReducer.modal,
})

// Dispatch data to store
const mapDispatchToProps = {
  updateModal,
}

const styles = StyleSheet.create({
    gradient: {
        width: Variables.deviceWidth,
        height: Variables.deviceHeight
      },
});
export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);
