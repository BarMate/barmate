import React from "react";
import { BackgroundView, TouchableWithBounce } from "../../../../components/Global/index";
import { TextHeaderTitle } from '../../../../components/AppTabs/index';

import { View, SafeAreaView, Text, StatusBar, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Header } from 'react-navigation';
import { Ionicons } from "@expo/vector-icons";
import Search from './SearchContainer';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";


const YourBars = (props) => {
    return(
        <BackgroundView startY={0.9} >
            <StatusBar barStyle="light-content"/>
            <SafeAreaView style={styles.root}>
                <Search />
                <ScrollView>
                    <View style={styles.topContainer}>
                        <TextHeaderTitle>Your Bars</TextHeaderTitle>
                            <TouchableWithBounce onPress={() => {props.toggleSearchModal(true)}} style={styles.add}>
                                <Ionicons name={"ios-add"} size={styles.addSize} color={"#302C9E"}/>
                            </TouchableWithBounce>
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
    },
    add: {
        marginLeft: 'auto',
        backgroundColor: '#ffffff',
        width: wp('9%'),
        height: wp('9%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp('4.5%'),
    },
    addSize: wp('6%'),
})

export default YourBars;