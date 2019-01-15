import React, { Component } from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { selectMessageProfile } from '../redux/actions/FriendsActions'
import { connect } from 'react-redux';
import Variables from '../config/Variables';
import { withNavigation } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

class FriendsCard extends Component {

    constructor(props){
        super(props);
        this.state={
            recipient: ''
        }
    }

  openMessages() {
    var ids = this.props.ids;
    var names = this.props.names;

    console.log('Ids: ', ids)
    console.log('Names: ', names);

    for(i = 0; i < ids.length; i++){
        if(this.props.name === names[i]){
            this.state.recipient = ids[i];
            console.log('Final message recipient: ', this.props.name);
            console.log('Final message recipient id: ', this.state.recipient);

            this.props.selectMessageProfile(this.state.recipient);
            this.props.navigation.navigate('Message', {name: this.props.name, id: this.state.recipient});
        }
    }
  }

  render() {
    return (
        <TouchableOpacity style={styles.container}>
            <Image 
                style={styles.profilePicture}
                source={require('../assets/login/defaultProfilePicture.png')}
            />
            <Text style={styles.name}>{this.props.name}</Text>
            <TouchableOpacity style={styles.messageButton} onPress={() => this.openMessages()}>
                <Ionicons name={'md-chatboxes'} size={40} color={'#3999c9'}/>
            </TouchableOpacity>
        </TouchableOpacity>
    )
  }
}

// Extract data from store
const mapStateToProps = state => ({
    friends: state.friendsReducer.friends
})

// Dispatch data to store
const mapDispatchToProps = {
    selectMessageProfile,
}

const styles = StyleSheet.create({
    container: {
        width: Variables.deviceWidth - 50,
        height: 60,
        backgroundColor: '#3999c9',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    name: {
        fontFamily: 'HkGrotesk_Bold',
        fontSize: 20,
        color: '#ffffff',
        marginLeft: 5,
    },
    messageButton: {
        borderRadius: 10,
        marginRight: 10,
        width: 50,
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    profilePicture: {
        marginLeft: 10,
        width: 50,
        height: 50,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(FriendsCard))