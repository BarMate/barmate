/* 
    SearchReducer.js
    
    Reducer for Search Screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_search = {
    test: 0,
}

export const searchReducer = (state = initialState_search, action) => {
    switch(action.type) {
        case 'ADD_NUMBER':
            return {
                ...state,
                counter: state.counter * 4,
            }
        default:
            return state;
    }
}