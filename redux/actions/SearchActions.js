
/* 
    SearchActions.js
    
    Holds the action creators for the Search Screen of MainTabNav
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

export function onChangeInputFieldDebounced(destination) {
    return {
        type: 'ON_CHANGE_INPUT',
        payload: destination,
    }
}

export function onSubmitNearbySearch(destination) {
    return {
        type: 'ON_SUBMIT_INPUT',
        payload: destination,
    }
}

export function userSearch(answer) {
    return {
        type: 'DID_USER_SEARCH',
        payload: answer,
    }
}