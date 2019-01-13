import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native'
import { NavigationActions } from 'react-navigation';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { DrawerActions } from 'react-navigation'
import { toggleSettings } from '../redux/actions/SettingsActions'

import Settings from '../screens/Settings'

class CustomDrawer extends Component {

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <SafeAreaView style={styles.rootContainer} forceInset={{ top: 'always', horizontal: 'never' }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modal}
                    onRequestClose={() => {
                        console.log('Modal closed');
                    }}
                >
                    <Settings />

                </Modal>
                <View style={styles.containerOne}>

                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.closeDrawer())}>
                        <Ionicons name={'ios-close'} size={40} color={'#ffffff'}/>
                    </TouchableOpacity>
                
                </View>

                <View style={styles.containerTwo}>
                
                    <View style={styles.imageContainer}>
                        
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            {
                                this.props.picture === '' ? 
                                <Image 
                                    style={styles.imageProfilePicture}
                                    source={require('../assets/login/defaultProfilePicture.png')}
                                /> :
                                <Image 
                                    style={[styles.imageProfilePicture, {borderRadius: 55}]}
                                    source={{uri: this.props.picture}}
                                />  
                            }
                        </TouchableOpacity>

                    </View>

                    <View style={styles.textContainer}>
                        
                        <Text style={styles.name}>{this.props.name}</Text>
                        <Text style={styles.handle}>@{this.props.handle}</Text>

                    </View>

                </View>

                <View style={styles.containerThree}>
                    
                    <TouchableOpacity style={styles.buttonHome} onPress={() => this.props.navigation.navigate('Home')}>

                        <Ionicons name={'ios-beer'} size={40} color={'#ffffff'}/>
                        <Text style={styles.textHome}>Home</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonProfile} onPress={() => this.props.navigation.navigate('Profile')}>

                        <Ionicons name={'md-person'} size={40} color={'#ffffff'}/>
                        <Text style={styles.textProfile}>Profile</Text>

                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.buttonFriends} onPress={() => this.props.navigation.navigate('Friends')}>

                        <Ionicons name={'md-people'} size={40} color={'#ffffff'}/>
                        <Text style={styles.textFriends}>Friends</Text>

                    </TouchableOpacity>

                </View>

                <View style={styles.containerFour}>

                    <TouchableOpacity style={styles.buttonSettings} onPress={() => this.props.toggleSettings(true)}>

                        <Ionicons name={'md-settings'} size={40} color={'#ffffff'}/>
                        <Text style={styles.textSettings}>Settings</Text>

                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        )
  }
}

const mapStateToProps = state => ({
    picture: state.currentProfileReducer.picture,
    name: state.currentProfileReducer.name,
    handle: state.currentProfileReducer.handle,
    modal: state.settingsReducer.modalVisible,
})

const mapDispatchToProps = {
    toggleSettings
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
        flex: 3,
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
    buttonHome: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
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
    textHome: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: 20,
        color: '#ffffff',
        paddingLeft: 16,
    },
    textFriends: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: 20,
        color: '#ffffff',
        paddingLeft: 10,
    },
    textSettings: {
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
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)