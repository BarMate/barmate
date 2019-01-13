import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TextInput } from 'react-native'
import Variables from '../../config/Variables'
import { connect } from 'react-redux';
import { sendEmailState, sendPasswordState } from '../../redux/actions/SignInActions'

class CustomTextBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            emailValue: '',
            passwordValue: '',
        }
    }

    render() {
        return (
            <View style={styles.rootContainer}>
                <Image
                    style={styles.textboxImage}
                    source={
                        this.props.type === 'username' 
                        ? require("../../assets/signup/email_text_box.png")
                        : require("../../assets/signup/password_text_box.png")
                    }
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={this.props.type === 'username' ? false : true}
                    autoFocus={false}
                    placeholder={this.props.type === 'username' ? "Email" : "Password"}
                    placeholderTextColor={"#000000"}
                    value={this.props.type === 'username' ? this.props.username : this.props.password}
                    onChangeText={value => 
                        this.props.type === 'username' 
                        ? this.props.sendEmailState(value) 
                        : this.props.sendPasswordState(value)
                    }/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    username: state.signInReducer.username,
    password: state.signInReducer.password,
})  

const mapDispatchToProps = {
    sendEmailState,
    sendPasswordState,
}

const styles = StyleSheet.create({
    rootContainer: {
        width: Variables.deviceWidth - 50,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        flexDirection: "row",
        borderRadius: 15,
        marginBottom: 5,
    },
    textInput: {
        paddingLeft: 10,
        flex: 1,
        backgroundColor: "#ffffff",
        height: 50,
        fontFamily: 'HkGrotesk_Italic',
        fontSize: 20,
    },
    textboxImage: {
        padding: 10,
        width: 50,
        height: 50
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomTextBox)