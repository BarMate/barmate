import React from "react";
import { BackgroundView } from "../../../../components/Global/index";
import { View, Text, StatusBar, StyleSheet, ScrollView, FlatList } from 'react-native';
import { TextHeaderTitle, MessageButton } from "../../../../components/AppTabs";
import { Header, SafeAreaView } from 'react-navigation';

const Messages = (props) => {
    return(
        <BackgroundView startY={0.9} >
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={style.root}>
                <ScrollView>
                    <TextHeaderTitle>Messages</TextHeaderTitle>
                    <FlatList 
                        keyExtractor={(item, index) => String(Math.random())}
                        data={props.stub}
                        renderItem={({item}) => <MessageButton />}
                        showsHorizontalScrollIndicator={false}
                    />
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
        marginBottom: 100,
    },
})

export default Messages;