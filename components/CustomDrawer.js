import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'

export default class CustomDrawer extends Component {

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
                <SafeAreaView style={styles.rootContainer} forceInset={{ top: 'always', horizontal: 'never' }}>
                    
                    <View style={styles.containerOne}>

                        <TouchableOpacity>
                            <Ionicons name={'ios-close'} size={40} color={'#ffffff'}/>
                        </TouchableOpacity>
                    
                    </View>

                    <View style={styles.containerTwo}>
                    
                        <View style={styles.imageContainer}>
                            
                            <TouchableOpacity>
                                <Image 
                                    source={require('../assets/login/defaultProfilePicture.png')}
                                    style={styles.imageProfilePicture}
                                />
                            </TouchableOpacity>

                        </View>

                        <View style={styles.textContainer}>
                            
                            <Text style={styles.name}>Joseph</Text>
                            <Text style={styles.handle}>@JoeBarmate</Text>

                        </View>

                    </View>

                    <View style={styles.containerThree}>
                        
                        <TouchableOpacity style={styles.buttonProfile}>

                            <Ionicons name={'md-person'} size={40} color={'#ffffff'}/>
                            <Text style={styles.textProfile}>Profile</Text>

                        </TouchableOpacity>
                     
                        <TouchableOpacity style={styles.buttonFriends}>

                            <Ionicons name={'md-people'} size={40} color={'#ffffff'}/>
                            <Text style={styles.textFriends}>Friends</Text>

                        </TouchableOpacity>

                    </View>

                    <View style={styles.containerFour}>

                        <TouchableOpacity style={styles.buttonSettings}>

                            <Ionicons name={'md-settings'} size={40} color={'#ffffff'}/>
                            <Text style={styles.textSettings}>Settings</Text>

                        </TouchableOpacity>

                    </View>

                </SafeAreaView>
        )
  }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    containerOne: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 15,
    },
    containerTwo: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerThree: {
        flex: 2,
    },
    containerFour: {
        flex: 5,
        flexDirection: 'column-reverse',
    },
    imageProfilePicture: {
        width: 110,
        height: 110,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    buttonProfile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    buttonFriends: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    name: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 20,
        color: '#ffffff',
    },
    handle: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: 15,
        color: '#ffffff',
    },
    textProfile: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: 20,
        color: '#ffffff',
        paddingLeft: 15,
    },
    textFriends: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: 20,
        color: '#ffffff',
        paddingLeft: 10,
    },
    buttonSettings: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20,
        paddingBottom: 10,
        flexDirection: 'row',
    },
    textSettings: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: 20,
        color: '#ffffff',
        paddingLeft: 10,
    },
})