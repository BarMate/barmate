import React from "react";
import { BackgroundView } from "../../../../components/Global/index";
import { TextHeaderTitle } from '../../../../components/AppTabs/index';

import { View, SafeAreaView, Text, StatusBar, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Header } from 'react-navigation';
import { Ionicons } from "@expo/vector-icons";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

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
    root: {
        flex: 1,
        marginTop: Header.HEIGHT + hp('5%'),
        marginLeft: wp('6%'),
        marginRight: wp('6%'),
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    }
})

export default YourBars;