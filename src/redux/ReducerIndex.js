import { combineReducers } from 'redux';

import AuthReducer from '../containers/Auth/reducer';
import LoginReducer from '../containers/Login/reducer';

export default combineReducers({
    LoginReducer,
    AuthReducer,
});
