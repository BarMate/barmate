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
} from 'react-native';

import { LinearGradient } from 'expo';

import { Ionicons } from '@expo/vector-icons';

import firebase from '../../config/Firebase.js';

import { Form, Label, Input, Item, Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text, H1, H2, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import getTheme from '../../native-base-theme/components/index.js';
import Common from '../../native-base-theme/variables/commonColor.js';

import Variables from '../../config/Variables.js';
import COLORS from '../../config/Colors.js';
export default class Signup_page1 extends React.Component {

    static navigationOptions = {
        header: null,
        headerVisible: false,
    };


        state = {
            isLoading: true,
            emailInputSuccess: null,
            passwordInputSuccess: null,
            email : '',
            password: '',
        };
    
    validateEmail = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false){
            this.setState({email:text, emailInputSuccess:false});
            return false;
        }
        else {
            this.setState({email:text, emailInputSuccess:true});
            return true;
        }
    }

    validatePassword = (text) => {
        var hasNumber = /\d/.test(text);
        var hasCapital = /[A-Z]/.test(text);

        let symbols = /[$-/:-?{-~@#!"^_`\[\]]/;
        var hasSymbol = symbols.test(text);


        if(text.length < 8 || !hasNumber || !hasCapital || !hasSymbol){
            this.setState({password:text, passwordInputSuccess:false});
            return false;
        }
        else{
            this.setState({password:text, passwordInputSuccess:true});
            return true;
        }   
    };

    render() {
        return (
        <StyleProvider style={getTheme(Common)}>
            <Container>
                <Content scrollEnabled={false}>
                    <LinearGradient style={styles.gradient} colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                        <View style={{width: Variables.deviceWidth, height: Variables.deviceHeight}}>
                            <Grid>
                                {/* Houses the logo */}
                                <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={0.9}>
                                    <Grid>
                                        {/*unused but needed*/}
                                        <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={1}></Row>
                                        <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={1}>
                                            <Body>
                                                <Image
                                                style={styles.image}
                                                source={require('../../assets/login/title_logo.png')}
                                                />
                                            </Body>
                                        </Row>
                                    </Grid>
                                </Row>
                                <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={1}>
                                    <Form style={{width: Variables.deviceWidth, marginTop: 60}}>
                                        <Item floatingLabel underline last success={this.state.emailInputSuccess} error={!this.state.emailInputSuccess}>
                                            {/* padding is necessary to prevent the word "username" from getting cut off*/}
                                            <Label style={{paddingTop: 6}}>Email address</Label>
                                            <Input value={this.state.email}
                                                    onChangeText={(text) => this.validateEmail(text)}/>
                                                {(this.state.emailInputSuccess) ? <Icon name='checkmark-circle'/> : <Icon name='close-circle'/>}
                                            </Item>
                                        <Item floatingLabel last success={this.state.passwordInputSuccess} error={!this.state.passwordInputSuccess}>
                                            <Label>Password</Label>
                                            <Input secureTextEntry value={this.state.password}
                                                    onChangeText={(text) => this.validatePassword(text)}/>
                                                {(this.state.passwordInputSuccess) ? <Icon name='checkmark-circle'/> : <Icon name='close-circle'/>}
                                        </Item>
                                    </Form>
                                </Row>
                                <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={0.33}>
                                    <Button rounded style={{width: 150, backgroundColor: '#100D64', alignItems: 'center', justifyContent: 'center', marginLeft: (Variables.deviceWidth / 2) - (150 / 2) }} onPress={() => {this.props.navigation.navigate('p2')}}> 
                                        <Text style={styles.text}>Sign Up</Text>
                                    </Button>
                                </Row>
                                <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={0.33}>
                                    <View style={styles.externalOptions}>
                                        <Button style={[styles.circle, {backgroundColor: '#3C5A98'}]}>
                                        </Button>
                                        <View style={{paddingLeft: 15, paddingRight:15}}>
                                            <Button style={[styles.circle, {backgroundColor: '#1DA1F3'}]}>
                                            </Button>
                                        </View>
                                        <Button style={[styles.circle, {backgroundColor: '#F7F7F7'}]}>
                                        </Button>
                                    </View>
                                </Row>
                                <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}} size={0.33}>
                                    <View style={styles.footer}>
                                        <Text style={styles.footerText}>Already have an account? </Text>
                                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignIn')}}>
                                            <Text style={styles.signInButton}>Log In.</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Row>
                            </Grid>
                        </View>
                    </LinearGradient>
                </Content>
            </Container>
        </StyleProvider>
        );
    }
};







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
    circle: {
        width: 75,
        height: 75,
        borderRadius: 75/2.0,
        backgroundColor: 'red'
    },
    externalOptions: {
      flexDirection: 'row',
      position: 'absolute',
      width: Variables.deviceWidth,
      backgroundColor: 'rgba(52, 52, 52, 0.0)',
      justifyContent: 'center',
    },
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        width: Variables.deviceWidth,
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        justifyContent: 'center',
      },
    footerText: {
      paddingTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      color: '#536497',
      fontSize: 10,
      // borderColor: '#FFFFFF',   Used for testing
      // borderWidth: 1,
    },
    signInButton: {
      paddingTop: 10,
      color: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 10,
      // borderColor: '#FFFFFF',    Used for testing
      // borderWidth: 1,
    },
  });