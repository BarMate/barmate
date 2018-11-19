//=============================================================
// Profile.js (component)
//
// A component for holding the characteristics of
// a barmate user profile.
//
// Author: Joseph Contumelio
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
} from 'react-native';

import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';
import { withNavigation } from 'react-navigation';
import firebase from '../config/Firebase';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text, Button, List, ListItem, } from 'native-base';
import {LinearGradient} from 'expo'

import Variables from '../config/Variables';
import COLORS from '../config/Colors.js';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            modalSettingsVisible: false,
            modalEditVisibles: false,
        };
        this.readUserData();
    }

    componentDidMount() {
        // this.readUserData();
    }

    readUserData() {
        var profileRef = firebase.database().ref('/users/j000000001');
        profileRef.once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path
            this.setState({ stores: snapshot.val() })
          });
    };

    setSettingsModalVisible(visible) {
        this.setState({modalSettingsVisible: visible});
    }

    setEditModalVisible(visible) {
        this.setState({modalEditVisibles: visible});
    }

    /*this.state.stores.name*/

    // FIX: For some reason, when signing out, the header on the login screen pops up for a split second

    _signOutAsync = async () => {
        firebase.auth().signOut().then( () => {
             AsyncStorage.clear().then(async () => {
                this.props.navigation.navigate('SignUp');
            }).catch(function(error){
                console.log(error);
            })
          }).catch(function(error) {
            console.log(error);
          });
    };

    render() {
        return (
        <View style={styles.gradient}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalSettingsVisible}
                onRequestClose={() => {
                    alert('Hello');
                }}>
                <SafeAreaView style={{width: Variables.deviceWidth, height: Variables.deviceHeight, backgroundColor: '#302C9E'}}>
                    <StyleProvider style={getTheme(Common)}>
                        <Container>
                            <Header style={{backgroundColor: '#302C9E'}}>
                                <Left>
                                </Left>
                                <Body>
                                    <Title>Settings</Title>
                                </Body>
                                <Right>
                                    <TouchableOpacity onPress={() => {this.setSettingsModalVisible(false)}}>
                                        <Icon name='close' style={{color: '#FFFFFF', fontSize: 50,}}/>
                                    </TouchableOpacity>
                                </Right>
                            </Header>
                            <Content style={{backgroundColor: '#302C9E'}}>
                            <List>
                                <ListItem>
                                <Text>About</Text>
                                </ListItem>
                                <ListItem onPress={() => {
                                    Alert.alert(
                                        'Log out',
                                        'Are you sure you\'d like to sign out?',
                                        [
                                          {text: 'Cancel', style: 'cancel'},
                                          {text: 'Yes', onPress: () => {this._signOutAsync()}},
                                        ],
                                        { cancelable: false }
                                      )
                                }}>
                                <Text style={{color: 'red'}}>Log Out</Text>
                                </ListItem>
                            </List>
                            </Content>
                        </Container>
                    </StyleProvider>
                </SafeAreaView>
            </Modal>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalEditVisibles}
                onRequestClose={() => {
                    alert('Hello');
                }}>
                <SafeAreaView style={{width: Variables.deviceWidth, height: Variables.deviceHeight, backgroundColor: '#42137B'}}>
                    <StyleProvider style={getTheme(Common)}>
                        <Container>
                            <Header style={{backgroundColor: '#42137B'}}>
                                <Left>
                                </Left>
                                <Body>
                                    <Title>Edit Profile</Title>
                                </Body>
                                <Right>
                                    <TouchableOpacity onPress={() => {this.setEditModalVisible(false)}}>
                                        <Icon name='close' style={{color: '#FFFFFF', fontSize: 50,}}/>
                                    </TouchableOpacity>
                                </Right>
                            </Header>
                            <Content style={{backgroundColor: '#42137B'}}>
                            <List>
                                <ListItem>
                                <Text>Profile Picture</Text>
                                </ListItem>
                                <ListItem>
                                <Text>Handle</Text>
                                </ListItem>
                                <ListItem>
                                <Text>Age</Text>
                                </ListItem>
                                <ListItem>
                                <Text>Bio</Text>
                                </ListItem>
                            </List>
                            </Content>
                        </Container>
                    </StyleProvider>
                </SafeAreaView>
            </Modal>
            <StyleProvider style={getTheme(Common)}>
                <Container>
                    <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => {this.setSettingsModalVisible(true)}}>
                            <Icon name='ios-settings' style={{color: '#FFFFFF', fontSize: 25,}}/>
                        </TouchableOpacity>
                    </Right>
                    </Header> 
                    <Content scrollEnabled={false}>
                    <LinearGradient style={styles.gradient} colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                        <Grid>
                            <Row style={{backgroundColor: 'rgba(0,0,0,0.0)'}} size={45}>
                                <Body>
                                    <Image
                                        style={styles.profile_picture}
                                        source={require('../assets/global/profile_picture_template.png')}/>
                                    <Text style={styles.name}>Joseph</Text>
                                    <Text style={styles.handle}>@joegainz</Text> 
                                </Body>
                            </Row>

                            <Row style={{backgroundColor: 'rgba(0,0,0,0.0)', alignItems: 'center',}} size={10}>
                                <Col style={{backgroundColor: 'rgba(0,0,0,0.0)'}} size={49}>
                                    <Body>
                                        <Text style={styles.subtitle}>20</Text> 
                                        <Text style={{fontSize: 15}}>years old</Text>
                                    </Body>
                                </Col>
                                <Col style={{backgroundColor: '#2dc'}} size={1}>
                                </Col>
                                <Col style={{backgroundColor: 'rgba(0,0,0,0.0)', alignItems: 'center'}} size={50}>
                                    <Body>
                                        <Text style={styles.text}>234</Text>
                                        <Text style={{fontSize: 15}}>points</Text>
                                    </Body>
                                </Col>
                            </Row>

                            <Row style={{backgroundColor: 'rgba(0,0,0,0.0)', justifyContent: 'center'}} size={45}>
                                <Row style={{backgroundColor: 'rgba(0,0,0,0.0)', justifyContent: 'center'}} size={60}>
                                    <Text style={styles.bio}>"This is my greatest bio"</Text> 
                                </Row>
                                
                                <Button rounded style={styles.button} onPress={() => {this.setEditModalVisible(true)}}> 
                                    <Body>
                                        <Text style={styles.text}>Edit Profile</Text>
                                    </Body>
                                </Button>
                            </Row>
                        </Grid>
                    </LinearGradient>
                </Content>
                </Container>
            </StyleProvider>
        </View>
        );
    }
    
}

const styles = StyleSheet.create({
    profile_picture: {
        marginTop: 50,
        width: 180,
        height: 180,
    },
    name: {
        fontSize: 35,
    },
    handle: {
        fontSize: 20,
    },
    subtitle: {
        fontSize: 25,
    },
    bio: {
        paddingTop: 20,
        fontSize: 18,
        fontStyle: 'italic',
    },
    gradient: {
        width: Variables.deviceWidth,
        height: Variables.deviceHeight,
    },
    text: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    button: {
        marginTop: 130,
        position: 'absolute',
        width: 150,
        backgroundColor: '#6D6ABF',
    },
});

export default Profile;