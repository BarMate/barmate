import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons } from '@expo/vector-icons'

// tab navigator screens
import HomeScreen from './screens/Home.js';
import SearchScreen from './screens/Search.js';
import MessageScreen from './screens/Message.js';
import ProfileScreen from './screens/Profile.js';
import SignUpScreen from './screens/SignUp.js';
//========================

import Page1 from './screens/Page1.js';
import Page2 from './screens/Page2.js';

// Native base used for the front end
// Use this instead of react native default styling
import getTheme from './native-base-theme/components';
import Common from './native-base-theme/variables/commonColor';
import { Form, Label, Input, Item, Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text, H1, H2, Button } from 'native-base';

// Used to help layout objects on the screen for compatibility between devices
// Google react native easy grid for more info
import { Col, Row, Grid } from 'react-native-easy-grid';

// Firebase backend for accounts, logging in, etc..
import * as firebase from 'firebase';

var firstTime = require('react-native-catch-first-time');
var DeviceInfo = require('react-native-device-info');
var startup = true;

firstTime('fbc9086d-e4b4-427e-8216-91ef3eac496b')
  .catch(function () {
    startup = true;
});


var { height, width } = Dimensions.get('window');

// just disables warnings, set to false if need be.
console.disableYellowBox = true;

/*
  This is the first page I made when redesigning this app so some of it needs to be changed
  We shouldnt be using the styling at the bottom for most of those things so we'll have to change that for example
  So if you see a lot of inconsistencies that's because i havent gone back and changed what I did before
*/

class SignInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      email: '',
      password: '',
      success: '',
    };
  }

  // Initializes our firebase account
  // I've been using my own one for testing
  // But if you want you can switch out the strings for the other ones from
  // the legacy app
  componentWillMount() {
    try{
      firebase.initializeApp({
        apiKey: 'AIzaSyDMGQVjqV0KZoN6QBL_pUy0I4231-_d5vM',
        authDomain: 'barmate-e9070.firebaseapp.com',
        databaseURL: 'https://barmate-e9070.firebaseio.com',
        projectId: 'barmate-e9070',
        storageBucket: 'barmate-e9070.appspot.com',
        messagingSenderId: '237955769821'
      })
    } catch(err) {
      // error messaged
    }
  }

  static navigationOptions = {
    header: null,
    headerMode: 'none',
  };

  _signInAsync = async () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(() => { AsyncStorage.setItem('userToken', 'success');
                                  this.props.navigation.navigate('AuthLoading'); 
                                })
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.', loading: false, success: '' })
                        alert('Invalid Username or password')
                      });
  };

  render() {
    return (
        <StyleProvider style={getTheme(Common)}>
            <Container>
              <Content scrollEnabled={false}>
                <View style={{width: width, height: height}}>

                    <Grid>
                      
                      {/* Houses the logo */}
                      <Row style={{backgroundColor: '#fec'}} size={1}>
                        <Grid>
                          <Row style={{backgroundColor: '#1c2e63'}} size={1}></Row>  {/*unused but needed*/}
                          <Row style={{backgroundColor: '#1c2e63'}} size={1}>
                            <Body>
                              <Image
                                style={styles.image}
                                source={require('./assets/login/title_logo.png')}
                              />
                            </Body>
                          </Row>
                        </Grid>
                      </Row>

                      {/* Houses the input text fields */}
                      <Row style={{backgroundColor: '#1c2e63'}} size={1}>
                        <Form style={{width: width, marginTop: 60}}>
                          <Item floatingLabel last>
                            <Label>Username</Label>
                            <Input value={this.state.email}
                                   onChangeText={email => this.setState({email})}/>
                          </Item>
                          <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input secureTextEntry
                                   value={this.state.password}
                                   onChangeText={password => this.setState({password})}/>
                          </Item>
                        </Form>
                      </Row>

                      {/* Houses the Log in button and footer */}
                      <Row style={{backgroundColor: '#1c2e63'}} size={1}>
                        <Button full style={{width: width, backgroundColor: '#536497'}} onPress={this._signInAsync.bind(this)}> 
                          <Text style={styles.text}>Log In</Text>
                        </Button>
                        <View style={styles.footer}>
                          <Text style={styles.footerText}>Don't have an account? </Text>
                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignUp')}}>
                            <Text style={styles.signUpButton}>Sign Up.</Text>
                          </TouchableOpacity>
                        </View>
                      </Row>

                    </Grid>

                  </View>
              </Content>
            </Container>
        </StyleProvider>
    )
  };
}

// Loads the right screen when user enters app
// If they are logged in, it will load the app
// if not, they are at the log in screen
class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c2e63',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF'
  },
  image: {
    width: 240,
    height: 120,
  },
  footer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 65,
    backgroundColor: '#030e2c',
  },
  footerText: {
    paddingTop: 10,
    paddingLeft: 110,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#536497',
    fontSize: 10,
    // borderColor: '#FFFFFF',   Used for testing
    // borderWidth: 1,
  },
  signUpButton: {
    paddingTop: 10,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 10,
    // borderColor: '#FFFFFF',    Used for testing
    // borderWidth: 1,
  },
});

// Creates the tab navigator for inside the app and the stack navigator for the log in and sign up screen
const AppTab = createBottomTabNavigator({ Home: HomeScreen, Search: SearchScreen, Message: MessageScreen, Profile: ProfileScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen });
const firstTime = createSwitchNavigator({page1: Page1, page2: Page2})

// Creates a switch navigator to switch between Apptab and Authstack depending on if logged in
export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppTab,
    Auth: AuthStack,
    firstTime: firstTime,
  },
  {
    initialRouteName: startup ? 'firstTime' : 'AuthLoading',
  },
);