/* 
    SignInReducer.js
    
    Reducer for Sign in screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_signIn = {
    username: '',
    password: '',
}

export const signInReducer = (state = initialState_signIn, action) => {
    switch(action.type) {
        case 'SEND_EMAIL_STATE':
            return {
                ...state,
                username: action.payload,
            }
        case 'SEND_PASSWORD_STATE':
            return {
                ...state,
                password: action.payload,
            }
        default: 
            return state;
    }
}
