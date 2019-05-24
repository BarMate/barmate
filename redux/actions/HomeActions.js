/* 
    HomeActions.js
    
    Holds the action creators for the Home screen of MainTabNav
    
    Author: Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
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

// Updates carousel when user adds or removes bar
export function updateListData(data) {
    return {
        type: 'UPDATE_LIST_DATA',
        payload: data,
    }
} 

// Updates state of loading indicator
export function updateLoading(bool) {
    return {
        type: 'UPDATE_LOADING',
        payload: bool,
    }
} 

// Pushes data from selected bar to store
export function pushSelectedBarData(data) {
    return {
        type: 'SELECT_BAR',
        payload: data,
    }
}