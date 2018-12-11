/* 
    redux/reducers.js

    Initialize redux reducers used for each screen of the app
    This implementation uses 4 reducers, one for each screen of the app (assuming this isn't set in stone)
    Each reducer has a switch statement that goes through to see which action is needed

    These reducers should NEVER do the following:
    - Mutate the arguments (state, action)
    - Perform non-predictable routines (e.g. API calls that could fail)
    - Call non-pure functions (e.g. Math.random())

    The state should also never be directly mutated, but rather a brand new state is created
    when something changes and replaces the old state; however, react-redux doesn't seem to
    want you to do this (https://react-redux.js.org/using-react-redux/connect-mapstate : Only Return New Object References If Needed).
    
    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved
*/

import { combineReducers } from 'redux';

const initialState_home = {
    carouselData: [],
    selectedBarData: [],
}

const initialState_search = {
    test: 0,
}
const initialState_profile = {
    name: '',
    handle: '',
    age: 0,
    karma: 0,
    bio: '',
}
const initialState_messages = {
    test: 0,
}

const homeReducer = (state = initialState_home, action) => {
    switch(action.type) {
        case 'REFRESH_CAROUSEL':
            return {
                carouselData: action.payload,
                ...state,
            }
        case 'SELECT_BAR':
            return {
                ...state,
                selectedBarData: action.payload,
            }
        default:
            return state;
    }
}

const searchReducer = (state = initialState_search, action) => {
    switch(action.type) {
        case 'ADD_NUMBER':
            return {
                ...state,
                counter: state.counter * 4,
            }
        default:
            return state;
    }
}

const profileReducer = (state = initialState_profile, action) => {
    switch(action.type) {
        case 'UPDATE_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'UPDATE_HANDLE':
            return {
                ...state,
                handle: action.payload
            }
        case 'UPDATE_AGE':
            return {
                ...state,
                age: action.payload
            }        
        case 'UPDATE_KARMA':
            return {
                ...state,
                karma: action.payload
            }
        case 'UPDATE_BIO':
            return {
                ...state,
                bio: action.payload
            }
        default:
            return state;
    }
}

const messagesReducer = (state = initialState_messages, action) => {
    switch(action.type) {
        case 'ADD_NUMBER':
            return {
                ...state,
                counter: state.counter * 4,
            }
        default:
            return state;
    }
}

export default combineReducers({
    homeReducer,
    searchReducer,
    profileReducer,
    messagesReducer,
});

