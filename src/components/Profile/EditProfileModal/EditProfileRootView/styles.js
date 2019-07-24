import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
       flex: 1,
       backgroundColor: '#ffffff',
    },
    headerContainer: {
        width: wp('100%'),
        height: hp('12%'),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    cancelButton: {
        margin: wp('3%')
    },
    saveButton: {
        margin: wp('3%'),
    },
    editProfilePictureContainer: {
        width: wp('100%'),
        height: hp('30%'),
    },
    editNameContainer: {
        width: wp('100%'),
        height: hp('10%'),
    },
    editBioContainer: {
        width: wp('100%'),
        height: hp('16%'),
    },
    showFriendsToggleContainer: {
        width: wp('100%'),
        height: hp('8%'),
    },
    showPlansToggleContainer: {
        width: wp('100%'),
        height: hp('8%'),
    },
    scrollView: {
        flexGrow: 1,
    }
})

export default styles;