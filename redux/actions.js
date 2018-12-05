/* 
    redux/actions.js

    Put all action creators inside of this file;
    each action creator returns an action with a type and/or a payload.

    Author: Joseph Contumelio
    Copyright(C) 2018, Barmate l.l.c.
    All rights reserved
*/

export function addNumber() {
    console.log('function: addNumber() called')
    return {
        type: 'ADD_NUMBER',
    }
}

export function subNumber() {
    return {
        type: 'SUB_NUMBER',
    }
}
