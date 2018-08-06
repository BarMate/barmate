import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, TabBarBottom } from 'react-navigation'; // Version can be specified in package.json
import { Ionicons } from '@expo/vector-icons'

import getTheme from '../native-base-theme/components';
import Common from '../native-base-theme/variables/commonColor';
import { Video } from 'expo';
import backgroundVideo from '../assets/login/background.mp4';

import { Container, Header, Footer, Title, Content, Left, Right, Body, Icon, StyleProvider, Text } from 'native-base';

// Used to help layout objects on the screen for compatibility between devices
// Google react native easy grid for more info
import { Col, Row, Grid } from 'react-native-easy-grid';

var { height, width } = Dimensions.get('window');

class Page1 extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(Common)}>
                <Container>
                    <Content scrollEnabled={false}>
                        <View style={{width: width, height: height}}>
                            <Video
                                isLooping
                                shouldPlay
                                source={ backgroundVideo }  
                                resizeMode="cover"
                                style={{width: width, height: height}} 
                            />
                            <View style={styles.components}>
                            <Grid>
                                <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                                    <Body>
                                        <Image
                                            style={styles.image}
                                            source={require('../assets/global/logo_final.png')}
                                        />
                                    </Body>
                                </Row>
                                <Row style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}}>
                                    <Body>
                                        <TouchableOpacity>
                                            <Image
                                                style={styles.button}
                                                source={require('../assets/login/facebook.png')}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Image
                                                style={styles.button}
                                                source={require('../assets/login/twitter.png')}
                                            />
                                        </TouchableOpacity>
                                    </Body>
                                    <View style={styles.footer}>
                                        <Text style={styles.footerText}>Already have an account? </Text>
                                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignIn')}}>
                                            <Text style={styles.signUpButton}>Sign in.</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Row>
                            </Grid>
                            </View>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
    
}

const styles = StyleSheet.create({ 
    container: {
        width: width,
        height: height,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    components: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    image: {
        width: 120,
        height: 80,
      },
    button: {
        marginTop: 10,
        width: width - 50,
        height: 45,
        borderRadius: 5,
    },
    footer: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 65,
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
      },
      footerText: {
        paddingTop: 10,
        paddingLeft: 110,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#080808',
        fontSize: 10,
        // borderColor: '#FFFFFF',   Used for testing
        // borderWidth: 1,
      },
      signUpButton: {
        paddingTop: 10,
        color: '#536497',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 10,
        // borderColor: '#FFFFFF',    Used for testing
        // borderWidth: 1,
      },
});

export default Page1;