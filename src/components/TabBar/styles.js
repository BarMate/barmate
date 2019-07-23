import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    rootContainer: {
       width: wp('100%'),
       height: hp('10%'),
       flexDirection: 'row',
    },
    root: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    homeTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plansTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activitiesTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messagesTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default styles;