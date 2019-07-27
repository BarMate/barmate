import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
        width: wp('84%'),
        height: hp('6.4%'),
        backgroundColor: '#ffffff',
        borderWidth: 0.3,
        borderColor: '#707070',
        borderRadius: wp('40.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        marginBottom: hp('1%'),
    },
})

export default styles;