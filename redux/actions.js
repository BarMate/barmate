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

// Used for PROFILE modal update
export function updateModal(visible) {
    return {
        type: 'UPDATE_MODAL',
        payload: visible,
    }
}

// Used for SIGNUP modal update
export function setModalVisible(visible) {
    return {
        type: 'SET_MODAL_VISIBLE',
        payload: visible,
    }
}



