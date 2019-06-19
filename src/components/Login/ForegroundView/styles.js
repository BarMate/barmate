import { StyleSheet, Dimensions } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
    },
    upperArea: {
        flex: 0.23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lowerArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        width: wp('94%'),
    },
    headerText: {
        fontSize: wp('12%'),
        fontWeight: 'bold',
        fontFamily: 'HkGrotesk_Bold',
    },
    textContainer: {
        flex: 0.25,
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
        paddingLeft: 40,
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        width: Dimensions.get('screen').width,
    }
})

export default styles;