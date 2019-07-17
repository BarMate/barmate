import { StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
  
const styles = StyleSheet.create({
    rootContainer: {
       width: wp('90%'),
       height: hp('40%'),
       borderBottomWidth: 0.3,
       borderBottomColor: 'rgba(0,0,0,0.2)'
    },
    basicInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    barScoreContainer: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bioContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        margin: wp('4%'),
    },
    textContainer: {
        marginRight: wp('4%'),
        marginTop: wp('4%'),
        marginBottom: wp('4%'),
        flexShrink: 1,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: wp('36%'),
        height: wp('36%'),
        borderRadius: wp('18%'),
        borderWidth: 0.3,
        borderColor: 'rgba(0,0,0,0.5)'
    },
    name: {
        fontFamily: 'HkGrotesk_SemiBold',
        fontSize: wp('6%'),
        color: '#000000',
    },
    handle: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('4%'),
        color: 'rgba(0,0,0,0.5)',
    },
    age: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('4%'),
        color: 'rgba(0,0,0,0.5)',
        marginBottom: wp('2%'),
    },
    location: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('4%'),
        color: '#000000',
        marginLeft: wp('2%'),
    },  
    karma: {
        fontFamily: 'HkGrotesk_Medium',
        fontSize: wp('8%'),
        color: '#302C9E',
    },
    bio: {
        fontFamily: 'HkGrotesk_Regular',
        fontSize: wp('3.5%'),
        color: 'rgba(0,0,0,0.7)',
        marginLeft: wp('10%'),
        marginRight: wp('10%'),
        textAlign: 'center',
    },
    locationIconSize: wp('6%'),
})

export default styles;