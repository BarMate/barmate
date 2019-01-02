import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
import firebase from '../config/Firebase.js';

import Dialog from 'react-native-dialog';       //Dialog component

class Delete extends React.Component{
    state = {
        dialogVisible: true
    }

    handleDelete() {
        var user = firebase.auth().currentUser;
        //console.log("User Token: ", user.uid);
        firebase.database().ref('users/').child(user.uid).remove();
        //database.remove();
        this.setState({dialogVisible: false});
        //console.log("User " + user.uid + " deleted!");
        firebase.auth().signOut();
    }

    handleCancel() {
        this.setState({dialogVisible: false});
        //console.log("They chose to cancel!");
    }

    render(){
        if(this.state.dialogVisible === true){
            return(
                <View>
                    <Dialog.Container visible={true}>
                        <Dialog.Title>Delete Account</Dialog.Title>
                        <Dialog.Description>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </Dialog.Description>
                        <Dialog.Button label="Delete Account" onPress={() => this.handleDelete()}/>
                        <Dialog.Button label="Cancel" onPress={() => this.handleCancel()}/>
                    </Dialog.Container>
                </View>
            );
        }
        else{
            return (
                <View>
                    <Dialog.Container visible={false}>
                        <Dialog.Title>Delete Account</Dialog.Title>
                        <Dialog.Description>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </Dialog.Description>
                        <Dialog.Button label="Delete Account" onPress={() => this.handleDelete()}/>
                        <Dialog.Button label="Cancel" onPress={() => this.handleCancel()}/>
                    </Dialog.Container>
                </View>
            );
        }
    }
}

export default Delete;