import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'; 
import getTheme from "../../../native-base-theme/components/index.js";
import Common from "../../../native-base-theme/variables/commonColor.js";
import { LinearGradient } from "expo";
import Variables from "../../../config/Variables.js";
import COLORS from "../../../config/Colors.js";
import firebase from '../../../config/Firebase';
import { updateModal } from '../../../redux/actions/PlansActions'
import { connect } from 'react-redux';
import EventCard from '../../../components/EventCard.js'
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

class PlansScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return{
      headerTitle: <Text style={{fontFamily: 'HkGrotesk_Bold', fontSize: 20, color: 'white'}}>Plans</Text>,
      headerRight: <TouchableOpacity onPress={() => {navigation.push('TitleDateAndDescription')}}><Ionicons name={'ios-add'} size={35} color={'#FFFFFF'} style={{paddingRight: 20}}/></TouchableOpacity>
    }
  };
    constructor(props) {
      super(props);
      var tempDate = new Date();
      this.state = {
          modalVisible: false,
          testObject: [
            {
              profilePicture: null,
              creator: 'Rodney Morgan',
              creatorUID: 'tpA4ijbBVhcQ8bu92XmsnJvsj1e2',
              eventName: 'Rodney\'s 22nd Birthday!',
              description: 'join me for my 22nd bday banger',
              numberInvited: 50,
              numberAccepted: 14,
              locations: [
                  "Manny's Pub", "Thursday's Lounge"
              ],
              isPrivate: false,
              dateCreated: new Date().setHours(tempDate.getHours() - 6),
              startTime: new Date().toLocaleString(),
              comments: [],
            }, 
            {
              profilePicture: null,
              creator: 'Joe Contumellio',
              creatorUID: 'c3TJEiWKKPZDmk7BYrZ8hhj5dDe2',
              eventName: 'Alcohol Anonymous Meeting',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              numberInvited: 23,
              numberAccepted: 8,
              locations: [
                  "Manny's Pub"
              ],
              isPrivate: true,
              dateCreated: new Date().setDate(tempDate.getDate()-20),
              startTime: new Date().toLocaleString(),
              comments: [
                {
                  commentorUID: 'tpA4ijbBVhcQ8bu92XmsnJvsj1e2',
                  message: 'Bro I\'m totally in!',
                  timestamp: new Date()
                }
              ],
            },
            {
              profilePicture: null,
              creator: 'Kevin Turner',
              creatorUID: 'tpA4ijbBVhcQ8bu92XmsnJvsj1e2',
              eventName: 'Skeet Shooting Bar Crawl',
              description: 'GRATATATATA! POW! POW! POW!!!! BANG!',
              numberInvited: 50,
              numberAccepted: 14,
              locations: [
                  "Manny's Pub", "Thursday's Lounge", "BullWinkles"
              ],
              isPrivate: true,
              dateCreated: new Date().setDate(tempDate.getDate()-31),
              startTime: new Date().toLocaleString(),
              comments: [
                {
                  commentor: 'tpA4ijbBVhcQ8bu92XmsnJvsj1e2',
                  message: 'It be like that sometimes',
                  timestamp: new Date()
                },
                {
                  commentor: 'tpA4ijbBVhcQ8bu92XmsnJvsj1e2',
                  message: 'That\'s the way she goes',
                  timestamp: new Date()
                },
              ],
            },
            {
              profilePicture: null,
              creator: 'Rodney Morgan',
              creatorUID: 'tpA4ijbBVhcQ8bu92XmsnJvsj1e2',
              eventName: 'Rodney\'s 22nd Birthday!',
              description: 'join me for my 22nd bday banger',
              numberInvited: 50,
              numberAccepted: 14,
              locations: [
                  "Manny's Pub", "Thursday's Lounge"
              ],
              isPrivate: false,
              dateCreated: new Date().setHours(tempDate.getHours() - 6),
              startTime: new Date().toLocaleString(),
              comments: [],
            }, 
        ]

      };
  }

  componentDidMount() {
		this.makeRemoteRequest();
	}


  fetchFriendPublicPlans(child, plans, uid) {
    let friend = firebase.database().ref('users/' + child.val() + '/events');
    // loops through each event that each friend has created
    friend.once('value', friendEvent => {
      if(friendEvent.val() != null){
        events = friendEvent.val();
        Object.entries(events).forEach( ([key, value]) => {
          eventDetailsCall = firebase.database().ref('events/' + value);
          eventDetailsCall.once('value', eventDetails => {
            eventPrivacy = eventDetails.val().privacy;
            if(eventPrivacy === 'hidden' || eventPrivacy === 'private'){
              // pushes event if you're invited
              eventDetails.val().friendsInvited.forEach(invitedMember => {
                if(invitedMember === uid){
                  plans.push(eventDetails.key)
                  return true;
                }
                else{
                  return false;
                }
              })
            }
            // pushes public events
            else{
              plans.push(eventDetails.key)
            }
          })
        })
      }
    })
  }

  fetchFriendCreatedPlans(child, plans, uid) {
    let friendInvites = firebase.database().ref('users/' + child.val() + '/invitedEvents');
    friendInvites.once('value', friendEvent => {
      if(friendEvent.val() != null){
        events = friendEvent.val();
        Object.entries(events).forEach( ([key, value]) => {
          eventDetailsCall = firebase.database().ref('events/' + value);
          eventDetailsCall.once('value', eventDetails => {
            eventPrivacy = eventDetails.val().privacy;
            if(eventPrivacy === 'public'){
              // pushes public events
              console.log('friend invited event public ' + eventDetails.key);
              plans.push(eventDetails.key)
            }
          })
        })
      }
    })
  }
  
	makeRemoteRequest() {
		let uid = firebase.auth().currentUser.uid
		let userRef = firebase.database().ref(`users/${uid}/friends`);
    let plans = [];
    // gets all friends
    var friendsPromise = new Promise((resolve, reject) => {
      userRef.once('value', snapshot => {
        // loops through each friend
        snapshot.forEach(child => {
          this.fetchFriendPublicPlans(child, plans, uid);
          this.fetchFriendCreatedPlans(child, plans, uid);
        })
      })
    })
    friendsPromise.then(plans => {
      this.printPlans(plans);
    })
  }
    
  printPlans(arr){
    console.log('The full array is' + arr);
  }
        
  render() {
    return (
        <StyleProvider style={getTheme(Common)}>
        <Container>
          <Content scrollEnabled={false} style={{paddingBottom: 20}}>
            <LinearGradient
              style={styles.gradient}
              colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                  {/* <FlatList
                    contentContainerStyle={styles.contentContainer}
                    data={this.state.testObject}
                    renderItem={({item}) => <EventCard
                      profilePicture = {item.profilePicture}
                      creator = {item.creator}
                      eventName = {item.eventName}
                      description = {item.description}
                      numberInvited = {item.numberInvited}
                      numberAccepted = {item.numberAccepted}
                      locations = {item.locations}
                      isPrivate = {item.isPrivate}
                      dateCreated = {item.dateCreated}
                      startTime = {item.startTime}
                      comments = {item.comments}
                      creatorUID = {item.creatorUID}
                      />}
                  /> */}
            </LinearGradient>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

// Extract data from store
const mapStateToProps = state => ({
  modal: state.friendsReducer.modal,
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
    contentContainer: {
      paddingBottom: Variables.deviceHeight * 0.22
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PlansScreen));
