import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import Variables from "../../config/Variables.js";
import { Ionicons } from '@expo/vector-icons'


/*
    This component returns an Event card seen from the friend's screen (Friends.js)

    This Component takes in the following Props: 

        profilePicture - The profile picture of the user that created the event
        creator - name of the person who created the event
        eventName - Title for the event
        description - More info about the event
        numberInvited - Number of people invited
        numberAccepted - Number of people who accepted the invite
        locations - Bars that the event takes place at
        isPrivate - bool value - is the event private or not
            if True: friends that are invited to this event can NOT invite others
            if False: this event is open for friends to invite their friends to
        dateCreated - Date object of the event was created
        startTime - Date object of the Date/Time that the event starts
*/
class EventCard extends Component {

    getCreationTime(time){
        timeNow = new Date();
        timeDiff = Math.abs(timeNow - time);
        console.log(time);
        console.log(timeNow);
        return('1d ago');
    }

    render() {
        return(
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <View style={styles.cardBackground}>
                <View style={styles.cardContents}>
                    <View style={{flexDirection: "row"}}>
                        <View style={styles.profilePictureView}/>
                        <View style={{flexDirection: "column"}}> 
                            <View style={{flexDirection: "row"}}>
                                <Text style={styles.creatorName}>{this.props.creator}</Text>
                                <Text style={{fontFamily: 'HkGrotesk_Regular'}}> created an event {this.getCreationTime(this.props.dateCreated)}</Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <Text style={styles.eventName} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.eventName}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontFamily: 'HkGrotesk_Regular'}} numberOfLines={3} ellipsizeMode={'tail'}>{this.props.description}</Text>
                    </View>
                    
                </View>
            </View>
        </View>
        
        )
    }
}


const styles = StyleSheet.create({
    cardBackground: {
        width: Variables.deviceWidth - 20,
        height: 175,
        marginTop: 20,
        backgroundColor: '#d8d8d8',
        flexDirection: "row"
      },
      creatorName: {
        paddingLeft: 8,
        fontFamily: 'HkGrotesk_Medium'
      },
      eventName: {
        paddingLeft: 8,
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 18
      },
      cardContents: {
        margin: 15,
        flexDirection: "column"
      },
      profilePictureView: {
        width: 75,
        height: 75,
        borderRadius: 75/2.0,
        backgroundColor: '#000000',
      },
      descriptionView: {

      }
});

export default EventCard;
