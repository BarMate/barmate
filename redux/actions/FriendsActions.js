/* 
    redux/actions/FriendsActions.js

    Action creators for the Friends page

    Author: Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/


// Push Friend IDS to reducer
export function updateLoading(bool) {
    return {
        type: 'UPDATE_LOADING',
        payload: bool,
    }
}

// Push Friends Names to reducer
export function pushFriends(friends) {
    return {
        type: 'PUSH_FRIENDS',
        payload: friends,
    }
}