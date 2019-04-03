/* 
    PlansReducer.js
    
    Reducer for plans screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_plans = {
    cardObject: null,
    modal: false,
}

export const plansReducer = (state = initialState_plans, action) => {
    switch(action.type) {
        case 'SEND_CARD_OBJECT':
            return {
                ...state,
                cardObject: action.payload,
            }
        default:
            return state;
    }
}