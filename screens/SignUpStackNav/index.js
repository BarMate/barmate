/*
    Index file for Sign up stack navigator
*/

import ChooseBioScreen from './ChooseBio'
import ChooseNameScreen from './ChooseName'
import ChooseProfilePictureScreen from './ChooseProfilePicture'
import ChooseSignUpMethodScreen from './ChooseSignUpMethod'
import ChooseEtcScreen from './ChooseEtc'

import { createStackNavigator } from 'react-navigation';

const SignUpStackContainer = createStackNavigator({
    SignUp: ChooseSignUpMethodScreen,
    Bio: ChooseBioScreen,
    Name: ChooseNameScreen,
    Picture: ChooseProfilePictureScreen,
    Etc: ChooseEtcScreen,
}, { initialRouteName: 'SignUp', headerMode: 'none' });

export default SignUpStackContainer;