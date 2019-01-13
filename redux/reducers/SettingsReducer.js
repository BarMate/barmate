/* 
    SettingsReducer.js
    
    Reducer for settings screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

const initialState_settings = {
    modalVisible: false,
}

export const settingsReducer = (state = initialState_settings, action) => {
    switch(action.type) {
        case 'TOGGLE_SETTINGS':
            return {
                ...state,
                modalVisible: action.payload,
            }
        default:
            return state;
    }
}