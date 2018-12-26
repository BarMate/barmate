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
import EventCard from '../../components/FriendsEventCard/EventCard.js'
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
          testObject: [
            {
              profilePicture: null,
              creator: 'Rodney Morgan',
              eventName: 'Rodney\'s 22nd Birthday!',
              description: 'join me for my 22nd bday banger',
              numberInvited: 50,
              numberAccepted: 14,
              locations: [
                  "Manny's Pub", "Thursday's Lounge"
              ],
              isPrivate: false,
              dateCreated: new Date().getDate()-5,
              startTime: new Date().toLocaleDateString()
            }, 
            {
              profilePicture: null,
              creator: 'Joe Contumellio',
              eventName: 'Alcohol Anonymous Meeting',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              numberInvited: 23,
              numberAccepted: 8,
              locations: [
                  "Manny's Pub"
              ],
              isPrivate: true,
              dateCreated: new Date().getDate()-20,
              startTime: new Date().toLocaleDateString()
            },
            {
              profilePicture: null,
              creator: 'Kevin Turner',
              eventName: 'Skeet Shooting Bar Crawl',
              description: 'join me for my 22nd bday banger',
              numberInvited: 50,
              numberAccepted: 14,
              locations: [
                  "Manny's Pub", "Thursday's Lounge", "BullWinkles"
              ],
              isPrivate: true,
              dateCreated: Math.abs(new Date().getDate()-27),
              startTime: new Date().toLocaleDateString()
            }
        ]

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
          <Content scrollEnabled={false} style={{paddingBottom: 20}}>
            <LinearGradient
              style={styles.gradient}
              colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
              {/* <TouchableOpacity onPress={() => {this.props.updateModal(true)}}><Text>Open Rodney profile</Text></TouchableOpacity> */}
              
              {/* TODO: add unique key to each */}
              {this.state.testObject.map(event => (
                  <EventCard
                    profilePicture = {event.profilePicture}
                    creator = {event.creator}
                    eventName = {event.eventName}
                    description = {event.description}
                    numberInvited = {event.numberInvited}
                    numberAccepted = {event.numberAccepted}
                    locations = {event.locations}
                    isPrivate = {event.isPrivate}
                    dateCreated = {event.dateCreated}
                    startTime = {event.startTime}
                  />
                ))}
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
