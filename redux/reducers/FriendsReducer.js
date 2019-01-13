/* 
    FriendsReducer.js
    
    Reducer for the Friends screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_friends = {
    selectedProfileData: null,
    friends: [],
    refreshing: false,
    selectedMessageProfileData: null,
    friendCount: 0,
}

export const friendsReducer = (state = initialState_friends, action) => {
    switch(action.type) {
        case 'SELECT_PROFILE':
            return {
                ...state,
                selectedProfileData: action.payload,
            }
        case 'PUSH_FRIENDS_LIST':
            return {
                ...state,
                friends: [...state.friends, action.payload]
            }
        case 'ERASE_LIST':
            return {
                ...state,
                friends: []
            }
        case 'REFRESH_LIST':
            return {
                ...state,
                refreshing: action.payload,
            }
        case 'SELECT_MESSAGE_PROFILE': 
            return {
                ...state,
                selectedMessageProfileData: action.payload
            }
        case 'UPDATE_FRIEND_COUNT': 
            return {
                ...state,
                friendCount: action.paylooad,
            }
        default:
            return state;
    }
}