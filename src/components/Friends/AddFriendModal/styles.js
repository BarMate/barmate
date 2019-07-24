import { StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    root: {
       flex: 1,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    backdropContainer: {
        flex: 0.6,
    },
    contentContainer: {
        flex: 0.4,
        width: wp('100%'),
        backgroundColor: '#ffffff',
        borderTopLeftRadius: wp('6%'),
        borderTopRightRadius: wp('6%'),
    },
    addFriendViaPhotoLibrary: {
        flex: 1,
        flexDirection: 'row',
    },
    addFriendViaCamera: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 0.3,
        borderTopColor: 'rgba(0,0,0,0.2)',
    },
    photoLibraryGlyphContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraGlyphContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraTextContainer: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoLibraryTextContainer: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraText: {
        fontFamily: 'HkGrotesk_SemiBold',
        fontSize: wp('7%'),
        color: '#302C9E',
    },
    photoLibraryText: {
        fontFamily: 'HkGrotesk_SemiBold',
        fontSize: wp('7%'),
        color: '#302C9E',
    },
    glyphSize: wp('25%'),
})

export default styles;