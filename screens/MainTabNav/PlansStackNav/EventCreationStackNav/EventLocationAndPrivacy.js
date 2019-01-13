import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { Toast, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation, SafeAreaView } from 'react-navigation';
import Variables from "../../../../config/Variables.js";
import COLORS from '../../../../config/Colors.js'
import { LinearGradient } from "expo";
import { sendEventInfo } from '../../../../redux/actions/PlansActions'
import firebase from '../../../../config/Firebase';
import EventPrivacySwitch from '../../../../components/EventPrivacySwitch.js';

class EventLocationAndPrivacy extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			userBarKeys: [],
			userBarInfo: [],
			privacySetting: ''
		}
		this.selectedSwitch = this.selectedSwitch.bind(this);
	}

	componentDidMount() {
		this.getUserBarsFromDB();
	}

	getUserBarsFromDB = () => {
		let uid = firebase.auth().currentUser.uid;
		let userBars = firebase.database().ref(`users/${uid}/bars`);
		let publicBars = firebase.database().ref(`bars`);

		userBars.on('value', snapshot => {
			snapshot.forEach(userChild => {
				publicBars.once('value', snapshot => {
					snapshot.forEach(barChild => {
						if(userChild.val() === barChild.key) {
							//add key for flatlist reference
							var barInfoWithKey = barChild.val();
							barInfoWithKey.key = barChild.key;
							this.state.userBarInfo.push(barInfoWithKey);							
						}
					})
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
					<View style={{alignItems: 'center'}}>
						<EventPrivacySwitch handler={this.selectedSwitch}/>
					</View>
					<View>
						<FlatList
							style={{paddingTop: 20}}
							data={this.state.userBarInfo}
							renderItem={({ item }) => (
								<View style={styles.flatListElement}>
									<Text style={styles.flatListElementText}>{item.name}</Text>
								</View>
							)}
						/>
					</View>
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
	flatListElement: {
		width: Variables.deviceWidth - 50,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        backgroundColor: "#ffffff",
        flexDirection: "row",
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 20,
	},
	flatListElementText: {
        paddingLeft: 10,
        backgroundColor: "#ffffff",
        height: 50,
        fontFamily: 'HkGrotesk_Italic',
        fontSize: 20,
    },
	gradient: {
		width: Variables.deviceWidth,
		height: Variables.deviceHeight
	},
	safeAreaView: {
		flexDirection: 'column',
		justifyContent: 'center',
		paddingTop: 20,
		paddingBottom: Variables.deviceHeight * 0.22
	}
});


// Extract data from store
const mapStateToProps = state => ({ 
  creatorObject: state.plansReducer.planObject
})


export default connect(mapStateToProps, null)(withNavigation(EventLocationAndPrivacy));
