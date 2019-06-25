import { combineReducers } from 'redux';

import AuthReducer from '../containers/Auth/reducer';
import LoginReducer from '../containers/Login/reducer';
import YourBarsReducer from '../containers/AppTabs/YourBars/reducer';

export default combineReducers({
    LoginReducer,
    AuthReducer,
    YourBarsReducer,
});
