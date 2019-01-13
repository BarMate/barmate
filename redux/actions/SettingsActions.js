/* 
    SettingsActions.js
    
    Action creators for the settings screen
    
    Author:  Joseph Contumelio
    Copyright(C) 2019, BarMate l.l.c.
    All rights reserved
*/

export function toggleSettings(bool) {
    return {
        type: 'TOGGLE_SETTINGS',
        payload: bool,
    }
}