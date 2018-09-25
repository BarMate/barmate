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

import { Ionicons } from '@expo/vector-icons';

import firebase from '../config/Firebase.js';

import { Form, Label, Input, Item, Container, Header, Title, Content, Left, Right, Body, Icon, StyleProvider, Text, H1, H2, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';

import Variables from '../config/Variables.js';

export default class Signup_page1 extends React.Component {

    static navigationOptions = {
        header: null,
        headerVisible: false,
    };

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            error: '',
            email: '',
            password: '',
        };
    };
    
    signUp() {
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => { this.setState({ error: '', loading: false }); alert('User created!') })
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.', loading: false }); alert('Error when creating user!')})
    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <Text>Loading...</Text>
        }
        return <Button onPress={this.signUp.bind(this)} block light> <Text> Sign up </Text> </Button>;
    }

    render() {
        return (
        <StyleProvider style={getTheme(Common)}>
            <Container>
              <Content scrollEnabled={false}>
                <View style={{width: Variables.deviceWidth, height: Variables.deviceHeight}}>
                    <Grid>
                        <Row style={{backgroundColor: '#3F51B5'}}>
                            <Body>
                                <Form style={{width: Variables.deviceWidth, marginTop: 60}}>
                                    <Item underline>
                                        <Input placeholder='Email address...'
                                               value={this.state.email}
                                               onChangeText={email => this.setState({email})} />
                                    </Item>
                                    <Item underline>
                                        <Input placeholder='Password' 
                                               secureTextEntry
                                               value={this.state.password}
                                               onChangeText={password => this.setState({password})} />
                                    </Item>
                                </Form>
                            </Body>
                        </Row>
                        <Row style={{backgroundColor: '#3F51B5'}}>
                            <Body>
                                {this.renderButtonOrLoading()}
                            </Body>
                        </Row>
                    </Grid>
                </View>
              </Content>
            </Container>
        </StyleProvider>
        );
    }
};
export class Signup_page2 extends React.Component {

    static navigationOptions = {
        header: null,
        headerVisible: false,
    };
    render() {
        return(
            <Text>page2</Text>
        );
    }
};
export class Signup_page3 extends React.Component {

    static navigationOptions = {
        header: null,
        headerVisible: false,
    };
    render() {
        return(
            <Text>page3</Text>
        );
    }
};
export class Signup_page4 extends React.Component {

    static navigationOptions = {
        header: null,
        headerVisible: false,
    };
    render() {
        return(
            <Text>page4</Text>
        );
    }
};
export class Signup_page5 extends React.Component {

    static navigationOptions = {
        header: null,
        headerVisible: false,
    };
    render() {
        return(
            <Text>page5</Text>
        );
    }
};
export class Signup_page6 extends React.Component {

    static navigationOptions = {
        header: null,
        headerVisible: false,
    };
    render() {
        return(
            <Text>page6</Text>
        );
    }
};