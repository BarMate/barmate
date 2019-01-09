/* 
    redux/actions/FriendsActions.js

    Action creators for the Friends page

    Author: Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/


// Resets array when user refreshes friends list
export function eraseFriendsList() {
    return {
        type: 'ERASE_LIST',
    }
}

// Updates screen element of total number of friends
export function updateFriendCount(count) {
    return {
        type: 'UPDATE_FRIEND_COUNT',
        payload: count
    }
}

// Used for Refresh Control of Flatlist; tells flatlist to reload
export function refreshFriendsList(bool) {
    return {
        type: 'REFRESH_LIST',
        payload: bool
    }
}

// When user wants to message one of their friends from the friends screen
export function selectMessageProfile(messageProfile) {
    return {
        type: 'SELECT_MESSAGE_PROFILE',
        payload: messageProfile
    }
}

// Push the updated friends list to the reducer that is listened by the flatlist
export function pushFriendsList(friends) {
    return {
        type: 'PUSH_FRIENDS_LIST',
        payload: friends
    }
}

// Called when user selects the profile of a friend on friends page
export function selectProfile(profile) {
    return {
        type: 'SELECT_PROFILE',
        payload: profile
    }
}