import React from "react";
import { BackgroundView } from "../../../../components/Global/index";
import { TextHeaderTitle } from '../../../../components/AppTabs/index';

import { View, SafeAreaView, Text, StatusBar, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Header } from 'react-navigation';
import { Ionicons } from "@expo/vector-icons";

const YourBars = (props) => {
    return(
        <BackgroundView startY={0.9} >
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={styles.root}>
                {props.mapView}
                <ScrollView>
                    <View style={styles.topContainer}>
                        <TextHeaderTitle>Your Bars</TextHeaderTitle>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={{marginLeft: 'auto' }}>
                                <Ionicons name={"ios-add"} size={40} color={"#ffffff"}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </BackgroundView>
    );
}

const styles = StyleSheet.create({
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
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    }
})

export default YourBars;