/* 
    FriendsReducer.js
    
    Reducer for the Friends screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_friends = {
    friends: [],
    loading: true,

}

export const friendsReducer = (state = initialState_friends, action) => {
    switch(action.type) {
        case 'PUSH_FRIENDS':
            return {
                ...state,
                friends: [...state.friends, action.payload],
            }
        case 'UPDATE_LOADING':
            return {
                ...state,
                loading: action.payload,
            }
        default:
            return state;
    }
}