import React, { Component } from 'react'
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, Picker} from 'react-native'
import { Toast, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation, SafeAreaView } from 'react-navigation';
import Variables from "../../../../config/Variables.js";
import COLORS from '../../../../config/Colors.js'
import { LinearGradient } from "expo";
import { sendEventInfo } from '../../../../redux/actions'
import firebase from '../../../../config/Firebase';
import EventPrivacySwitch from '../../../../components/EventPrivacySwitch.js';

class EventLocationAndPrivacy extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			userBars: [],
			privacySetting: ''
		}
		this.selectedSwitch = this.selectedSwitch.bind(this)
		this.getBarsFromUser();
	}

	getBarsFromUser = () => {
		let uid = firebase.auth().currentUser.uid;

        let usersRef = firebase.database().ref(`users/${uid}/bars`)
        usersRef.once('value', snapshot => {
            snapshot.forEach(child => {
				console.log(child.val());
                firebase.database().ref(`bars/`).orderByChild(`key`).equalTo(child.val()).on('value', bar => {
					console.log(bar);
					this.state.userBars.push(bar)
                })
            })
        })
	}
	selectedSwitch(setting){
		this.setState({
			privacySetting: setting
		});
		console.log(setting);
	}
	render() {
		return (
			<LinearGradient
				style={styles.gradient}
				colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
				<SafeAreaView style={styles.safeAreaView}>
					<EventPrivacySwitch handler={this.selectedSwitch}/>
				</SafeAreaView>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	gradient: {
		width: Variables.deviceWidth,
		height: Variables.deviceHeight
	},
	safeAreaView: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
		
	}
});


// Extract data from store
const mapStateToProps = state => ({ 
  creatorObject: state.plansReducer.planObject
})


export default connect(mapStateToProps, null)(withNavigation(EventLocationAndPrivacy));
