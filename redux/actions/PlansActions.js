/* 
    PlansActions.js
    
    Holds action creators for plans
    
    Author:  Rodney Morgan
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

// listOfBars is an object containing all the bars of the user
export function sendCardObject(cardDataObject) {
    return {
        type: 'SEND_CARD_OBJECT',
        payload: cardDataObject,
    }
}