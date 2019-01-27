import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { withNavigation, SafeAreaView } from 'react-navigation';
import firebase from '../../../config/Firebase';
import COLORS from '../../../config/Colors.js';
import { LinearGradient } from "expo";
import Variables from "../../../config/Variables.js";

class EventCreated extends Component {
    static navigationOptions = ({navigation}) => {
        return{
          headerTitle: <Text style={{fontFamily: 'HkGrotesk_Bold', fontSize: 20, color: 'white'}}>Event Created</Text>,
        }
	};
    
	constructor(props) {
		super(props) 
		this.state = {
            isCreating: true
		};
    }
    
    componentDidMount(){
        this.createEvent();
    }

    createEvent(){
        let userID = firebase.auth().currentUser.uid;
        let newEventRef = firebase.database().ref('events');
        let userEventRef = firebase.database().ref(`users/${userID}/events`);
        let invitedFriends = this.props.creatorObject.friendsInvited;
        if (this.props.creatorObject) {
            newEventRef.push(this.props.creatorObject).then((ref) => {
                userEventRef.push(ref.key);
                invitedFriends.forEach((friend) => {
                    friendRef = firebase.database().ref(`users/${friend}/invitedEvents`);
                    friendRef.push(ref.key);
                })
            }).then(() => {
                this.setState({
                    isCreating: false
                })
            })
        }
    }
    render() {
        if(this.state.isCreating){
            return(
                <SafeAreaView style={styles.safeAreaView} forceInset={{ bottom: 'always' }}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.title}>Creating your event...</Text>
                            <ActivityIndicator size='large' />
                        </View>
                    </LinearGradient>
                </SafeAreaView>
            )
            
        }
        return (
            <SafeAreaView style={styles.safeAreaView} forceInset={{ bottom: 'always' }}>
                <LinearGradient
                    style={styles.gradient}
                    colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.created}>Your Event has been created</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Plans')}>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Return to Plans</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </SafeAreaView>
            
        )
    }
}

// Extract data from store
const mapStateToProps = state => ({ 
    creatorObject: state.plansReducer.planObject
})

const styles = StyleSheet.create({
	gradient: {
		width: Variables.deviceWidth,
        height: Variables.deviceHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: Variables.deviceWidth*0.08,
        color: 'white',
        fontFamily: 'HkGrotesk_Bold',
        marginBottom: 50
    },
    created: {
        fontSize: Variables.deviceWidth*0.08,
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'HkGrotesk_Bold',
        marginBottom: 50
    },
	safeAreaView: {
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
	},
	buttonContainer: {
        alignSelf: 'center',
        backgroundColor: '#3999c9',
        width: 220,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: "HkGrotesk_Bold",
        fontSize: 25,
        color: "#ffffff"
	},
	loading: {
		alignItems: 'center',
		justifyContent: 'center'
	  }
});

export default connect(mapStateToProps, null)(withNavigation(EventCreated));


