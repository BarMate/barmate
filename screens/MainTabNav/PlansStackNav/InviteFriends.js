import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation, SafeAreaView } from 'react-navigation';
import Variables from "../../../config/Variables.js";
import COLORS from '../../../config/Colors.js'
import { LinearGradient } from "expo";
import { sendEventInfo } from '../../../redux/actions/PlansActions'
import firebase from '../../../config/Firebase';
import FriendsSelectorForPlans from '../../../components/FriendsSelectorForPlans';

class InviteFriends extends Component {

	static navigationOptions = ({navigation}) => {
        return{
          headerTitle: <Text style={{fontFamily: 'HkGrotesk_Bold', fontSize: 20, color: 'white'}}>Invite your BarMates</Text>,
        }
	};
	
	constructor(props) {
		super(props) 
		this.state = {
			isReady: false,
			error: null,
			friendsInvited: []
		};
		this.friendList = [];
		this.sortArrayAlphabetically = this.sortArrayAlphabetically.bind(this);
		this.setInvitesInPlan = this.setInvitesInPlan.bind(this);
	}

	componentDidMount() {
		this.makeRemoteRequest();
	}

	makeRemoteRequest() {
		let uid = firebase.auth().currentUser.uid
		let usersRef = firebase.database().ref(`users/${uid}/friends`)
		var friends = [];

		var friendsPromise = new Promise((resolve, reject) => {
			usersRef.once('value', snapshot => {
				snapshot.forEach((child) => {
					var childID = child.val();
					console.log(childID);
					var childRef = firebase.database().ref('users/' + childID);
					childRef.once('value', friendSnap => {
						var friendInfoWithKey = friendSnap.val()
						friendInfoWithKey.key = friendSnap.key;
						friends.push(friendInfoWithKey);
						if(friends.length === snapshot.numChildren()){
							resolve(friends);
						}
					})
				}) // .then here returns error 
			}) // .then here returns empty array
		});

		friendsPromise.then((fullFriendsList) => {
			this.sortArrayAlphabetically(fullFriendsList)
		});
	};

	setInvitesInPlan(invites){
		this.setState({friendsInvited: invites});
	}

	sortArrayAlphabetically(array){
		arr = array.sort((a, b) => {
			var nameA = a.name.toLowerCase();
			var nameB = b.name.toLowerCase();

			if (nameA < nameB) //sort string ascending
				return -1;
			if (nameA > nameB)
				return 1;
			return 0; //default return value (no sorting)
		});
		this.friendList = arr;
		this.setState({isReady: true});
	}

	_confirmDetails(){
		if(this.state.friendsInvited.length === 0) {
            Toast.show({
				style: {
				  backgroundColor: "#6D6ABF",
				  borderRadius: 15,
			  },
			  text: "You must invite at least one friend.",
			  buttonText: "OK",
			  duration: 3000,
			  position: 'bottom',
			  })
		}
        else{
            this.setPlanObjectForStore();
        }
	}

	setPlanObjectForStore(){
		let planObject = {
            creator: this.props.creatorObject.creator,
            eventName: this.props.creatorObject.eventName,
            description: this.props.creatorObject.description,
			startTime: this.props.creatorObject.startTime,
			barsInPlan: this.props.creatorObject.barsInPlan,
			privacy: this.props.creatorObject.privacy,
			friendsInvited: this.state.friendsInvited
        }
		this.props.sendEventInfo(planObject);
		console.log(planObject);
		this.props.navigation.push('EventCreated');
	}

  	render() {
		if(!this.state.isReady){
			return(
				<View style={styles.loading}>
					<ActivityIndicator size='large' />
				</View>
			);
		}
		return (
			<LinearGradient
				style={styles.gradient}
				colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
				<SafeAreaView style={styles.safeAreaView}>
					<FriendsSelectorForPlans handler={this.setInvitesInPlan} friends={this.friendList}/>
					<TouchableOpacity onPress={() => this._confirmDetails()}>
						<View style={styles.buttonContainer}>
							<Text style={styles.buttonText}>Finish</Text>
						</View>
					</TouchableOpacity>
				</SafeAreaView>
			</LinearGradient>
		)
  	}
}

// Extract data from store
const mapStateToProps = state => ({ 
  creatorObject: state.plansReducer.planObject
})

const mapDispatchToProps = {
    sendEventInfo
}

const styles = StyleSheet.create({
	gradient: {
		width: Variables.deviceWidth,
		height: Variables.deviceHeight,
	},
	safeAreaView: {
		flexDirection: 'column',
		justifyContent: 'center',
	},
	buttonContainer: {
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: '#3999c9',
        width: 220,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: "HkGrotesk_Bold",
        fontSize: 25,
        color: "#ffffff"
	},
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center'
	  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(InviteFriends));
