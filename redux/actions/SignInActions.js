/* 
    redux/actions/SignInActions.js

    Action creators for the Sign In page

    Author: Joseph Contumelio
    Copyright(C) 2019, Barmate l.l.c.
    All rights reserved
*/


// Sends state of email textbox
export function sendEmailState(data) {
    return {
        type: 'SEND_EMAIL_STATE',
        payload: data,
    }
}

// Sends state of password textbox
export function sendPasswordState(data) {
    return {
        type: 'SEND_PASSWORD_STATE',
        payload: data,
    }
}
