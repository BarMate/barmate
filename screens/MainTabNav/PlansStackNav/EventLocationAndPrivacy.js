import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Toast, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation, SafeAreaView } from 'react-navigation';
import Variables from "../../../config/Variables.js";
import COLORS from '../../../config/Colors.js'
import { LinearGradient } from "expo";
import { sendEventInfo } from '../../../redux/actions/PlansActions'
import firebase from '../../../config/Firebase';
import EventPrivacySwitch from '../../../components/EventPrivacySwitch.js';
import PlansLocations from '../../../components/PlansLocations.js'

class EventLocationAndPrivacy extends Component {

	static navigationOptions = ({navigation}) => {
        return{
          headerTitle: <Text style={{fontFamily: 'HkGrotesk_Bold', fontSize: 20, color: 'white'}}>Privacy and Destinations</Text>,
        }
	};
	
	constructor(props) {
		super(props) 
		this.state = {
			userBarInfo: [],
			privacySetting: '',
			barsInPlan: [],
			isReady: false
		}
		this.selectedSwitch = this.selectedSwitch.bind(this);
		this.setBarsInPlan = this.setBarsInPlan.bind(this);
	}
	
	componentDidMount() {
		this.getUserBarsFromDB();
	}
	

	getUserBarsFromDB() {
		let uid = firebase.auth().currentUser.uid;
		let userBars = firebase.database().ref(`users/${uid}/bars`);
		var bars = []; 
		
		var barsPromise = new Promise((resolve, reject) => {
			userBars.once('value', snapshot => {
				snapshot.forEach((barChild) => {
					var childID = barChild.val();
					var childRef = firebase.database().ref('bars/' + childID);
					childRef.once('value', barSnap => {
						var barInfoWithKey = barSnap.val();
						barInfoWithKey.key = barSnap.key;
						bars.push(barInfoWithKey);
						if(bars.length === snapshot.numChildren()){
							resolve(bars);
						}
					})
				})
			})
		});

		barsPromise.then((fullBarList) => {
			this.sortArrayAlphabetically(fullBarList);
		});
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
		this.setState({
			userBarInfo: arr,
			isReady: true
		});
	}
	
	selectedSwitch(setting){
		this.setState({
			privacySetting: setting
		});
		console.log(setting);
	}

	setBarsInPlan(plan){
		this.setState({barsInPlan: plan});
	}

	setPlanObjectForStore(){
        let planObject = {
            creator: this.props.creatorObject.creator,
            eventName: this.props.creatorObject.eventName,
            description: this.props.creatorObject.description,
			startTime: this.props.creatorObject.startTime,
			barsInPlan: this.state.barsInPlan,
			privacy: this.state.privacySetting
        }
        this.props.sendEventInfo(planObject);
        console.log(planObject);
        this.props.navigation.push('InviteFriends')
    }

	_confirmDetails() {
        // called when user hits next
        // - checks to see if events have been selected
        
        if(this.state.barsInPlan.length === 0) {
            Toast.show({
				style: {
				  backgroundColor: "#6D6ABF",
				  borderRadius: 15,
			  },
			  text: "Select at least one location for your event.",
			  buttonText: "OK",
			  duration: 3000,
			  position: 'bottom',
			  })
		}
        else{
            this.setPlanObjectForStore();
        }
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
					<View style={{alignItems: 'center'}}>
						<EventPrivacySwitch handler={this.selectedSwitch}/>
					</View>
					<View style={{alignItems: 'center'}}>
						<PlansLocations handler={this.setBarsInPlan} bars={this.state.userBarInfo}/>
					</View>
					<TouchableOpacity onPress={() => {this._confirmDetails()}}>
						<View style={styles.buttonContainer}>
							<Text style={styles.buttonText}>Next</Text>
						</View>
                    </TouchableOpacity>
				</SafeAreaView>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	gradient: {
		width: Variables.deviceWidth,
		height: Variables.deviceHeight
	},
	safeAreaView: {
		flexDirection: 'column',
		justifyContent: 'center',
		paddingTop: 20,
	},
	buttonContainer: {
        marginTop: 30,
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


// Extract data from store
const mapStateToProps = state => ({ 
  creatorObject: state.plansReducer.planObject
})

const mapDispatchToProps = {
    sendEventInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EventLocationAndPrivacy));
