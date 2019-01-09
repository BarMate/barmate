/* 
    MessagesReducer.js
    
    Reducer for Messages Screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_messages = {
    test: 0,
}

export const messagesReducer = (state = initialState_messages, action) => {
    switch(action.type) {
        case 'SELECT_BAR':
            return {
                ...state,
                selectedBarData: action.payload,
            }
        case 'PUSH_LIST_DATA':
            return {
                ...state,
                carouselData: [...state.carouselData, action.payload]
            }
        case 'ERASE_LIST_DATA':
            return {
                ...state,
                carouselData: []
            }
        case 'REFRESH_LIST':
            return {
                ...state,
                refreshing: action.payload,
            }
        default:
            return state;
    }
}