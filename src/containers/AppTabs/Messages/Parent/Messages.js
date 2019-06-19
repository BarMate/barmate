import React from "react";
import { BackgroundView } from "../../../../components/Global/index";
import { SafeAreaView, Text, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { TextHeaderTitle } from "../../../../components/AppTabs";
import { Header } from 'react-navigation';

const Messages = (props) => {
    return(
        <BackgroundView startY={0.9} >
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={style.root}>
                <ScrollView>
                    <TextHeaderTitle>Messages</TextHeaderTitle>
                    
                </ScrollView>
            </SafeAreaView>
        </BackgroundView>
    );
}

const style = StyleSheet.create({
    header: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'HkGrotesk_Bold',
        color: 'white',
    },
    root: {
        flex: 1,
        marginTop: Header.HEIGHT + 40,
        marginLeft: 20,
        marginRight: 20,
    }
})

export default Messages;