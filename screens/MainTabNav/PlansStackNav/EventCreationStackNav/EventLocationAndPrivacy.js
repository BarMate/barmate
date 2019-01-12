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

class EventLocationAndPrivacy extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			userBars: [],
		}
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

	render() {
		return (
		<SafeAreaView style={styles.safeAreaView}>
			<LinearGradient
				style={styles.gradient}
				colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
				
			</LinearGradient>
		</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	gradient: {
		width: Variables.deviceWidth,
		height: Variables.deviceHeight
	},
	safeAreaView: {
		flex:1,
		flexDirection: 'column',
		alignItems: 'center',
		
	}
});


// Extract data from store
const mapStateToProps = state => ({ 
  creatorObject: state.plansReducer.planObject
})


export default connect(mapStateToProps, null)(withNavigation(EventLocationAndPrivacy));
