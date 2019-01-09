/* 
    redux/reducers.js

    File to combine all reducers

    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved
*/

import { combineReducers } from 'redux';

import { homeReducer } from './reducers/HomeReducer'
import { searchReducer } from './reducers/SearchReducer'
import { currentProfileReducer } from './reducers/CurrentUserProfileReducer'
import { selectedProfileReducer } from './reducers/SelectedUserProfileReducer'
import { messagesReducer } from './reducers/MessagesReducer'
import { plansReducer } from './reducers/PlansReducer'
import { signUpReducer } from './reducers/SignUpReducer'
import { friendsReducer } from './reducers/FriendsReducer'
import { signInReducer } from './reducers/SignInReducer'
import { settingsReducer } from './reducers/SettingsReducer'

export default combineReducers({
    homeReducer,
    searchReducer,
    currentProfileReducer,
    selectedProfileReducer,
    messagesReducer,
    plansReducer,
    signUpReducer,
    friendsReducer,
    signInReducer,
    settingsReducer,
});

