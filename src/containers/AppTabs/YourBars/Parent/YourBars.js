import React from "react";
import { BackgroundView, TouchableWithBounce } from "../../../../components/Global/index";
import { TextHeaderTitle, IconHeaderProfilePicture, BarFlatlist, LatestView } from '../../../../components/AppTabs/index';

import { View, Text, StatusBar, SafeAreaView, ScrollView,  StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
        <BackgroundView >
            <StatusBar barStyle="light-content"/>
            <View style={styles.root}>
                <ScrollView contentContainerStyle={styles.topContainer}>
                    <IconHeaderProfilePicture />
                    <View style={styles.headerView}>
                        <TextHeaderTitle>Your Bars</TextHeaderTitle>       
                        <TouchableWithBounce style={styles.add}>
                            <Ionicons name={"ios-add"} size={styles.addSize} color={"#ffffff"}/>
                        </TouchableWithBounce>
                    </View>
                    <BarFlatlist />
                    <LatestView />
                </ScrollView>
            </View>
        </BackgroundView>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: wp('3%'),
        zIndex: 0,
    },
    add: {
        width: wp('15%'),
        height: wp('15%'),
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 'auto',
        marginRight: wp('7%')
    },
    topContainer: {

    },
    addSize: wp('12%'),
})

export default YourBars;