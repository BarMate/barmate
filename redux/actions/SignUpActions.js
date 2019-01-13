/* 
    SignUpActions.js
    
    Holds action creators for sign up screens
    as well as one for the Start screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/


// Start - opens and closes sign up modal
export function setModalVisible(visible) {
    return {
        type: 'SET_MODAL_VISIBLE',
        payload: visible,
    }
}

// SIGN UP - Send email to store before creating account
export function sendEmail(data) {
    return {
        type: 'SEND_EMAIL',
        payload: data,
    }
}

// SIGN UP - Send password to store before creating account
export function sendPassword(data) {
    return {
        type: 'SEND_PASSWORD',
        payload: data,
    }
}

// SIGN UP - Send name to store before creating account
export function sendName(data) {
    return {
        type: 'SEND_NAME',
        payload: data,
    }
}

// SIGN UP - Send handle to store before creating account
export function sendHandle(data) {
    return {
        type: 'SEND_HANDLE',
        payload: data,
    }
}

// SIGN UP - Send picture to store before creating account
export function sendProfilePicture(data) {
    return {
        type: 'SEND_PROFILE_PICTURE',
        payload: data,
    }
}
// SIGN UP - Send bio to store before creating account
export function sendBio(data) {
    return {
        type: 'SEND_BIO',
        payload: data,
    }
}

// SIGN UP - Send age to store before creating account
export function sendAge(data) {
    return {
        type: 'SEND_AGE',
        payload: data,
    }
}

// SIGN UP - Send gender to store before creating account
export function sendGender(data) {
    return {
        type: 'SEND_GENDER',
        payload: data,
    }
}

// SIGN UP - Send location to store before creating account
export function sendLocation(data) {
    return {
        type: 'SEND_LOCATION',
        payload: data,
    }
}

// SIGN UP - Send interest to store before creating account
export function sendInterest(data) {
    return {
        type: 'SEND_INTEREST',
        payload: data,
    }
}

// SIGN UP - Send favorite color to store before creating account
export function sendFavoriteColor(data) {
    return {
        type: 'SEND_COLOR',
        payload: data,
    }
}
