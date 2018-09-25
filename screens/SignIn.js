import React from 'react';
import {
    StatusBar,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
} from 'react-native';

import AuthLoadingScreen from '../components/Auth.js';
import { Form, Label, Input, Item, Container, Content, Body, StyleProvider, Text, Button, Toast } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';
import { LinearGradient } from 'expo';
import firebase from '../config/Firebase.js'

import Variables from '../config/Variables.js';
import COLORS from '../config/Colors.js';

class SignInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          error: '',
          email: '',
          password: '',
          success: '',
          showToast: false,
        };
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
                        <AuthLoadingScreen error='Authentication failed' loading={false} success=''/>
                        Toast.show({
                            style: {
                                backgroundColor: "#6D6ABF",
                                borderRadius: 15,
                            },
                            text: "Email or password is inccorect. Try again.",
                            buttonText: "Got it",
                            duration: 3000,
                            position: 'bottom',
                        })
                        });
    };

    render(){
        return(
            <StyleProvider style={getTheme(Common)}>
                <Container>
                <StatusBar barStyle="light-content" />
                <Content scrollEnabled={false}>
                    <LinearGradient style={styles.gradient} colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                    <Grid> 
                        {/* Houses the logo */}
                        <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={1}>
                        <Grid>
                            {/*unused but needed*/}
                            <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={1}></Row>
                            <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={1}>
                            <Body>
                                <Image
                                style={styles.image}
                                source={require('../assets/login/title_logo.png')}
                                />
                            </Body>
                            </Row>
                        </Grid>
                        </Row>

                        {/* Houses the input text fields */}
                        <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={1}>
                        <Form style={{width: Variables.deviceWidth, marginTop: 60}}>
                            <Item floatingLabel underline last>
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
                        <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={1}>
                            <Button rounded style={{width: 150, backgroundColor: '#100D64', marginLeft: (Variables.deviceWidth / 2) - (150 / 2) }} onPress={this._signInAsync.bind(this)}> 
                            <Body>
                                <Text style={styles.text}>Sign In</Text>
                            </Body>
                            </Button>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignUp')}}>
                            <Text style={styles.signUpButton}>Sign Up.</Text>
                            </TouchableOpacity>
                        </View>
                        </Row>

                            </Grid>
                        </LinearGradient>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradient: {
      width: Variables.deviceWidth,
      height: Variables.deviceHeight,
    },
    text: {
      fontSize: 20,
      color: '#FFFFFF'
    },
    image: {
      marginTop: 10,
      width: 120,
      height: 100,
    },
    footer: {
      marginTop: 10,
      flex: 1,
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      width: Variables.deviceWidth,
      height: 65,
      backgroundColor: 'rgba(52, 52, 52, 0.0)',
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

  export default SignInScreen;