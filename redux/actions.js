/* 
    redux/actions.js

    Put all action creators inside of this file;
    each action creator returns an action with a type and/or a payload.

    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved
*/


// listOfBars is an object containing all the bars of the user
export function refreshCarousel(listOfBars) {
    return {
        type: 'REFRESH_CAROUSEL',
        payload: listOfBars,
    }
}


// Update profile name
export function updateName(name) {
    return {
        type: 'UPDATE_NAME',
        payload: name,
    }
}

// Update profile handle
export function updateHandle(handle) {
    return {
        type: 'UPDATE_HANDLE',
        payload: handle,
    }
}

// Update profile bio
export function updateBio(bio) {
    return {
        type: 'UPDATE_BIO',
        payload: bio,
    }
}

// Update proifle age
export function updateAge(age) {
    return {
        type: 'UPDATE_AGE',
        payload: age,
    }
}

// Update profile karma
export function updateKarma(amount) {
    return {
        type: 'UPDATE_KARMA',
        payload: amount,
    }
}

export function updateModal(visible) {
    return {
        type: 'UPDATE_MODAL',
        payload: visible,
    }
}



