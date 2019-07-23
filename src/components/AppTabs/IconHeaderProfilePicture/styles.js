import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
        marginLeft: wp('7%'),
        marginTop: hp('5%'),
    },
    image: {
        width: wp('10%'),
        height: wp('10%'),
        borderWidth: 0.1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: wp('5%'),
    }
})

export default styles;