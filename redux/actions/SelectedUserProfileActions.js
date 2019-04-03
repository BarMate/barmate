/* 
    SelectedUserProfileActions.js
    
    Holds action creators for selected user profile screen    
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

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