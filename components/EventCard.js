import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Variables from "../config/Variables.js";
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../config/Colors.js'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux';
import { sendCardObject } from '../redux/actions'

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
        comments - A JSON containing the following: 
            commentor - Firebase User ID (used to pull profile pictures)
            message - What the comment says
            timestamp - timestamp that the message was posted
        creatorUID - TEMPORARY - WILL BECOME CREATOR - UID of user who created the event. When passed to creator, we will need to get creator name from DB and use that for creator
*/
class EventCard extends Component {

    // This function takes in a Date object and determines how long ago the post was created
    getCreationTime(timeCreated){
        dateNow = new Date();
        dateCreated = new Date(timeCreated); 
        timeDiff = Math.abs(dateNow - dateCreated);
        dayDifference = Math.floor(timeDiff / (1000 * 3600 * 24));
        if(dayDifference == 0){  
            if(dateCreated.getHours() < 13)
                return('at ' + (dateCreated.getHours()) + ':' + (dateCreated.getMinutes() > 9 ? "" + dateCreated.getMinutes() : "0" + dateCreated.getMinutes()) + 'AM')
            else   
                return('at ' + (dateCreated.getHours()-12) + ':' + (dateCreated.getMinutes() > 9 ? "" + dateCreated.getMinutes() : "0" + dateCreated.getMinutes()) + 'PM')
        }
        else if(dayDifference <= 20)
            return (dayDifference + 'd ago');
        else
            // We use 'dateCreated.getMonth()+1' because getMonth returns 0-11 instead of 1-12
            return (this.getAbbreviatedMonth(dateCreated.getMonth()+1) + ' ' + dateCreated.getDate());
    }

    // This function exists instead of using toLocaleString because Android runs an older version of Javascript that doesn't support this function.
    // This issue has been reported to GitHub and has yet to be resolved.
    getAbbreviatedMonth(month){
        switch(month){
            case 1:   { return 'Jan'; }
            case 2:   { return 'Feb'; }
            case 3:   { return 'Mar'; }
            case 4:   { return 'Apr'; }
            case 5:   { return 'May'; }
            case 6:   { return 'Jun'; }
            case 7:   { return 'Jul'; }
            case 8:   { return 'Aug'; }
            case 9:   { return 'Sep'; }
            case 10:  { return 'Oct'; }
            case 11:  { return 'Nov'; }
            case 12:  { return 'Dec'; }
            default:    return 'null';
        }
    }

    setCardObjectForStore(){
        let cardObject = {
            creator: this.props.creator,
            profilePicture : this.props.profilePicture,
            eventName: this.props.eventName,
            description: this.props.description,
            numberInvited: this.props.numberInvited,
            numberAccepted: this.props.numberAccepted,
            locations: this.props.locations,
            isPrivate: this.props.isPrivate,
            dateCreated: this.getCreationTime(this.props.dateCreated),
            startTime: this.props.startTime,
            comments: this.props.comments,
            creatorUID: this.props.creatorUID,
        }
        this.props.sendCardObject(cardObject);
        this.props.navigation.push('CardDetails')
    }
    
    render() {
        return(
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <TouchableWithoutFeedback onPress={() => this.setCardObjectForStore()}>
                <View style={styles.cardBackground}>
                    <View style={styles.cardContents}>
                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectedProfile', {uid: this.props.creatorUID})}>
                                <View style={styles.profilePictureView}/>
                            </TouchableOpacity> 
                            <View style={{flexDirection: "column"}}> 
                                <View style={{flexDirection: "row"}}>
                                    <Text style={styles.creatorName}>{this.props.creator}</Text>
                                    <Text style={{fontFamily: 'HkGrotesk_Regular'}}> created an event {this.getCreationTime(this.props.dateCreated)}</Text>
                                </View>
                                <View style={{flexDirection: "row"}}>
                                    <Text style={styles.eventName} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.eventName}</Text>
                                    <View style={{alignItems: "center", justifyContent: "center"}}>
                                        {
                                            this.props.isPrivate ? <Ionicons name={'md-lock'} size={18} color={COLORS.GRADIENT_COLOR_1}/>
                                            : <Ionicons name={'md-unlock'} size={18} color={COLORS.GRADIENT_COLOR_2}/>
                                        }
                                    </View>
                                    
                                </View>
                                <View style={{flexDirection: "row"}}>
                                    <Text style={styles.eventDate} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.startTime}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{fontFamily: 'HkGrotesk_Regular'}} numberOfLines={3} ellipsizeMode={'tail'}>{this.props.description}</Text>
                        </View>
                        <View style={{position: 'absolute', bottom: 5, flexDirection: 'row' }}>
                            <Ionicons name={'ios-text'} size={20} color={COLORS.GRADIENT_COLOR_1} />
                            <Text style={{paddingLeft: 2}}>{this.props.comments.length}</Text>
                            <Text style={styles.invitedView}>Invited: {this.props.numberInvited}</Text>
                            <Text style={styles.acceptedView}>Accepted: {this.props.numberAccepted}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
        
        )
    }
}

const mapDispatchToProps = {
    sendCardObject
}


const styles = StyleSheet.create({
    cardBackground: {
        width: Variables.deviceWidth - 20,
        height: 175,
        marginTop: 20,
        backgroundColor: '#d8d8d8',
        flexDirection: "row",
        borderRadius: 5,
      },
      creatorName: {
        paddingLeft: 8,
        fontFamily: 'HkGrotesk_Medium'
      },
      eventName: {
        paddingLeft: 8,
        paddingRight: 8,
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 18
      },
      eventDate: {
        paddingLeft: 8,
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 14
      },
      cardContents: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 20,
        flexDirection: "column"
      },
      profilePictureView: {
        width: 75,
        height: 75,
        borderRadius: 75/2.0,
        backgroundColor: '#000000',
      },
      invitedView: {
        fontFamily: 'HkGrotesk_Italic',
        paddingLeft: 20
      },
      acceptedView: {
        fontFamily: 'HkGrotesk_Italic',
        paddingLeft: 8
      },
});

export default connect(null, mapDispatchToProps)(withNavigation(EventCard));
