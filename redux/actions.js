/* 
    redux/actions.js

    Put all action creators inside of this file;
    each action creator returns an action with a type and/or a payload.

    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved
*/


// Puts key in redux store for bar so it knows which bar is selected
export function selectBar(data) {
    return {
        type: 'SELECT_BAR',
        payload: key,
    }
}

// Refreshes list of bars
export function refreshList(data) {
    return {
        type: 'REFRESH_LIST',
        payload: data,
    }
}
// Erases list data for refresh of list
export function eraseListData(data) {
    return {
        type: 'ERASE_LIST_DATA',
    }
}

// Pushes firebase list of bars to local redux store
export function pushListData(data) {
    return {
        type: 'PUSH_LIST_DATA',
        payload: data,
    }
} 

// Pushes data from selected bar to store
export function pushSelectedBarData(data) {
    return {
        type: 'SELECT_BAR',
        payload: data,
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
// Update profile gender
export function updateGender(gender) {
    return {
        type: 'UPDATE_GENDER',
        payload: gender,
    }
}
// Update profile location
export function updateLocation(location) {
    return {
        type: 'UPDATE_LOCATION',
        payload: location,
    }
}
// Update profile interest
export function updateInterest(interest) {
    return {
        type: 'UPDATE_INTEREST',
        payload: interest,
    }
}
// Update profile color
export function updateColor(color) {
    return {
        type: 'UPDATE_COLOR',
        payload: color,
    }
}

export function updatePicture(url) {
    console.log(`ActionURL: ${url}`)
    return {
        type: 'UPDATE_PICTURE',
        payload: url,
    }
}

// Used for PROFILE modal update
export function updateModal(visible) {
    return {
        type: 'UPDATE_MODAL',
        payload: visible,
    }
}

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

