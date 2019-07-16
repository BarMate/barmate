import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    root: {
        width: wp('13.5%'),
        height: wp('13.5%'),
        borderWidth: 0.1,
        borderColor: 'white',
        backgroundColor: 'white',
        borderRadius: wp('6.75%'),
        marginLeft: 20,
    }
})

export default styles;