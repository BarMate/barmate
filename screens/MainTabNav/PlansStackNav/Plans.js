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
          events: []

      };
  }

  componentDidMount() {
		this.makeRemoteRequest();
	}
  
	makeRemoteRequest() {
    let uid = firebase.auth().currentUser.uid;
    let userRef = firebase.database().ref(`users/${uid}/friends`);
    var eventSearchListByID = [];

    // puts IDs of all friends + own ID into eventSearchListByID then triggers the friendsPromise Promise
    var friendsPromise = new Promise((resolve, reject) => {
      userRef.once('value', snapshot => {
        snapshot.forEach(child => {
          eventSearchListByID.push(child.val());
          if(eventSearchListByID.length === snapshot.numChildren()){
            eventSearchListByID.push(uid);
            resolve(eventSearchListByID);
          }
        })
      })
    })
    
    // TODO: See which public events your friends have accepted
    var eventsAndTimestamps = [];
    var indexCounter = 0;
    var eventsPromise = new Promise((resolve, reject) => {
      friendsPromise.then((eventSearchListByID) => {
        comparison = eventSearchListByID.length;
        let eventsRef = firebase.database().ref(`events`);
        eventSearchListByID.forEach((friend) => {
          eventsRef.orderByChild('creator').equalTo(friend).once('value', (snapshot) => {
            snapshot.forEach((data) => {
              eventInfo = data.val();
              if(eventInfo.privacy === "public" || eventInfo.friendsInvited.includes(uid) || eventInfo.creator === uid){
                var dateInMiliseconds = Date.parse(eventInfo.startTime);
                var dateObject = new Date(dateInMiliseconds);
                eventsAndTimestamps.push({key: data.key, timestamp: dateObject});
              }
            })
            indexCounter++;
            if(indexCounter >= eventSearchListByID.length){
              resolve(eventsAndTimestamps);
            }
          })
        })
      })
    })

    // puts events in order by relevance and sets state for rendering
    eventsPromise.then((eventsAndTimestamps) => {
      eventsAndTimestamps.sort((a,b) => {
        var decision = a.timestamp - b.timestamp ? -1 : 1;
        return(decision);
      })

      var eventsInOrder = [];
      eventsAndTimestamps.forEach((element) => {
        eventsInOrder.push(element.key);
        console.log(element.key);
      })

      this.setState({events: eventsInOrder});
    })
  }

        
  render() {
    return (
        <StyleProvider style={getTheme(Common)}>
        <Container>
          <Content scrollEnabled={false} style={{paddingBottom: 20}}>
            <LinearGradient
              style={styles.gradient}
              colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                  <FlatList
                    contentContainerStyle={styles.contentContainer}
                    data={this.state.events}
                    renderItem={({item}) => 
                      <EventCard
                        event = {item}
                      />
                    }
                  />
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
