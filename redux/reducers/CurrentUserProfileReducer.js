/* 
    ProfileReducer.js
    
    Reducer for current user profile screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_profile = {
    name: '',
    handle: '',
    age: 0,
    karma: 0,
    bio: '',
    modal: false,
    gender: '',
    interest: '',
    location: '',
    color: '',
    picture: '',
}

export const currentProfileReducer = (state = initialState_profile, action) => {
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
        case 'UPDATE_MODAL':
            return {
                ...state,
                modal: action.payload
            }
        case 'UPDATE_GENDER': 
            return {
                ...state,
                gender: action.payload
            }
        case 'UPDATE_INTEREST': 
            return {
                ...state,
                interest: action.payload
            }
        case 'UPDATE_LOCATION':
            return {
                ...state,
                location: action.payload
            }
        case 'UPDATE_COLOR': 
            return {
                ...state,
                color: action.payload
            }
        case 'UPDATE_PICTURE': 
            console.log(`picture: ${action.payload}`)
            return {
                ...state,
                picture: action.payload,
            }
        default:
            return state;
    }
}