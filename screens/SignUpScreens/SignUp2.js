import React from 'react';
import {Text, Image, StyleSheet } from 'react-native';
import getTheme from '../../native-base-theme/components/index.js';
import Variables from '../../config/Variables.js';
import COLORS from '../../config/Colors.js';
import Common from '../../native-base-theme/variables/commonColor';
import { Header, Body, Container, Content, Item, Button, Icon, StyleProvider } from 'native-base';
import { LinearGradient, ImagePicker } from 'expo';
export default class Signup_page2 extends React.Component {
    //email: this.props.navigation.state.params.email,
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          error: '',
          email: 'test@gmail.com',
          name: '',
          age: '',
          image: '',
        };
    }

    static navigationOptions = {
        header: null,
        headerVisible: false,
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.setState({ image: result });
        }
    };
    render() {
        return(
            <StyleProvider style={getTheme(Common)}>
                <Container>
                    <Content scrollEnabled={false}>
                        <LinearGradient style={styles.gradient} colors={[COLORS.GRADIENT_COLOR_1, COLORS.GRADIENT_COLOR_2]}>
                            <Body>
                                <Item style={styles.noUnderline}>
                                    <Text style={{color: '#fff', fontSize: 32, paddingTop: 30}}>Hi.</Text>
                                </Item>
                                <Item style={[styles.noUnderline, {paddingTop: 80}]}>
                                {this.state.image ? (
                                    <Image source={{ uri: this.state.image.uri }} style={[styles.profilePicture, { width: 200, height: 200, borderRadius: 100 }]} />
                                ) : (
                                    <Image source={require('../../assets/login/defaultProfilePicture.jpg')} style={[styles.profilePicture, { width: 200, height: 200, borderRadius: 100 }]} />     
                                )}
                                </Item>

                                <Item style={styles.noUnderline}>
                                    <Button rounded style={styles.uploadButton} onPress={this._pickImage}>
                                        <Text style={styles.uploadButtonText}>Select</Text>
                                        <Icon type='MaterialIcons' name='add-a-photo' style={{ color: '#ffffff' }}/>
                                    </Button>
                                </Item>

                                <Item style={[styles.noUnderline, {flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}]}>
                                    <Text style={{color: '#fff', fontSize: 16}}>Choose a profile picture.</Text>
                                    <Text style={{color: '#fff', fontSize: 16, fontStyle: 'italic'}}>You can edit this at any time!</Text>
                                </Item>
                            </Body>
                            

                        </LinearGradient>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
};

const styles = StyleSheet.create({
    gradient: {
        width: Variables.deviceWidth,
        height: Variables.deviceHeight,
    },
    noUnderline: {
        borderColor: 'transparent',
    },
    uploadButton: {
        backgroundColor: '#100D64',
        width: 125,
        marginBottom: 15,
        justifyContent: 'center',
    },
    uploadButtonText: {
        color: '#ffffff',
        paddingLeft: 10,
        fontSize: 16,
    },
    profilePicture: {
        borderWidth: 3,
        borderColor: '#ffffff',
        marginBottom: 15,
    },
});