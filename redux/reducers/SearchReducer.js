
/* 
    SearchReducer.js
    
    Reducer for Search Screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_search = {
    destination: '',
    submitSearch: '',
    didUserSearch: false,
}

export const searchReducer = (state = initialState_search, action) => {
    switch(action.type) {
        case 'ON_CHANGE_INPUT':
            return {
                ...state,
                destination: action.payload,
            }
        case 'ON_SUBMIT_INPUT': {
            return {
                ...state,
                submitSearch: action.payload,
            }
        }
        case 'DID_USER_SEARCH': {
            return {
                ...state,
                didUserSearch: action.payload,
            }
        }
        default:
            return state;
    }
}