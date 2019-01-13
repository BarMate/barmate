 import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions} from 'react-native'
import MultiToggleSwitch from 'react-native-multi-toggle-switch';
import { Icon } from 'native-base'; 
import COLORS from '../config/Colors.js';
import Variables from "../config/Variables.js";
class EventPrivacySwitch extends Component {
    constructor(props){
        super(props)
        this.state = {
            settingState: 'Privacy: Hidden',  
            settingMessage1: 'Your plan will only be visible to invited BarMates in the Plans tab',
            settingMessage2: 'Only your invited BarMates can check the guest list',
            settingMessage3: 'Invitations are closed'
        }
    }

    changeSettingMessage(selected){
        switch(selected){
            case 'hidden': 
                this.setState({
                    settingState: 'Privacy: Hidden',  
                    settingMessage1: 'Your plan will only be visible to invited BarMates in the Plans tab',
                    settingMessage2: 'Only your invited BarMates can check the guest list',
                    settingMessage3: 'Invitations are closed'
                });
                break;
            case 'private': 
                this.setState({
                    settingState: 'Privacy: Private',
                    settingMessage1: 'Your plan will only be visible to invited BarMates in the Plans tab',
                    settingMessage2: 'Anyone who is invited can check the guest list',
                    settingMessage3: 'Your BarMates need your permission to invite others' 
                });
                break;
            case 'public': 
                this.setState({
                    settingState: 'Privacy: Public',
                    settingMessage1: 'Your BarMates can see this plan in the Plans tab',
                    settingMessage2: 'Anyone can check the guest list',
                    settingMessage3: 'Anyone can attend, and the BarMates of attendees may see that they are attending this event in the Plans tab' 
                });
                break;
        }
    }

    render() {
        return (
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: Variables.deviceWidth - 50}}>
                <Text style={styles.title}>{this.state.settingState}</Text>
                <View style={{height: 100, paddingTop: 5}}>
                    <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.messageText}>{'\u2022 '}</Text>
                            <Text style={styles.messageText}>{this.state.settingMessage1}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.messageText}>{'\u2022 '}</Text>
                            <Text style={styles.messageText}>{this.state.settingMessage2}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.messageText}>{'\u2022 '}</Text>
                            <Text style={styles.messageText}>{this.state.settingMessage3}</Text>
                        </View> 
                    </View>
                </View>
                
                <View>
                    <MultiToggleSwitch itemContainer={styles.container}>
                        <MultiToggleSwitch.Item onPress={() => {this.props.handler('hidden'), this.changeSettingMessage('hidden')}}>
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
        flexWrap: 'wrap',
        fontFamily: 'HkGrotesk_Medium',
    },
})

export default EventPrivacySwitch;
