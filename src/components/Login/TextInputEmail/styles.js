import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
        width: wp('80.5%'),
        height: hp('6.4%'),
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#707070',
        borderRadius: wp('40.25%'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
})

export default styles;