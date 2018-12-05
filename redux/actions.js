/* 
    redux/actions.js

    Put all action creators inside of this file;
    each action creator returns an action with a type and/or a payload.

    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved
*/


// listOfBars is an object containing all the bars of the user
export function refreshCarousel(listOfBars) {
    console.log(`ListOfBars: ${listOfBars}`);
    return {
        type: 'REFRESH_CAROUSEL',
        payload: listOfBars,
    }
}

