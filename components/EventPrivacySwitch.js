import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions} from 'react-native'
import MultiToggleSwitch from 'react-native-multi-toggle-switch';
import { Icon } from 'native-base'; 
import COLORS from '../config/Colors.js';
class EventPrivacySwitch extends Component {
    constructor(props){
        super(props)
        this.state = {
            settingState: 'Secret',
            settingMessage: 'Your event will only be visible to the invited friends, and invitations are closed!'
        }
    }

    changeSettingMessage(selected){
        switch(selected){
            case 'secret': 
                this.setState({settingState: 'Secret',  settingMessage: 'Your event will only be visible to the invited friends, and invitations are closed!'})
                break;
            case 'private': 
                this.setState({settingState: 'Private', settingMessage: 'Your event will be visible to your friends, and your friends can ask permission to invite others!'})
                break;
            case 'public': 
                this.setState({settingState: 'Public',  settingMessage: 'Your event will be visible to friends, and your friends are free to invite others!'})
                break;
        }
    }

    render() {
        return (
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#d2a'}}>
                <Text style={styles.title}>{this.state.settingState}</Text>
                <Text style={styles.messageText}>{this.state.settingMessage}</Text>
                <MultiToggleSwitch itemContainer={styles.container}>
                    <MultiToggleSwitch.Item onPress={() => {this.props.handler('secret'), this.changeSettingMessage('secret')}}>
                        <Icon name={'ios-lock'} color={COLORS.GRADIENT_COLOR_1} size={30} />
                    </MultiToggleSwitch.Item>
                    <MultiToggleSwitch.Item onPress={() => {this.props.handler('private'), this.changeSettingMessage('private')}}>
                        <Icon name={'ios-unlock'} color={COLORS.GRADIENT_COLOR_1} size={30} />
                    </MultiToggleSwitch.Item>
                    <MultiToggleSwitch.Item onPress={() => {this.props.handler('public'), this.changeSettingMessage('public')}} >
                        <Icon name={'ios-globe'} color={COLORS.GRADIENT_COLOR_1} size={30}/>
                    </MultiToggleSwitch.Item>
                </MultiToggleSwitch>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        color: 'white',
        fontFamily: 'HkGrotesk_Bold',
    },
    messageText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'HkGrotesk_Medium',
        textAlign: 'center'
    },
})

export default EventPrivacySwitch;
