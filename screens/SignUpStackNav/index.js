/*
    Index file for Sign up stack navigator
*/

import ChooseSignUpMethod from './ChooseSignUpMethod'
import ChooseEmailAndPassword from './ChooseEmailAndPassword'
import ChooseNameAndHandle from './ChooseNameAndHandle'
import ChooseBioAndProfilePicture from './ChooseBioAndProfilePicture'
import ChooseFinalDetails from './ChooseFinalDetails'
import ConfirmAccount from './ConfirmAccount'

import { createStackNavigator } from 'react-navigation';

const SignUpStackContainer = createStackNavigator({
    ChooseSignUp: ChooseSignUpMethod,
    ChooseEP: ChooseEmailAndPassword,
    ChooseNH: ChooseNameAndHandle,
    ChooseBP: ChooseBioAndProfilePicture,
    ChooseFinal: ChooseFinalDetails,
    Confirm: ConfirmAccount,
}, { initialRouteName: 'ChooseSignUp', headerMode: 'none' });

export default SignUpStackContainer;