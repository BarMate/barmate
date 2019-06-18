//=============================================================
// SelectedUserProfile.js (component)
//
// A component for holding the characteristics of
// a barmate user profile.
//
// Author: Rodney Morgan
// Copyright(C) 2018, Barmate l.l.c.
// All rights reserved.
//=============================================================

import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    Alert,
    ScrollView,
    StatusBar,
    Text
} from 'react-native';

import { withNavigation } from 'react-navigation';
import firebase from '../../config/Firebase';
import {LinearGradient} from 'expo' 
import Variables from '../../config/Variables';
import COLORS from '../../config/Colors.js';
import { Ionicons } from "@expo/vector-icons";

import { connect } from 'react-redux';
import { updateName, updateBio, updateAge, updateHandle, updateKarma, updateModal, updateGender, updateInterest, updateLocation, updateColor, updatePicture } from '../../redux/actions/SelectedUserProfileActions';
import AsyncImage from '../AsyncImage';

class SelectedUserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePictureURL: '',
            uid: '',
            name: '',
            handle: '',
            karma: '',
            bio: '', 
            age: '',
            gender: '',
            location: '',
            interest: '',
			color: '',
			hasFinished: false
        };
    }

    componentDidMount() {    
        const { navigation } = this.props;
		var uid = navigation.getParam('uid', 'unknown');
        if(uid !== 'unknown') {
            this.setState({uid: uid}, () => {this._accessSelectedUserProfile();})
        }
    }

    returnUserBannerColor() {
        let color = this.state.color;
        switch(color) {
            case 'Red':
                return '#dd2846'
            case 'Blue':
                return '#3333cc'
            case 'Green': 
                return '#2c934c'
            case 'Purple':
                return '#642eaa'
            case 'Pink':
                return '#cc66cc'
            case 'White':
                return '#f4f4f4'
            case 'Black':
                return '#373737'
            case 'Orange':
                return '#ff9900'
            case 'Yellow': 
                return '#ddd82a'
            default:
                return '#3333cc'
        }
    }

    returnUserIconPicture(type) {
        let color = this.state.color;
        switch(type) {
            case 'Location': {
                switch(color) {
                    case 'Red': {
                        return (
                                <Image 
                                    style={styles.icon}
                                    source={require('../../assets/profile/red_glyph/location.png')}
                                />
                            )
                    }
                    case 'Blue': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/location.png')}
                            />
                        )
                    }
                    case 'Green': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/green_glyph/location.png')}
                            />
                        )
                    }
                    case 'Purple': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/purple_glyph/location.png')}
                            />
                        )
                    }
                    case 'Pink': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/pink_glyph/location.png')}
                            />
                        )
                    }
                    case 'White': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/white_glyph/location.png')}
                            />
                        )
                    }
                    case 'Black': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/black_glyph/location.png')}
                            />
                        )
                    }
                    case 'Orange': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/orange_glyph/location.png')}
                            />
                        )
                    }
                    case 'Yellow': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/yellow_glyph/location.png')}
                            />
                        )
                    }
                    default: {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/location.png')}
                            />
                        )
                    }
                }
            }
            case 'Gender': {
                switch(color) {
                    case 'Red': {
                        return (
                                <Image 
                                    style={styles.icon}
                                    source={require('../../assets/profile/red_glyph/gender.png')}
                                />
                            )
                    }
                    case 'Blue': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Green': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/green_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Purple': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/purple_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Pink': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/pink_glyph/gender.png')}
                            />
                        )
                    }
                    case 'White': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/white_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Black': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/black_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Orange': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/orange_glyph/gender.png')}
                            />
                        )
                    }
                    case 'Yellow': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/yellow_glyph/gender.png')}
                            />
                        )
                    }
                    default: {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/gender.png')}
                            />
                        )
                    }
                }                
            }
            case 'Interest': {
                switch(color) {
                    case 'Red': {
                        return (
                                <Image 
                                    style={styles.icon}
                                    source={require('../../assets/profile/red_glyph/interest.png')}
                                />
                            )
                    }
                    case 'Blue': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Green': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/green_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Purple': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/purple_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Pink': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/pink_glyph/interest.png')}
                            />
                        )
                    }
                    case 'White': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/white_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Black': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/black_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Orange': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/orange_glyph/interest.png')}
                            />
                        )
                    }
                    case 'Yellow': {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/yellow_glyph/interest.png')}
                            />
                        )
                    }
                    default: {
                        return (
                            <Image 
                                style={styles.icon}
                                source={require('../../assets/profile/blue_glyph/interest.png')}
                            />
                        )
                    }
                }                
            }
            default: 
                break;
        }
    }

    
    _accessSelectedUserProfile() {
        /* 
            Input: user data from db   Output: redux state of user data
            Similar to _initialReadFromDatabase but for viewing other user's profiles
        */
        let userUID = this.state.uid;
        let selectedUser = firebase.database().ref(`/users/${userUID}`);
        selectedUser.once('value').then(snapshot => {
            snapshot.forEach((child) => {
                switch(child.key) {
                    case 'name':
                        this.setState({name: child.val()})
                        break;
                    case 'handle':
                        this.setState({handle: child.val()})
                        break;
                    case 'karma':
                        this.setState({karma: child.val()})
                        break;
                    case 'bio':
                        this.setState({bio: child.val()})
                        break;
                    case 'age':
                        let bday = child.child('2');
                        let currentDate = new Date();
						let result = currentDate.getFullYear().valueOf() - bday.val();
                        this.setState({age: result})
                        break;
                    case 'gender':
                        this.setState({gender: child.val()})
                        break;
                    case 'location':
                        this.setState({location: child.val()})
                        break;
                    case 'interest':
                        this.setState({interest: child.val()})
                        break;
                    case 'color':
						this.setState({color: child.val()})
                        break;
                    default:
                        console.log('Could not find matching data for profile... continuing')
                        break;
                }  
            })
        }, () => {this.setState({hasFinished: true})})
	}
	
	returnProfilePicture(){
		return(<AsyncImage
			style={styles.profilePicture}
			uid={this.state.uid}/>)
	}

    render() {
        if(this.state.hasFinished == true){
            return (
                <View>
					<StatusBar barStyle="light-content" />
					<LinearGradient
					style={styles.gradient}
					colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
					>
						<SafeAreaView>
							<ScrollView style={{height: Variables.deviceHeight}}>
								<View style={styles.pictureAndBioContainer}>
									<View style={[styles.banner, {backgroundColor: this.returnUserBannerColor()}]}/>
									{ 
										this.state.uid === '' ? 
										<Image 
											style={styles.profilePicture}
											source={require('../../assets/login/defaultProfilePicture.png')}/>
										:
										<View style={styles.profilePicture}>
											{this.returnProfilePicture}
										</View>
									}
									<Text style={styles.bio}>"{this.state.bio}"</Text>
								</View>
								<View>
									<Text style={styles.name}>{this.state.name}, {this.state.age}</Text>
									<Text style={styles.handle}>@{this.state.handle}</Text>
									<Text style={styles.karma}>BarScore: {this.state.karma}</Text>
								</View>
								<View>
									{
										this.state.location ? 
										<View style={styles.location}>
											{this.returnUserIconPicture('Location')}
											<Text style={styles.locationText}>{this.state.location}</Text>
										</View>
										: null
									}
									{
										this.state.gender ? 
										<View style={styles.gender}>
											{this.returnUserIconPicture('Gender')}
											<Text style={styles.genderText}>{this.state.gender}</Text>
										</View>
										: null
									}
									{
										this.state.interest ? 
										<View style={styles.interest}>
											{this.returnUserIconPicture('Interest')}
											<Text style={styles.interestText}>{this.state.interest}</Text>
										</View>
										: null
									}
								</View>
								<View>
									<Text style={styles.favoriteBar}>Favorite Bar</Text>
								</View>
							</ScrollView>
						</SafeAreaView>
					</LinearGradient>
				</View>
        	);
		}
		
		//display that profile info isn't available right now in the future
        else{
            return(
                <View>
					<StatusBar barStyle="light-content" />
					<LinearGradient
					style={styles.gradient}
					colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}
					>
						<SafeAreaView>
							<ScrollView style={{height: Variables.deviceHeight}}>
								<View style={styles.pictureAndBioContainer}>
									<View style={[styles.banner, {backgroundColor: this.returnUserBannerColor()}]}/>
									{
										this.state.uid === '' ? 
										<Image 
											style={styles.profilePicture}
											source={require('../../assets/login/defaultProfilePicture.png')}/>
										:
										<View style={styles.profilePicture}>
											<AsyncImage
												style={styles.profilePicture}
												uid={this.state.uid}/>
										</View>
										
									}
									<Text style={styles.bio}>"{this.state.bio}"</Text>
								</View>
								<View>
									<Text style={styles.name}>{this.state.name}, {this.state.age}</Text>
									<Text style={styles.handle}>@{this.state.handle}</Text>
									<Text style={styles.karma}>BarScore: {this.state.karma}</Text>
								</View>
								<View>
									{
										this.state.location ? 
										<View style={styles.location}>
											{this.returnUserIconPicture('Location')}
											<Text style={styles.locationText}>{this.state.location}</Text>
										</View>
										: null
									}
									{
										this.state.gender ? 
										<View style={styles.gender}>
											{this.returnUserIconPicture('Gender')}
											<Text style={styles.genderText}>{this.state.gender}</Text>
										</View>
										: null
									}
									{
										this.state.interest ? 
										<View style={styles.interest}>
											{this.returnUserIconPicture('Interest')}
											<Text style={styles.interestText}>{this.state.interest}</Text>
										</View>
										: null
									}
								</View>
								<View>
									<Text style={styles.favoriteBar}>Favorite Bar</Text>
								</View>
							</ScrollView>
						</SafeAreaView>
					</LinearGradient>
				</View>
            );
        }
    }   
}
  
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        width: Variables.deviceWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 50,
    },
    gradient: {
        width: Variables.deviceWidth,
        height: Variables.deviceHeight,
    },
    profilePicture: {
        borderRadius: 90,
        width: 180,
        height: 180,
    },
    pictureAndBioContainer: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    settings: {
        marginRight: 20,
        justifyContent: 'flex-end'
    },
    headerTitle: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 30,
        color: '#ffffff',
        marginLeft: 20,
        marginRight: 'auto',
    },
    banner: {
        height: 120,
        width: Variables.deviceWidth,
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute'
    },
    bio: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        color: '#ffffff',
        flexWrap: 'wrap',
        flex: 1,
        alignSelf: 'center',
    },
    name: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 30,
        marginLeft: 20,
        color: 'white'
    },
    handle: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 20,
        marginLeft: 20,
        color: 'white'
    },
    karma: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 40,
        color: 'white'
    },
    icon: {
        width: 50,
        height: 50,
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20,
    },
    gender: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20,
    },
    interest: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20,
    },
    locationText: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 20,
        marginLeft: 10,
        color: 'white'
    },
    genderText: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 20,
        marginLeft: 10,
        color: 'white'
    },
    interestText: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: 20,
        marginLeft: 10,
        color: 'white'
    },
    favoriteBar: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 30,
        marginLeft: 20,
        marginTop: 40,
        color: 'white'
    }
});

export default withNavigation(SelectedUserProfile);