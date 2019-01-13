/* 
    SignUpReducer.js
    
    Reduce for sign up sequence
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_signUp = {
    modalVisible: false,

    email: '',
    password: '',

    name: '',
    handle: '',

    bio: '',
    profilePicture: '',

    age: [],
    gender: '',
    location: '',
    interest: '',
    favoriteColor: '',
}

export const signUpReducer = (state = initialState_signUp, action) => {
    switch(action.type) {
        case 'SET_MODAL_VISIBLE': 
            return {
                ...state,
                modalVisible: action.payload,
            }
        case 'SEND_EMAIL': 
            return {
                ...state,
                email: action.payload,
            }
        case 'SEND_PASSWORD': 
            return {
                ...state,
                password: action.payload,
            }
        case 'SEND_NAME': 
            return {
                ...state,
                name: action.payload,
            }
        case 'SEND_HANDLE': 
            return {
                ...state,
                handle: action.payload,
            }
        case 'SEND_PROFILE_PICTURE': 
            return {
                ...state,
                profilePicture: action.payload,
            }
        case 'SEND_BIO': 
            return {
                ...state,
                bio: action.payload,
            }
        case 'SEND_AGE': 
            return {
                ...state,
                age: action.payload,
            }
        case 'SEND_LOCATION': 
            return {
                ...state,
                location: action.payload,
            }
        case 'SEND_GENDER': 
            return {
                ...state,
                gender: action.payload
            }
        case 'SEND_INTEREST':
            return {
                ...state,
                interest: action.payload
            }
        case 'SEND_COLOR': 
            return {
                ...state,
                favoriteColor: action.payload
            }
        default: 
            return state;
    }
}